# 📈 StockVault

> A full-stack real-time stock trading platform with live market data, portfolio management, and seamless order execution.

[![Live Demo](https://img.shields.io/badge/Demo-Live-success?style=for-the-badge&logo=vercel)](https://main.d31wkgvjp4a2zm.amplifyapp.com)
[![Landing Page](https://img.shields.io/badge/Landing-Visit-blue?style=for-the-badge&logo=react)](https://main.d396oielaum726.amplifyapp.com/)
[![Backend API](https://img.shields.io/badge/API-Active-green?style=for-the-badge&logo=amazonaws)](https://stockvault-backend-env.eba-f37mvakq.ap-south-1.elasticbeanstalk.com/health)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

## 🌟 Overview

StockVault is a modern stock trading platform inspired by **Zerodha** that provides real-time market data streaming, comprehensive portfolio management, and instant order execution. Built with the MERN stack and powered by WebSocket connections, it delivers a professional trading experience with sub-second data updates.

### ✨ Key Features

- 🔴 **Real-Time WebSocket Streaming** - Live stock prices updated every 5 seconds
- 💼 **Portfolio Management** - Track holdings and positions with automatic P&L calculations
- 🛒 **Instant Order Execution** - Buy and sell stocks with immediate processing
- 🔐 **Secure Authentication** - JWT-based auth with email verification
- 📊 **Interactive Charts** - Visual portfolio performance with Recharts
- 📱 **Responsive Design** - Seamless experience across all devices
- ⚡ **Production-Ready** - Deployed on AWS with CI/CD pipeline

---

## 🎯 Live Deployments

| Service | URL | Status |
|---------|-----|--------|
| 🏠 **Landing Page** | [main.d396oielaum726.amplifyapp.com](https://main.d396oielaum726.amplifyapp.com/) | ![Status](https://img.shields.io/badge/status-live-success) |
| 📊 **Trading Dashboard** | [main.d31wkgvjp4a2zm.amplifyapp.com](https://main.d31wkgvjp4a2zm.amplifyapp.com) | ![Status](https://img.shields.io/badge/status-live-success) |
| 🔌 **Backend API** | [AWS Elastic Beanstalk](https://stockvault-backend-env.eba-f37mvakq.ap-south-1.elasticbeanstalk.com/health) | ![Status](https://img.shields.io/badge/status-live-success) |

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                              │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────┐              ┌─────────────────┐       │
│  │   Frontend UI   │              │   Dashboard     │       │
│  │   (React + Vite)│              │   (React + Vite)│       │
│  │                 │              │                 │       │
│  │  Landing Page   │              │  Trading App    │       │
│  │  • Hero         │              │  • Holdings     │       │
│  │  • Features     │              │  • Positions    │       │
│  │  • Login/Signup │              │  • Orders       │       │
│  └────────┬────────┘              └────────┬────────┘       │
│           │                                │                 │
└───────────┼────────────────────────────────┼─────────────────┘
            │                                │
            │         REST API + WebSocket   │
            │                                │
┌───────────▼────────────────────────────────▼─────────────────┐
│                    APPLICATION LAYER                          │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│              ┌─────────────────────────┐                     │
│              │   Backend (Node.js)     │                     │
│              │   Express + Socket.IO   │                     │
│              ├─────────────────────────┤                     │
│              │  • Auth Routes          │                     │
│              │  • Stock Service        │                     │
│              │  • Order Management     │                     │
│              │  • WebSocket Streaming  │                     │
│              └───────────┬─────────────┘                     │
│                          │                                    │
└──────────────────────────┼────────────────────────────────────┘
                           │
              ┌────────────┴────────────┐
              │                         │
┌─────────────▼──────────┐   ┌─────────▼──────────────┐
│    DATA LAYER          │   │   EXTERNAL APIs        │
├────────────────────────┤   ├────────────────────────┤
│                        │   │                        │
│  MongoDB Atlas         │   │  RapidAPI              │
│  • Users Collection    │   │  (Live Stock Market)   │
│  • Orders Collection   │   │                        │
│                        │   │  • Real-time quotes    │
│                        │   │  • Stock search        │
│                        │   │  • Market data         │
└────────────────────────┘   └────────────────────────┘
```

### 🔄 Data Flow

```
User Action (Buy/Sell Stock)
    ↓
Frontend Component (Orders.jsx)
    ↓
API Service (apiService.js)
    ↓
Backend API (POST /newOrder)
    ↓
MongoDB (Orders Collection)
    ↓
Success Response
    ↓
UI Update


Real-Time Market Data Flow:
    ↓
RapidAPI (Live Stock Data)
    ↓
Backend Service (stockService.js)
    ↓
Socket.IO Server (Every 5 seconds)
    ↓
WebSocket Connection
    ↓
Frontend Components (Holdings/Positions)
    ↓
Real-Time UI Update (🟢 Live Indicator)
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v16 or higher
- **MongoDB** (local or Atlas account)
- **npm** or **yarn**
- **RapidAPI Account** (for live stock data)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/deveshSJ11/stockvault.git
cd stockvault
```

2. **Backend Setup**
```bash
cd backend
npm install

# Create .env file
cat > .env << EOF
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
RAPIDAPI_KEY=your_rapidapi_key
RAPIDAPI_HOST=live-stock-market.p.rapidapi.com
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
PORT=5712
EOF

# Start backend
npm start
```

3. **Dashboard Setup**
```bash
cd dashboard
npm install

# Create .env.local
echo "VITE_API_BASE=http://localhost:5712" > .env.local

# Start dashboard
npm run dev
```

4. **Frontend UI Setup**
```bash
cd frontendUI
npm install

# Start landing page
npm run dev
```

### Access the Application

- **Landing Page**: http://localhost:5173 (frontendUI)
- **Dashboard**: http://localhost:3000 (dashboard)
- **Backend API**: http://localhost:5712

---

## 📂 Project Structure

```
stockvault/
├── backend/                 # Express.js API server with Socket.IO
│   ├── .ebextensions/      # AWS Elastic Beanstalk config
│   │   └── .env.config     # Nginx WebSocket configuration
│   ├── model/              # MongoDB schemas
│   │   ├── OrdersModel.js  # Orders collection
│   │   └── UserModel.js    # Users collection
│   ├── routes/             # API endpoints
│   │   └── authRoutes.js   # Authentication routes
│   ├── services/           # Business logic
│   │   └── StockService.js # RapidAPI integration
│   ├── index.js            # Main server file
│   ├── package.json
│   └── README.md           # Backend documentation
│
├── dashboard/              # Main trading application (React)
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Holdings.jsx      # Portfolio holdings (WebSocket)
│   │   │   ├── Positions.jsx     # Trading positions (WebSocket)
│   │   │   ├── Orders.jsx        # Order management
│   │   │   └── VerticalGraph.jsx # Portfolio charts
│   │   ├── services/       # API integration
│   │   │   └── ApiService.js     # Axios instance + API calls
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.local          # Local development config
│   ├── .env.production     # Production config
│   ├── amplify.yml         # AWS Amplify deployment config
│   ├── package.json
│   └── README.md           # Dashboard documentation
│
└── frontendUI/             # Landing page (React)
    ├── src/
    │   ├── landing_page/   # Landing page components
    │   │   ├── home/       # Hero section
    │   │   ├── signup/     # User registration
    │   │   ├── login/      # User login
    │   │   └── about/      # About section
    │   ├── App.jsx
    │   └── main.jsx
    ├── amplify.yml         # AWS Amplify deployment config
    ├── package.json
    └── README.md           # Landing page documentation
```

---

## 🔧 Technology Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 18** | UI library with hooks |
| **Vite** | Fast build tool and dev server |
| **Socket.IO Client** | Real-time WebSocket communication |
| **Axios** | HTTP client for REST APIs |
| **React Router** | Client-side routing |
| **Recharts** | Interactive data visualization |
| **Tailwind CSS** | Utility-first styling |

### Backend
| Technology | Purpose |
|-----------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web application framework |
| **Socket.IO** | Bidirectional real-time communication |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB ODM |
| **JWT** | Secure authentication tokens |
| **bcrypt** | Password hashing |
| **dotenv** | Environment variable management |

### DevOps & Hosting
| Service | Purpose |
|---------|---------|
| **AWS Elastic Beanstalk** | Backend hosting with auto-scaling |
| **AWS Amplify** | Frontend hosting with CI/CD |
| **MongoDB Atlas** | Managed cloud database |
| **RapidAPI** | Live stock market data provider |
| **Nginx** | Reverse proxy for WebSocket support |

---

## 📊 Features in Detail

### 1. 🏠 Landing Page (frontendUI)
- **Zerodha-inspired design** with modern UI/UX
- Hero section with call-to-action
- Feature highlights and benefits
- User authentication (Login/Signup)
- Email verification flow
- Responsive design for all devices

### 2. 📊 Trading Dashboard (dashboard)

#### Holdings Page
- View all owned stocks with real-time prices
- Automatic P&L calculation (profit/loss)
- Current value vs. investment amount
- Portfolio distribution visualization
- Live updates every 5 seconds via WebSocket
- **Status indicator**: 🟢 Live / 🔴 Offline

#### Positions Page
- Active intraday trading positions
- Real-time P&L tracking
- Day change percentage
- Position analytics
- Live market data streaming

#### Orders Page
- **Buy/Sell order execution**
- Order history with timestamps
- Order status (Pending/Completed)
- Quantity and price management
- Delete order functionality

#### Dashboard Home
- Portfolio summary at a glance
- Total investment vs. current value
- Overall P&L with percentage
- Quick action buttons
- Performance charts

### 3. 🔐 Authentication System
- User registration with email
- Email verification (token-based)
- Secure login with JWT
- Password hashing with bcrypt
- Protected routes
- Session management

---

## 🔑 Environment Variables

### Backend `.env`
```env
# MongoDB Connection
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/stockvault

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# RapidAPI (Live Stock Data)
RAPIDAPI_KEY=your_rapidapi_key
RAPIDAPI_HOST=live-stock-market.p.rapidapi.com

# Server Configuration
PORT=5712
NODE_ENV=production

# CORS Origins
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,https://main.d31wkgvjp4a2zm.amplifyapp.com
```

### Dashboard `.env.local` (Development)
```env
VITE_API_BASE=http://localhost:5712
```

### Dashboard `.env.production` (Production)
```env
VITE_API_BASE=https://stockvault-backend-env.eba-f37mvakq.ap-south-1.elasticbeanstalk.com
```

---

## 📈 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId("68e523836132b6615b34b811"),
  fullName: "Dev",
  email: "jaiswaldevesh09@gmail.com",
  password: "$2b$10$0Pp370351lmja7ucn8KAIuhnYsV4cH8EEbwRBJ/ZmDWqh7kxvfKBe", // hashed
  createdAt: ISODate("2025-10-07T14:28:19.225Z"),
  updatedAt: ISODate("2025-10-07T14:28:19.225Z"),
  __v: 0
}
```

### Orders Collection
```javascript
{
  _id: ObjectId("68ec9aecfa2d9b4354b27ac6"),
  name: "TSLA",           // Stock symbol
  qty: 1,                 // Quantity
  price: 248.3,           // Execution price
  mode: "BUY",            // "BUY" or "SELL"
  __v: 0
}
```

---

## 🧪 API Endpoints

### Authentication
```
POST   /api/auth/signup      Register new user
POST   /api/auth/login       User login
GET    /api/auth/me          Get current user
```

### Stock Data (Real-Time via WebSocket)
```
GET    /allHoldings          Fetch all holdings (REST fallback)
GET    /allPositions         Fetch all positions (REST fallback)
GET    /searchStock?query=   Search stocks by symbol
GET    /stockData/:symbol    Get specific stock data

WebSocket Events:
  - updateHoldings          Emitted every 5 seconds
  - updatePositions         Emitted every 5 seconds
```

### Orders
```
GET    /allOrders            Fetch all orders
POST   /newOrder             Create buy/sell order
DELETE /deleteOrder/:id      Delete specific order
```

### Health Check
```
GET    /health               Server health status
GET    /                     API welcome message
```

---

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd dashboard
npm test
```

**Testing Stack**: Jest + React Testing Library

**Test Coverage**:
- ✅ API endpoint testing
- ✅ Authentication flow testing
- ✅ Component rendering tests
- ✅ Service function tests

---

## 🚀 Deployment

### Backend (AWS Elastic Beanstalk)
```bash
cd backend
eb init
eb create stockvault-backend-env
eb deploy
```

### Frontend (AWS Amplify)
- Connected to GitHub repository
- Automatic deployment on push to `main`
- Build configuration via `amplify.yml`

---

## 📸 Screenshots

> Add your screenshots to `/screenshots` folder

### Landing Page
![Landing Page](./screenshots/landing.png)

### Dashboard Home
![Dashboard](./screenshots/dashboard.png)

### Holdings Page
![Holdings](./screenshots/holdings.png)

### Positions Page
![Positions](./screenshots/positions.png)

### Order Execution
![Orders](./screenshots/orders.png)

### Login Page
![Login](./screenshots/login.png)

---

## 🚧 Known Limitations

- **Market Data**: Live data available during market hours only
- **API Rate Limits**: RapidAPI free tier has rate limits
- **Real-Time Updates**: Dependent on API response time and WebSocket connection
- **Demo Account**: Sample data used for demonstration purposes

---

## 🛣️ Roadmap

- [ ] Push notifications for price movements
- [ ] Multi-exchange support (NSE, BSE, NYSE, NASDAQ)
- [ ] Paper trading mode for practice
- [ ] Advanced order types (Stop-loss, Limit orders)
- [ ] Historical data analysis


---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

### How to Contribute

1. Fork the repository
2. Create your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Devesh Jaiswal**

- 📧 Email: [deveshjaiswal1212@gmail.com](mailto:deveshjaiswal1212@gmail.com)
- 💼 LinkedIn: [Connect with me](https://www.linkedin.com/in/deveshjaiswal11/)
- 🌐 Portfolio: [Visit my website](https://deveshsj-portfolio.netlify.app/)
- 🐙 GitHub: [@deveshSJ11](https://github.com/deveshSJ11)

---

## 🙏 Acknowledgments


- **Market Data** provided by [RapidAPI](https://rapidapi.com)
- **Database** hosted on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Infrastructure** powered by [AWS](https://aws.amazon.com)
- **Icons** from [React Icons](https://react-icons.github.io/react-icons/)
- **Charts** built with [Recharts](https://recharts.org/)

---

## 📞 Support

Found a bug? Have a feature request? 

- 🐛 [Report Issues](https://github.com/deveshSJ11/stockvault/issues)
- 💬 [Discussions](https://github.com/deveshSJ11/stockvault/discussions)
- 📧 Email: deveshjaiswal1212@gmail.com

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

**Built with ❤️ by [Devesh Jaiswal](https://github.com/deveshSJ11)**

[![GitHub followers](https://img.shields.io/github/followers/devjaiswal?style=social)](https://github.com/deveshSJ11)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=social&logo=linkedin)](https://www.linkedin.com/in/deveshjaiswal11/)

</div>
