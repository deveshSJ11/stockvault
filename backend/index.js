require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require('./routes/authRoutes');
const { OrdersModel } = require("./model/OrdersModel");

// ✅ Import live stock service
const { 
  getLiveHoldings, 
  getLivePositions, 
  searchStock, 
  fetchLiveStockData 
} = require('./services/StockService');

const PORT = process.env.PORT || 3002; 
const uri = process.env.MONGO_URL;

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Auth Routes
app.use('/api/auth', authRoutes);

// ==========================================
// LIVE DATA ROUTES (No MongoDB)
// ==========================================

// Get live holdings from RapidAPI
app.get("/allHoldings", async (req, res) => {
  try {
    const liveHoldings = await getLiveHoldings();
    res.json(liveHoldings);
  } catch (error) {
    console.error("Error fetching holdings:", error);
    res.status(500).json({ 
      error: "Failed to fetch holdings",
      message: error.message 
    });
  }
});

// Get live positions from RapidAPI
app.get("/allPositions", async (req, res) => {
  try {
    const livePositions = await getLivePositions();
    res.json(livePositions);
  } catch (error) {
    console.error("Error fetching positions:", error);
    res.status(500).json({ 
      error: "Failed to fetch positions",
      message: error.message 
    });
  }
});

// Search for stocks
app.get("/searchStock", async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }
    
    const results = await searchStock(query);
    res.json(results);
  } catch (error) {
    console.error("Error searching stocks:", error);
    res.status(500).json({ 
      error: "Failed to search stocks",
      message: error.message 
    });
  }
});

// Get specific stock data
app.get("/stockData/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;
    const stockData = await fetchLiveStockData(symbol);
    
    if (!stockData) {
      return res.status(404).json({ error: "Stock not found" });
    }
    
    res.json(stockData);
  } catch (error) {
    console.error("Error fetching stock data:", error);
    res.status(500).json({ 
      error: "Failed to fetch stock data",
      message: error.message 
    });
  }
});

// ==========================================
// ORDERS ROUTES (Stored in MongoDB)
// ==========================================

// Get all orders from database
app.get("/allOrders", async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({});
    res.json(allOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ 
      error: "Failed to fetch orders",
      message: error.message 
    });
  }
});

// Create new order (Buy/Sell button)
app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    // Validation
    if (!name || !qty || !price || !mode) {
      return res.status(400).json({ 
        error: "Missing required fields: name, qty, price, mode" 
      });
    }

    if (!['BUY', 'SELL'].includes(mode.toUpperCase())) {
      return res.status(400).json({ 
        error: "Mode must be either 'BUY' or 'SELL'" 
      });
    }

    const newOrder = new OrdersModel({
      name: name.toUpperCase(), // Store stock symbols in uppercase
      qty: parseInt(qty),
      price: parseFloat(price),
      mode: mode.toUpperCase(),
    });

    await newOrder.save();
    
    res.status(201).json({ 
      message: "Order saved successfully!",
      order: newOrder 
    });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ 
      error: "Failed to save order",
      message: error.message 
    });
  }
});

// Delete order
app.delete("/deleteOrder/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedOrder = await OrdersModel.findByIdAndDelete(id);
    
    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    
    res.json({ 
      message: "Order deleted successfully",
      order: deletedOrder 
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ 
      error: "Failed to delete order",
      message: error.message 
    });
  }
});

// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Server is running",
    timestamp: new Date().toISOString() 
  });
});

// ==========================================
// DATABASE CONNECTION & SERVER START
// ==========================================

mongoose.connect(uri)
  .then(() => {
    console.log("✅ Database connected successfully!");
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 Live stock data endpoint: http://localhost:${PORT}/allHoldings`);
      console.log(`💼 Orders endpoint: http://localhost:${PORT}/allOrders`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err);
    process.exit(1);
  });

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  mongoose.connection.close(() => {
    console.log('Database connection closed');
    process.exit(0);
  });
});