require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

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

// Get allowed origins from environment or use defaults
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://main.d31wkgvjp4a2zm.amplifyapp.com'
    ];

console.log('CORS ALLOWED_ORIGINS:', ALLOWED_ORIGINS);

const app = express();

// ==============================
// Middleware
// ==============================
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      console.log('No origin provided - allowing request');
      return callback(null, true);
    }
    
    if (ALLOWED_ORIGINS.includes(origin)) {
      console.log('CORS allowed for origin:', origin);
      callback(null, true);
    } else {
      console.warn('CORS rejected for origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.get("/", (req, res) => res.send("🚀 StockVault Backend is running!"));

// ==============================
// Auth Routes
// ==============================
app.use("/api/auth", authRoutes);

// ==============================
// LIVE DATA ROUTES
// ==============================
app.get("/allHoldings", async (req, res) => {
  try {
    const liveHoldings = await getLiveHoldings();
    res.json(liveHoldings);
  } catch (error) {
    console.error("Error fetching holdings:", error);
    res.status(500).json({ error: "Failed to fetch holdings", message: error.message });
  }
});

app.get("/allPositions", async (req, res) => {
  try {
    const livePositions = await getLivePositions();
    res.json(livePositions);
  } catch (error) {
    console.error("Error fetching positions:", error);
    res.status(500).json({ error: "Failed to fetch positions", message: error.message });
  }
});

app.get("/searchStock", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: "Search query is required" });

    const results = await searchStock(query);
    res.json(results);
  } catch (error) {
    console.error("Error searching stocks:", error);
    res.status(500).json({ error: "Failed to search stocks", message: error.message });
  }
});

app.get("/stockData/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;
    const stockData = await fetchLiveStockData(symbol);

    if (!stockData) return res.status(404).json({ error: "Stock not found" });

    res.json(stockData);
  } catch (error) {
    console.error("Error fetching stock data:", error);
    res.status(500).json({ error: "Failed to fetch stock data", message: error.message });
  }
});

// ==============================
// ORDERS ROUTES (MongoDB)
// ==============================
app.get("/allOrders", async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({});
    res.json(allOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
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

    const newOrder = new OrdersModel({
      name: name.toUpperCase(),
      qty: parseInt(qty),
      price: parseFloat(price),
      mode: mode.toUpperCase(),
    });

    await newOrder.save();
    res.status(201).json({ message: "Order saved successfully!", order: newOrder });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ error: "Failed to save order", message: error.message });
  }
});

app.delete("/deleteOrder/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await OrdersModel.findByIdAndDelete(id);
    if (!deletedOrder) return res.status(404).json({ error: "Order not found" });

    res.json({ message: "Order deleted successfully", order: deletedOrder });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Failed to delete order", message: error.message });
  }
});

// ==============================
// HEALTH CHECK
// ==============================
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running", timestamp: new Date().toISOString() });
});

// ==============================
// START SERVER IMMEDIATELY (Don't wait for DB)
// ==============================
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["GET", "POST"]
  }
});

// Emit live holdings every 5 seconds
setInterval(async () => {
  try {
    const liveHoldings = await getLiveHoldings();
    io.emit("updateHoldings", liveHoldings);
  } catch (error) {
    console.error("Socket error (holdings):", error);
  }
}, 5000);

// Emit live positions every 5 seconds
setInterval(async () => {
  try {
    const livePositions = await getLivePositions();
    io.emit("updatePositions", livePositions);
  } catch (error) {
    console.error("Socket error (positions):", error);
  }
}, 5000);

// Start server without waiting for DB
server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

// Connect to MongoDB asynchronously (don't block startup)
mongoose
  .connect(MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
  .then(() => {
    console.log("✅ Database connected successfully!");
  })
  .catch((err) => {
    console.error("⚠️ Database connection error (app will run without DB for read-only operations):", err.message);
    // Don't exit - app can still serve read-only endpoints
  });

// ==============================
// GRACEFUL SHUTDOWN
// ==============================
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  mongoose.connection.close(() => {
    console.log("Database connection closed");
    process.exit(0);
  });
});