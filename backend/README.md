# 🔌 StockVault Backend

> Express.js REST API with Socket.IO for real-time stock market data streaming

[![Node.js](https://img.shields.io/badge/Node.js-v16+-green?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)](https://www.mongodb.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-black?logo=socket.io)](https://socket.io/)

## 📋 Overview

The backend server handles authentication, order management, and real-time stock data streaming. Built with Express.js and Socket.IO, it provides REST APIs for CRUD operations and WebSocket connections for live market data updates.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│           Backend Server (Port 5712)        │
├─────────────────────────────────────────────┤
│                                              │
│  ┌────────────────┐    ┌─────────────────┐ │
│  │  Express.js    │    │   Socket.IO     │ │
│  │  REST API      │    │   Server        │ │
│  └────────┬───────┘    └────────┬────────┘ │
│           │                     │           │
│  ┌────────▼─────────────────────▼────────┐ │
│  │         Route Handlers                 │ │
│  │  • Auth Routes                         │ │
│  │  • Stock Routes                        │ │
│  │  • Order Routes                        │ │
│  └────────┬───────────────────────────────┘ │
│           │                                  │
│  ┌────────▼────────────┐                    │
│  │   Services Layer    │                    │
│  │  • StockService     │                    │
│  │  • AuthService      │                    │
│  └────────┬────────────┘                    │
│           │                                  │
└───────────┼──────────────────────────────────┘
            │
    ┌───────┴────────┐
    │                │
┌───▼──────┐  ┌─────▼─────┐
│ MongoDB  │  │ RapidAPI  │
│  Atlas   │  │  (Stocks) │
└──────────┘  └───────────┘
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js v16 or higher
- MongoDB (local or Atlas)
- RapidAPI account with Live Stock Market API access
- npm or yarn

### Installation

1. **Navigate to backend folder**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file**
```bash
cp .env.example .env
```

4. **Configure environment variables**
```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/stockvault
JWT_SECRET=your_super_secret_key_here
RAPIDAPI_KEY=your_rapidapi_key
RAPIDAPI_HOST=live-stock-market.p.rapidapi.com
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
PORT=5712
NODE_ENV=development
```

5. **Start the server**
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

6. **Verify server is running**
```bash
curl http://localhost:5712/health

# Expected response:
{
  "status": "OK",
  "message": "Server is healthy",
  "environment": "development",
  "mongodb": "connected",
  "socketIO": "active",
  "uptime": 123.45,
  "timestamp": "2025-01-10T12:00:00.000Z"
}
```

---

## 📂 Project Structure

```
backend/
├── .ebextensions/              # AWS Elastic Beanstalk configuration
│   └── .env.config            # Nginx WebSocket proxy settings
│
├── model/                     # MongoDB schemas
│   ├── OrdersModel.js        # Orders collection schema
│   └── UserModel.js          # Users collection schema
│
├── routes/                    # API route handlers
│   └── authRoutes.js         # Authentication endpoints
│
├── services/                  # Business logic layer
│   └── StockService.js       # RapidAPI integration & data transformation
│
├── middleware/                # Express middleware
│   └── auth.js               # JWT authentication middleware
│
├── .env                       # Environment variables (gitignored)
├── .env.example              # Environment template
├── .gitignore                # Git ignore rules
├── index.js                   # Main server file
├── package.json              # Dependencies & scripts
└── README.md                 # This file
```

---

## 📡 API Endpoints

### Base URL
- **Development**: `http://localhost:5712`
- **Production**: `https://stockvault-backend-env.eba-f37mvakq.ap-south-1.elasticbeanstalk.com`

### Health & Status

#### `GET /`
Returns welcome message

**Response:**
```json
{
  "status": "OK",
  "message": "🚀 StockVault Backend is running!",
  "environment": "production",
  "socketIO": "enabled",
  "timestamp": "2025-01-10T12:00:00.000Z"
}
```

#### `GET /health`
Health check endpoint

**Response:**
```json
{
  "status": "OK",
  "message": "Server is healthy",
  "environment": "production",
  "mongodb": "connected",
  "socketIO": "active",
  "uptime": 3600.5,
  "timestamp": "2025-01-10T12:00:00.000Z"
}
```

---

### Authentication

#### `POST /api/auth/signup`
Register a new user

**Request Body:**
```json
{
  "fullName": "Dev Jaiswal",
  "email": "dev@example.com",
  "password": "securePassword123"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "68e523836132b6615b34b811",
    "fullName": "Dev Jaiswal",
    "email": "dev@example.com"
  }
}
```

#### `POST /api/auth/login`
Authenticate user and get JWT token

**Request Body:**
```json
{
  "email": "dev@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "68e523836132b6615b34b811",
    "fullName": "Dev Jaiswal",
    "email": "dev@example.com"
  }
}
```

#### `GET /api/auth/me`
Get current user information (Protected route)

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "_id": "68e523836132b6615b34b811",
  "fullName": "Dev Jaiswal",
  "email": "dev@example.com",
  "createdAt": "2025-10-07T14:28:19.225Z"
}
```

---

### Stock Data

#### `GET /allHoldings`
Fetch all holdings with live prices (REST fallback)

**Response (200):**
```json
[
  {
    "name": "AAPL",
    "qty": 45,
    "avg": 175.20,
    "price": 178.50,
    "net": "+1.88%",
    "day": "+3.30"
  },
  {
    "name": "GOOGL",
    "qty": 23,
    "avg": 140.15,
    "price": 142.30,
    "net": "+1.53%",
    "day": "+2.15"
  }
]
```

#### `GET /allPositions`
Fetch all active positions (REST fallback)

**Response (200):**
```json
[
  {
    "product": "AAPL",
    "name": "Apple Inc.",
    "qty": 15,
    "avg": 176.50,
    "price": 178.50,
    "net": "+1.13%",
    "day": "+1.88%",
    "isLoss": false
  }
]
```

#### `GET /searchStock?query=AAPL`
Search for stocks by symbol or name

**Query Parameters:**
- `query` (required): Search term

**Response (200):**
```json
[
  {
    "symbol": "AAPL",
    "shortName": "Apple Inc.",
    "exchange": "NASDAQ"
  }
]
```

#### `GET /stockData/:symbol`
Get specific stock data

**URL Parameters:**
- `symbol` (required): Stock symbol (e.g., AAPL, GOOGL)

**Response (200):**
```json
{
  "symbol": "AAPL",
  "regularMarketPrice": 178.50,
  "regularMarketPreviousClose": 175.20,
  "shortName": "Apple Inc."
}
```

---

### Orders

#### `GET /allOrders`
Fetch all orders

**Response (200):**
```json
[
  {
    "_id": "68ec9aecfa2d9b4354b27ac6",
    "name": "TSLA",
    "qty": 1,
    "price": 248.3,
    "mode": "BUY",
    "__v": 0,
    "createdAt": "2025-01-10T12:00:00.000Z"
  }
]
```

#### `POST /newOrder`
Create a new buy/sell order

**Request Body:**
```json
{
  "name": "TSLA",
  "qty": 1,
  "price": 248.3,
  "mode": "BUY"
}
```

**Validation:**
- `name`: Required, stock symbol
- `qty`: Required, positive integer
- `price`: Required, positive number
- `mode`: Required, either "BUY" or "SELL"

**Response (201):**
```json
{
  "message": "Order saved successfully!",
  "order": {
    "_id": "68ec9aecfa2d9b4354b27ac6",
    "name": "TSLA",
    "qty": 1,
    "price": 248.3,
    "mode": "BUY"
  }
}
```

#### `DELETE /deleteOrder/:id`
Delete a specific order

**URL Parameters:**
- `id` (required): Order MongoDB ObjectId

**Response (200):**
```json
{
  "message": "Order deleted successfully",
  "order": {
    "_id": "68ec9aecfa2d9b4354b27ac6",
    "name": "TSLA",
    "qty": 1,
    "price": 248.3,
    "mode": "BUY"
  }
}
```

---

## 🔌 WebSocket Events

### Connection
```javascript
// Client connects
socket.on('connect', () => {
  console.log('Connected to Socket.IO server');
});
```

### Real-Time Updates (Emitted every 5 seconds)

#### `updateHoldings`
Broadcasts updated holdings data to all connected clients

**Payload:**
```json
[
  {
    "name": "AAPL",
    "qty": 45,
    "avg": 175.20,
    "price": 178.50,
    "net": "+1.88%",
    "day": "+3.30"
  }
]
```

#### `updatePositions`
Broadcasts updated positions data to all connected clients

**Payload:**
```json
[
  {
    "product": "AAPL",
    "name": "Apple Inc.",
    "qty": 15,
    "avg": 176.50,
    "price": 178.50,
    "net": "+1.13%",
    "day": "+1.88%",
    "isLoss": false
  }
]
```

### Connection Events
```javascript
// Client disconnects
socket.on('disconnect', (reason) => {
  console.log('Disconnected:', reason);
});

// Connection error
socket.on('error', (error) => {
  console.error('Socket error:', error);
});
```

---

## 🗄️ Database Models

### Users Model
**File:** `model/UserModel.js`

```javascript
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}, {
  timestamps: true
});
```

**Indexes:**
- `email`: Unique index for fast lookups

### Orders Model
**File:** `model/OrdersModel.js`

```javascript
const ordersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    uppercase: true
  },
  qty: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  mode: {
    type: String,
    required: true,
    enum: ['BUY', 'SELL'],
    uppercase: true
  }
}, {
  timestamps: true
});
```

---

## 🔧 Services

### StockService
**File:** `services/StockService.js`

Handles integration with RapidAPI for live stock market data.

#### Key Functions:

**`fetchLiveStockData(symbol)`**
- Fetches real-time stock data from RapidAPI
- Returns fallback data if API fails
- Error handling with console logging

**`getLiveHoldings()`**
- Fetches data for 10 predefined stocks
- Transforms data to Holdings schema
- Returns array of holdings with live prices

**`getLivePositions()`**
- Fetches data for top 5 stocks
- Calculates P&L and percentages
- Returns array of positions

**`searchStock(query)`**
- Searches stocks by symbol/name
- Uses RapidAPI search endpoint
- Returns matching results

#### Tracked Stocks:
```javascript
const STOCK_SYMBOLS = [
  'AAPL',   // Apple
  'GOOGL',  // Google
  'MSFT',   // Microsoft
  'AMZN',   // Amazon
  'TSLA',   // Tesla
  'META',   // Meta
  'NVDA',   // Nvidia
  'JPM',    // JP Morgan
  'V',      // Visa
  'WMT'     // Walmart
];
```

#### Fallback Data:
If RapidAPI fails, predefined fallback data ensures the app continues working:

```javascript
const FALLBACK_DATA = {
  'AAPL': { 
    symbol: 'AAPL', 
    regularMarketPrice: 178.50, 
    regularMarketPreviousClose: 175.20, 
    shortName: 'Apple Inc.' 
  },
  // ... other stocks
};
```

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `MONGO_URL` | MongoDB connection string | ✅ Yes | - |
| `JWT_SECRET` | Secret key for JWT signing | ✅ Yes | - |
| `RAPIDAPI_KEY` | RapidAPI authentication key | ✅ Yes | - |
| `RAPIDAPI_HOST` | RapidAPI host URL | ✅ Yes | `live-stock-market.p.rapidapi.com` |
| `PORT` | Server port | ❌ No | `5712` |
| `NODE_ENV` | Environment (development/production) | ❌ No | `development` |
| `ALLOWED_ORIGINS` | CORS allowed origins (comma-separated) | ✅ Yes | - |

### CORS Configuration

The server allows cross-origin requests from:
- `http://localhost:3000`
- `http://localhost:5173`
- `https://localhost:3000`
- `https://localhost:5173`
- `https://main.d31wkgvjp4a2zm.amplifyapp.com`

Configured in `index.js`:
```javascript
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));
```

---

## 🚀 Deployment (AWS Elastic Beanstalk)

### Prerequisites
- AWS CLI installed and configured
- EB CLI installed (`pip install awsebcli`)

### Setup

1. **Initialize Elastic Beanstalk**
```bash
eb init
```

Select:
- Region: `ap-south-1` (Mumbai)
- Platform: `Node.js 22 running on 64bit Amazon Linux 2023`
- Application name: `stockvault-backend`

2. **Create Environment**
```bash
eb create stockvault-backend-env
```

3. **Configure Environment Variables**

Via AWS Console:
- Go to Elastic Beanstalk → Environments → Configuration → Software
- Add all environment variables from `.env`

Or via CLI:
```bash
eb setenv MONGO_URL="..." JWT_SECRET="..." RAPIDAPI_KEY="..."
```

4. **Deploy**
```bash
eb deploy
```

5. **Check Logs**
```bash
eb logs
# or
eb logs --stream
```

### WebSocket Configuration

**File:** `.ebextensions/.env.config`

Configures nginx to support WebSocket connections:

```yaml
option_settings:
  aws:elasticbeanstalk:application:environment:
    # Environment variables here
  
  aws:elasticbeanstalk:environment:proxy:
    ProxyServer: nginx

files:
  "/etc/nginx/conf.d/websocket.conf":
    mode: "000644"
    owner: root
    group: root
    content: |
      upstream nodejs {
          server 127.0.0.1:5712;
          keepalive 256;
      }

      server {
          listen 8080;

          location /socket.io/ {
              proxy_pass http://nodejs;
              proxy_http_version 1.1;
              proxy_set_header Upgrade $http_upgrade;
              proxy_set_header Connection "upgrade";
              # ... additional headers
          }

          location / {
              proxy_pass http://nodejs;
              # ... headers
          }
      }

container_commands:
  01_reload_nginx:
    command: "sudo service nginx reload"
```

---

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Test Coverage
```bash
npm run test:coverage
```

### Manual API Testing

**Using curl:**
```bash
# Health check
curl http://localhost:5712/health

# Get holdings
curl http://localhost:5712/allHoldings

# Create order
curl -X POST http://localhost:5712/newOrder \
  -H "Content-Type: application/json" \
  -d '{"name":"AAPL","qty":1,"price":178.5,"mode":"BUY"}'
```

**Using Postman:**
Import the collection: `postman_collection.json` (create if needed)

---

## 🐛 Debugging

### Enable Debug Logs
```bash
DEBUG=* npm start
```

### Common Issues

#### 1. MongoDB Connection Fails
```
⚠️ Database connection error
```
**Solution:**
- Check `MONGO_URL` is correct
- Verify network access in MongoDB Atlas
- Check if IP is whitelisted

#### 2. RapidAPI Errors
```
❌ Socket error (holdings): Request failed with status code 429
```
**Solution:**
- Check API quota (rate limits)
- Verify `RAPIDAPI_KEY` is valid
- Falls back to dummy data automatically

#### 3. WebSocket Connection Fails
```
❌ Client disconnected: transport close
```
**Solution:**
- Check nginx configuration in `.ebextensions/`
- Verify CORS origins include frontend URL
- Check firewall/security groups

#### 4. CORS Errors
```
✗ CORS rejected for origin: https://...
```
**Solution:**
- Add origin to `ALLOWED_ORIGINS` environment variable
- Redeploy: `eb deploy`

---

## 📊 Performance

### Optimization Strategies

1. **Database Indexing**
   - Email index on Users collection (unique)
   - Timestamp indexes for efficient queries

2. **Caching Strategy**
   - Stock data cached for 5 seconds
   - Reduces API calls to RapidAPI

3. **Connection Pooling**
   - MongoDB connection pool: 10 connections
   - Socket.IO keepalive connections

4. **Error Handling**
   - Graceful degradation with fallback data
   - Automatic reconnection for MongoDB
   - WebSocket auto-reconnect

### Monitoring

**Server Metrics:**
```bash
# Check server uptime
GET /health

# Monitor connected Socket.IO clients
# Logged in console: "Total clients: X"
```

**AWS CloudWatch Metrics:**
- CPU Utilization
- Network I/O
- Request count
- Error rate

---

## 🔒 Security

### Implemented Security Measures

1. **Authentication**
   - JWT tokens with expiration
   - bcrypt password hashing (10 rounds)
   - HTTP-only cookies for tokens

2. **Input Validation**
   - Request body validation
   - SQL injection prevention (NoSQL)
   - XSS protection

3. **CORS**
   - Whitelist-based origin checking
   - Credentials allowed only for trusted origins

4. **Environment Variables**
   - Sensitive data in `.env` (gitignored)
   - Production secrets in AWS

5. **Rate Limiting**
   - RapidAPI rate limits enforced
   - Graceful handling of quota exceeded

---

## 📚 Dependencies

### Production Dependencies
```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.0",
  "socket.io": "^4.6.0",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "jsonwebtoken": "^9.0.2",
  "bcrypt": "^5.1.1",
  "axios": "^1.6.0"
}
```

### Development Dependencies
```json
{
  "nodemon": "^3.0.1",
  "jest": "^29.7.0"
}
```

---

## 📝 Scripts

```json
{
  "start": "node index.js",
  "dev": "nodemon index.js",
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage"
}
```

---

## 🔗 Related Documentation

- [Main README](../README.md)
- [Dashboard README](../dashboard/README.md)
- [Frontend UI README](../frontendUI/README.md)
- [API Documentation](./API.md) *(create if needed)*

---

## 📞 Support

For backend-specific issues:
- 🐛 [Report Backend Issues](https://github.com/deveshSJ11/stockvault/issues)
- 📧 Email: deveshjaiswal1212@gmail.com

---

<div align="center">

**Built with ❤️ by [Dev Jaiswal](https://github.com/devjaiswal)**

</div>
