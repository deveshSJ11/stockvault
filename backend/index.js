require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const authRoutes = require("./routes/authRoutes");
const { OrdersModel } = require("./model/OrdersModel");
const {
  getLiveHoldings,
  getLivePositions,
  searchStock,
  fetchLiveStockData,
} = require("./services/StockService");

const PORT = process.env.PORT || 5712;
const MONGO_URI = process.env.MONGO_URL;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Get allowed origins from environment or use defaults

    const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://main.d39p45abwbdyp1.amplifyapp.com',  // ✅ Add this
      'https://main.d31wkgvjp4a2zm.amplifyapp.com'   // ✅ Your dashboard URL
    ];

console.log('='.repeat(50));
console.log('🚀 StockVault Backend Starting...');
console.log('Environment:', NODE_ENV);
console.log('Port:', PORT);
console.log('CORS Allowed Origins:', ALLOWED_ORIGINS);
console.log('='.repeat(50));

const app = express();

// ==============================
// Middleware
// ==============================
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      console.log('✓ No origin provided - allowing request');
      return callback(null, true);
    }
    
    if (ALLOWED_ORIGINS.includes(origin)) {
      console.log('✓ CORS allowed for origin:', origin);
      callback(null, true);
    } else {
      console.warn('✗ CORS rejected for origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ==============================
// Health Check & Root Route
// ==============================
app.get("/", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "🚀 StockVault Backend is running!",
    environment: NODE_ENV,
    socketIO: "enabled",
    timestamp: new Date().toISOString()
  });
});

app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Server is healthy", 
    environment: NODE_ENV,
    mongodb: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    socketIO: "active",
    uptime: process.uptime(),
    timestamp: new Date().toISOString() 
  });
});

// ==============================
// Auth Routes
// ==============================
app.use("/api/auth", authRoutes);

// ==============================
// LIVE DATA ROUTES (REST Fallback)
// ==============================
app.get("/allHoldings", async (req, res) => {
  try {
    console.log('📊 Fetching holdings via REST...');
    const liveHoldings = await getLiveHoldings();
    res.json(liveHoldings);
  } catch (error) {
    console.error("❌ Error fetching holdings:", error.message);
    res.status(500).json({ error: "Failed to fetch holdings", message: error.message });
  }
});

app.get("/allPositions", async (req, res) => {
  try {
    console.log('📊 Fetching positions via REST...');
    const livePositions = await getLivePositions();
    res.json(livePositions);
  } catch (error) {
    console.error("❌ Error fetching positions:", error.message);
    res.status(500).json({ error: "Failed to fetch positions", message: error.message });
  }
});

app.get("/searchStock", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: "Search query is required" });

    console.log('🔍 Searching stock:', query);
    const results = await searchStock(query);
    res.json(results);
  } catch (error) {
    console.error("❌ Error searching stocks:", error.message);
    res.status(500).json({ error: "Failed to search stocks", message: error.message });
  }
});

app.get("/stockData/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;
    console.log('📈 Fetching stock data for:', symbol);
    
    const stockData = await fetchLiveStockData(symbol);

    // ALWAYS return valid data, never null
    if (!stockData) {
      console.warn(`⚠️ No data for ${symbol}, returning generic fallback`);
      return res.json({
        symbol: symbol,
        regularMarketPrice: 100.00,
        regularMarketPreviousClose: 99.00,
        shortName: symbol,
        isFallback: true
      });
    }

    // Return the data (live or fallback)
    console.log(`✓ Returning data for ${symbol}:`, stockData);
    res.json(stockData);
    
  } catch (error) {
    console.error("❌ Error fetching stock data:", error.message);
    
    // Return fallback on error (don't throw 500)
    res.json({
      symbol: req.params.symbol,
      regularMarketPrice: 100.00,
      regularMarketPreviousClose: 99.00,
      shortName: req.params.symbol,
      isFallback: true,
      error: 'Service temporarily unavailable'
    });
  }
});

// ==============================
// ORDERS ROUTES (MongoDB)
// ==============================
app.get("/allOrders", async (req, res) => {
  try {
    console.log('📋 Fetching all orders...');
    const allOrders = await OrdersModel.find({});
    res.json(allOrders);
  } catch (error) {
    console.error("❌ Error fetching orders:", error.message);
    res.status(500).json({ error: "Failed to fetch orders", message: error.message });
  }
});

app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;
    if (!name || !qty || !price || !mode)
      return res.status(400).json({ error: "Missing required fields: name, qty, price, mode" });
    if (!["BUY", "SELL"].includes(mode.toUpperCase()))
      return res.status(400).json({ error: "Mode must be either 'BUY' or 'SELL'" });

    console.log('💰 Creating new order:', { name, qty, price, mode });
    const newOrder = new OrdersModel({
      name: name.toUpperCase(),
      qty: parseInt(qty),
      price: parseFloat(price),
      mode: mode.toUpperCase(),
    });

    await newOrder.save();
    console.log('✓ Order saved successfully');
    res.status(201).json({ message: "Order saved successfully!", order: newOrder });
  } catch (error) {
    console.error("❌ Error saving order:", error.message);
    res.status(500).json({ error: "Failed to save order", message: error.message });
  }
});

app.delete("/deleteOrder/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log('🗑️  Deleting order:', id);
    const deletedOrder = await OrdersModel.findByIdAndDelete(id);
    if (!deletedOrder) return res.status(404).json({ error: "Order not found" });

    console.log('✓ Order deleted successfully');
    res.json({ message: "Order deleted successfully", order: deletedOrder });
  } catch (error) {
    console.error("❌ Error deleting order:", error.message);
    res.status(500).json({ error: "Failed to delete order", message: error.message });
  }
});

// ==============================
// SOCKET.IO SERVER SETUP
// ==============================
const server = http.createServer(app);

// Socket.IO Configuration (Production-Ready)
const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      // Allow requests with no origin
      if (!origin) {
        console.log('🔌 Socket.IO: No origin - allowing');
        return callback(null, true);
      }
      
      if (ALLOWED_ORIGINS.includes(origin)) {
        console.log('🔌 Socket.IO: Allowed origin:', origin);
        callback(null, true);
      } else {
        console.warn('🔌 Socket.IO: Rejected origin:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["GET", "POST"],
    credentials: true
  },
  // Production-specific settings for AWS Elastic Beanstalk
  transports: ['websocket', 'polling'],
  allowEIO3: true,
  pingTimeout: 60000,
  pingInterval: 25000,
  connectTimeout: 45000,
  path: '/socket.io', // Must match nginx config
  allowUpgrades: true
});

// Track connected clients
let connectedClients = 0;

io.on('connection', (socket) => {
  connectedClients++;
  console.log(`✅ Client connected [ID: ${socket.id}] | Total clients: ${connectedClients}`);

  // Handle ping from client for latency measurement
  socket.on('ping', (callback) => {
    if (typeof callback === 'function') {
      callback();
    }
  });

  socket.on('disconnect', (reason) => {
    connectedClients--;
    console.log(`❌ Client disconnected [ID: ${socket.id}] | Reason: ${reason} | Total clients: ${connectedClients}`);
  });

  socket.on('error', (error) => {
    console.error(`❌ Socket error [ID: ${socket.id}]:`, error.message);
  });
});

// ==============================
// AUTO-EMIT INTERVALS (Every 5 seconds)
// ==============================

// Emit live holdings every 5 seconds
const holdingsInterval = setInterval(async () => {
  try {
    if (connectedClients > 0) {
      const liveHoldings = await getLiveHoldings();
      io.emit("updateHoldings", liveHoldings);
      console.log(`📊 Holdings emitted to ${connectedClients} client(s) | Stocks: ${liveHoldings.length}`);
    } else {
      console.log('⏸️  No clients connected - skipping holdings update');
    }
  } catch (error) {
    console.error("❌ Socket error (holdings):", error.message);
  }
}, 5000);

// Emit live positions every 5 seconds
const positionsInterval = setInterval(async () => {
  try {
    if (connectedClients > 0) {
      const livePositions = await getLivePositions();
      io.emit("updatePositions", livePositions);
      console.log(`📊 Positions emitted to ${connectedClients} client(s) | Positions: ${livePositions.length}`);
    } else {
      console.log('⏸️  No clients connected - skipping positions update');
    }
  } catch (error) {
    console.error("❌ Socket error (positions):", error.message);
  }
}, 5000);

app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;
    // ... validation ...

    const newOrder = new OrdersModel({
      name: name.toUpperCase(),
      qty: parseInt(qty),
      price: parseFloat(price),
      mode: mode.toUpperCase(),
    });

    await newOrder.save();
    console.log('✓ Order saved successfully');
    
    // ✅ ADD THIS - Emit new order to all connected clients
    io.emit("buyandsell", {
      type: "new_order",
      order: newOrder
    });
    
    res.status(201).json({ message: "Order saved successfully!", order: newOrder });
  } catch (error) {
    console.error("❌ Error saving order:", error.message);
    res.status(500).json({ error: "Failed to save order", message: error.message });
  }
});

// ==============================
// START SERVER
// ==============================
server.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('✅ SERVER STARTED SUCCESSFULLY!');
  console.log(`🌍 Environment: ${NODE_ENV}`);
  console.log(`🚀 Server running on port: ${PORT}`);
  console.log(`🔌 Socket.IO enabled at path: /socket.io`);
  console.log(`📡 Emitting updates every 5 seconds`);
  console.log('='.repeat(50));
});

// ==============================
// MONGODB CONNECTION (Non-blocking)
// ==============================
mongoose
  .connect(MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
  .then(() => {
    console.log("✅ MongoDB connected successfully!");
  })
  .catch((err) => {
    console.error("⚠️  MongoDB connection error (app will run without DB for read-only operations):", err.message);
    // Don't exit - app can still serve read-only endpoints
  });

// ==============================
// GRACEFUL SHUTDOWN
// ==============================
const gracefulShutdown = (signal) => {
  console.log(`\n${signal} signal received: Starting graceful shutdown...`);
  
  // Clear intervals
  clearInterval(holdingsInterval);
  clearInterval(positionsInterval);
  console.log('✓ Cleared update intervals');
  
  // Close Socket.IO connections
  io.close(() => {
    console.log('✓ Socket.IO connections closed');
  });
  
  // Close MongoDB connection
  mongoose.connection.close(false, () => {
    console.log('✓ MongoDB connection closed');
    
    // Close HTTP server
    server.close(() => {
      console.log('✓ HTTP server closed');
      console.log('👋 Graceful shutdown completed');
      process.exit(0);
    });
  });

  // Force shutdown after 10 seconds if graceful shutdown fails
  setTimeout(() => {
    console.error('⚠️  Forceful shutdown after timeout');
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  gracefulShutdown('UNCAUGHT_EXCEPTION');
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});