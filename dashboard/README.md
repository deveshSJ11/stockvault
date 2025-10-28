# 📊 StockVault Dashboard

> Real-time stock trading application with live market data and portfolio management

[![React](https://img.shields.io/badge/React-18.x-blue?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-purple?logo=vite)](https://vitejs.dev/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-Client-black?logo=socket.io)](https://socket.io/)

## 📋 Overview

The main trading application where users manage their portfolio, execute trades, and monitor real-time market data. Features live WebSocket connections for instant price updates and interactive charts for portfolio visualization.

**Live Demo:** [https://main.d31wkgvjp4a2zm.amplifyapp.com](https://main.d31wkgvjp4a2zm.amplifyapp.com)

---

## ✨ Features

### 📈 Holdings Page
- **Real-time Portfolio Tracking** - View all owned stocks with live prices
- **Automatic P&L Calculation** - Instant profit/loss updates
- **Interactive Charts** - Visual portfolio distribution
- **Live Status Indicator** - 🟢 Live / 🔴 Offline connection status
- **Auto-refresh** - Updates every 5 seconds via WebSocket

### 📊 Positions Page
- **Active Trading Positions** - Monitor intraday trades
- **Live P&L Tracking** - Real-time profit/loss calculations
- **Day Change Analytics** - Track daily performance
- **WebSocket Streaming** - Continuous market data updates

### 🛒 Orders Page
- **Buy/Sell Execution** - Place market orders instantly
- **Order History** - Complete transaction log
- **Order Management** - Edit or cancel pending orders
- **Real-time Updates** - Instant order status changes

### 🏠 Dashboard Home
- **Portfolio Summary** - Quick overview of investments
- **Performance Metrics** - Total P&L with percentages
- **Quick Actions** - Fast access to trading functions
- **Market Overview** - Current market status

---

## 🚀 Quick Start

### Prerequisites

- Node.js v16 or higher
- npm or yarn
- Backend server running (see [backend README](../backend/README.md))

### Installation

1. **Navigate to dashboard folder**
```bash
cd dashboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
# For local development
echo "VITE_API_BASE=http://localhost:5712" > .env.local

# For production (optional)
echo "VITE_API_BASE=https://stockvault-backend-env.eba-f37mvakq.ap-south-1.elasticbeanstalk.com" > .env.production
```

4. **Start development server**
```bash
npm run dev
```

5. **Open in browser**
```
http://localhost:3000
```

---

## 📂 Project Structure

```
dashboard/
├── public/                    # Static assets
│   ├── favicon.ico
│   └── images/
│
├── src/
│   ├── components/           # React components
│   │   ├── Holdings.jsx      # Holdings page with WebSocket
│   │   ├── Positions.jsx     # Positions page with WebSocket
│   │   ├── Orders.jsx        # Order management
│   │   ├── Dashboard.jsx     # Home dashboard
│   │   ├── VerticalGraph.jsx # Portfolio chart component
│   │   ├── Menu.jsx          # Navigation menu
│   │   └── TopBar.jsx        # Top navigation bar
│   │
│   ├── services/             # API integration
│   │   └── ApiService.js     # Axios instance + API calls
│   │
│   ├── context/              # React Context (if any)
│   ├── hooks/                # Custom hooks
│   ├── utils/                # Utility functions
│   │
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # React entry point
│   └── index.css             # Global styles
│
├── .env.local                # Local environment config
├── .env.production           # Production environment config
├── amplify.yml               # AWS Amplify build config
├── index.html                # HTML template
├── package.json              # Dependencies & scripts
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS config
└── README.md                 # This file
```

---

## 🔧 Technology Stack

| Technology | Purpose | Version |
|-----------|---------|---------|
| **React** | UI library | 18.x |
| **Vite** | Build tool & dev server | 5.x |
| **Socket.IO Client** | Real-time WebSocket communication | 4.x |
| **Axios** | HTTP client for REST APIs | 1.x |
| **React Router** | Client-side routing | 6.x |
| **Recharts** | Interactive data visualization | 2.x |
| **Lucide React** | Icon library | Latest |

---

## 🔌 Real-Time Updates (WebSocket)

### Connection Setup

```javascript
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_BASE, {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5,
  transports: ['websocket', 'polling']
});
```

### Listening to Events

**Holdings Component:**
```javascript
socket.on("updateHoldings", (data) => {
  setAllHoldings(data);
  setLastUpdated(new Date());
});
```

**Positions Component:**
```javascript
socket.on("updatePositions", (data) => {
  setAllPositions(data);
  setLastUpdated(new Date());
});
```

### Connection Status

```javascript
socket.on("connect", () => {
  setConnectionStatus("connected"); // 🟢 Live
});

socket.on("disconnect", () => {
  setConnectionStatus("disconnected"); // 🔴 Offline
});
```

---

## 🎨 Components

### Holdings.jsx

**Real-time portfolio holdings with live price updates**

**Features:**
- WebSocket connection for live data
- Auto-refresh every 5 seconds
- Interactive chart visualization
- P&L calculation per stock
- Total portfolio summary
- Connection status indicator

**Key Functions:**
```javascript
useEffect(() => {
  const socket = io(backendUrl);
  
  socket.on("updateHoldings", (data) => {
    const safeData = data.map((stock) => ({
      name: stock.name || "-",
      qty: Number(stock.qty) || 0,
      avg: Number(stock.avg) || 0,
      price: Number(stock.price) || 0,
      net: stock.net || "-",
      day: stock.day || "-",
    }));
    setAllHoldings(safeData);
  });

  return () => socket.disconnect();
}, []);
```

---

### Positions.jsx

**Active trading positions with real-time P&L**

**Features:**
- Live position tracking
- Real-time P&L updates
- Day change percentage
- Product-wise grouping
- Total P&L summary

**Data Structure:**
```javascript
{
  product: "AAPL",
  name: "Apple Inc.",
  qty: 15,
  avg: 176.50,
  price: 178.50,
  net: "+1.13%",
  day: "+1.88%",
  isLoss: false
}
```

---

### Orders.jsx

**Order execution and management**

**Features:**
- Buy/Sell order placement
- Real-time order list
- Order deletion
- Input validation
- Success/error notifications

**API Integration:**
```javascript
import { createOrder, getAllOrders, deleteOrder } from '../services/ApiService';

// Place order
const handleSubmit = async (e) => {
  e.preventDefault();
  const orderData = { name, qty, price, mode };
  await createOrder(orderData);
};

// Delete order
const handleDelete = async (orderId) => {
  await deleteOrder(orderId);
};
```

---

### VerticalGraph.jsx

**Portfolio visualization component**

**Features:**
- Bar chart with Recharts
- Current value vs. investment
- Responsive design
- Tooltip on hover
- Legend display

**Props:**
```javascript
<VerticalGraph data={{
  labels: ['AAPL', 'GOOGL', 'MSFT'],
  datasets: [
    {
      label: "Current Value (₹)",
      data: [8925, 3272.9, 4205],
      backgroundColor: "rgba(65, 132, 243, 0.7)"
    },
    {
      label: "Investment (₹)",
      data: [7884, 3223.45, 4182],
      backgroundColor: "rgba(255, 159, 64, 0.7)"
    }
  ]
}} />
```

---

## 🌐 API Integration

### ApiService.js

Centralized API client using Axios

**Base Configuration:**
```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000
});
```

**Request Interceptor:**
```javascript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

**Available Methods:**

```javascript
// Holdings & Positions (REST Fallback)
getAllHoldings()
getAllPositions()

// Orders
getAllOrders()
createOrder(orderData)
deleteOrder(orderId)

// Stock Search
searchStock(query)
getStockData(symbol)

// Authentication
signup(userData)
login(credentials)
getCurrentUser()
```

---

## ⚙️ Configuration

### Environment Variables

**`.env.local` (Development)**
```env
VITE_API_BASE=http://localhost:5712
```

**`.env.production` (Production)**
```env
VITE_API_BASE=https://stockvault-backend-env.eba-f37mvakq.ap-south-1.elasticbeanstalk.com
```

### Vite Config

**`vite.config.js`**
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
```


## 🚀 Deployment (AWS Amplify)

### amplify.yml Configuration

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
env:
  variables:
    VITE_API_BASE: "https://stockvault-backend-env.eba-f37mvakq.ap-south-1.elasticbeanstalk.com"
```

### Deployment Steps

1. **Connect Repository**
   - Go to AWS Amplify Console
   - Connect GitHub repository
   - Select `dashboard` folder as root directory

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Base directory: `dashboard`
   - Output directory: `dashboard/dist`

3. **Set Environment Variables**
   - Add `VITE_API_BASE` in Amplify Console
   - Go to App Settings → Environment Variables

4. **Deploy**
   - Push to `main` branch
   - Amplify auto-deploys on every push

5. **Custom Domain** (Optional)
   - Go to Domain Management
   - Add custom domain

---

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Test Components
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:coverage
```

### Manual Testing Checklist

- [ ] Holdings page loads correctly
- [ ] Positions page loads correctly
- [ ] Orders page loads correctly
- [ ] WebSocket connection established (🟢 Live indicator)
- [ ] Data updates every 5 seconds
- [ ] Buy order can be placed
- [ ] Sell order can be placed
- [ ] Order can be deleted
- [ ] Charts render correctly
- [ ] Responsive design works on mobile
- [ ] Error messages display properly
- [ ] Loading states show correctly

---

## 🐛 Debugging

### Enable Debug Mode

**Check environment variables:**
```javascript
console.log('API Base:', import.meta.env.VITE_API_BASE);
console.log('Mode:', import.meta.env.MODE);
```

**Check WebSocket connection:**
```javascript
socket.on("connect", () => {
  console.log("✅ Socket connected:", socket.id);
});

socket.on("connect_error", (error) => {
  console.error("❌ Connection error:", error);
});
```

### Common Issues

#### 1. "WebSocket connection failed"
**Symptoms:**
```
Failed to load resource: net::ERR_CONNECTION_REFUSED
```
**Solutions:**
- Check if backend is running
- Verify `VITE_API_BASE` is correct
- Check CORS settings in backend

#### 2. "🔴 Offline" Status
**Symptoms:**
- Connection status shows offline
- No data updates

**Solutions:**
```bash
# Check backend health
curl https://your-backend.com/health

# Check WebSocket support
wscat -c "wss://your-backend.com/socket.io/?EIO=4&transport=websocket"
```

#### 3. Data Not Updating
**Symptoms:**
- Shows "Updated Xs ago" but frozen
- No new data after 5 seconds

**Solutions:**
- Check browser console for errors
- Verify WebSocket events are being emitted
- Check backend logs for emission logs

#### 4. CORS Errors
**Symptoms:**
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solutions:**
- Add your frontend URL to backend `ALLOWED_ORIGINS`
- Redeploy backend

---

## 📊 Performance Optimization

### Implemented Optimizations

1. **React.memo** for expensive components
```javascript
export default React.memo(VerticalGraph);
```

2. **useMemo** for computed values
```javascript
const chartData = useMemo(() => ({
  labels: allHoldings.map(stock => stock.name),
  datasets: [...]
}), [allHoldings]);
```

3. **Lazy Loading**
```javascript
const Dashboard = lazy(() => import('./components/Dashboard'));
```

4. **Code Splitting**
- Automatic via Vite
- Separate bundles for routes

5. **Asset Optimization**
- Image lazy loading
- SVG sprites
- Tree-shaking unused code

---

## 📝 Scripts

```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "jest",
  "test:watch": "jest --watch",
  "lint": "eslint src --ext js,jsx",
  "format": "prettier --write src/**/*.{js,jsx,css}"
}
```

---

## 📚 Dependencies

### Production
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "axios": "^1.6.2",
  "socket.io-client": "^4.6.0",
  "recharts": "^2.10.0",
  "lucide-react": "^0.294.0"
}
```

### Development
```json
{
  "@vitejs/plugin-react": "^4.2.0",
  "vite": "^5.0.0",
  "tailwindcss": "^3.3.6",
  "autoprefixer": "^10.4.16",
  "postcss": "^8.4.32",
  "eslint": "^8.54.0",
  "prettier": "^3.1.0"
}
```

---

## 🔗 Related Documentation

- [Main README](../README.md)
- [Backend README](../backend/README.md)
- [Frontend UI README](../frontendUI/README.md)

---

## 📞 Support

For dashboard-specific issues:
- 🐛 [Report Issues](https://github.com/deveshSJ11/stockvault/issues)
- 📧 Email: deveshjaiswal1212@gmail.com

---

<div align="center">

**Built with ❤️ by [Devesh Jaiswal](https://github.com/deveshSJ11)**

</div>
