# 📈 StockVault

> A full-stack real-time stock trading platform with live market data, portfolio management, and order execution capabilities.

[![Live Demo](https://img.shields.io/badge/Demo-Live-success?style=for-the-badge)](https://main.d31wkgvjp4a2zm.amplifyapp.com)
[![LDashboard Page](https://img.shields.io/badge/Landing-Visit-blue?style=for-the-badge)](https://main.d396oielaum726.amplifyapp.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

## 🌟 Overview

StockVault is a modern stock trading platform that provides real-time market data, portfolio tracking, and seamless order execution. Built with the MERN stack and integrated with live market APIs, it offers a professional trading experience similar to platforms like Zerodha.

### ✨ Key Features

- **📊 Real-Time Market Data** - Live stock prices and market updates
- **💼 Portfolio Management** - Track holdings and positions with real-time P&L
- **🛒 Order Execution** - Buy and sell stocks with instant order processing
- **🔐 Secure Authentication** - JWT-based authentication with email verification
- **📱 Responsive Design** - Works seamlessly on desktop and mobile devices
- **⚡ Live Updates** - WebSocket-based real-time data synchronization

## 🏗️ Architecture

```
┌─────────────────┐
│   Frontend UI   │  ← Landing Page (Zerodha-inspired)
│   (React)       │     https://main.d396oielaum726.amplifyapp.com/
└────────┬────────┘
         │
┌────────▼────────┐
│   Dashboard     │  ← Trading Platform
│   (React)       │     https://main.d31wkgvjp4a2zm.amplifyapp.com
└────────┬────────┘
         │
         │ REST API
         │
┌────────▼────────┐
│    Backend      │  ← Node.js/Express
│  (Express.js)   │     AWS Elastic Beanstalk
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼──────┐
│MongoDB│ │ RapidAPI│
│ Atlas │ │ (Stocks)│
└───────┘ └─────────┘
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16+)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/stockvault.git
cd stockvault
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Configure your environment variables
npm start
```

3. **Setup Dashboard**
```bash
cd dashboard
npm install
cp .env.example .env
# Configure API endpoint
npm run dev
```

4. **Setup Frontend UI**
```bash
cd frontendUI
npm install
npm run dev
```

## 📂 Project Structure

```
stockvault/
├── backend/           # Express.js API server
│   ├── models/       # MongoDB schemas
│   ├── routes/       # API endpoints
│   ├── services/     # Business logic & RapidAPI integration
│   └── middleware/   # Auth & validation
│
├── dashboard/        # Main trading application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Holdings, Positions, Orders
│   │   ├── services/    # API calls
│   │   └── context/     # State management
│   └── public/
│
└── frontendUI/       # Landing page
    ├── src/
    │   ├── components/  # Hero, Features, etc.
    │   └── pages/       # Home, About, Login
    └── public/
```

## 🔧 Technology Stack

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing

### External Services
- **RapidAPI** - Live stock market data
- **MongoDB Atlas** - Cloud database
- **AWS Elastic Beanstalk** - Backend hosting
- **AWS Amplify** - Frontend hosting

## 🌐 Live Deployment

| Service | URL | Status |
|---------|-----|--------|
| Landing Page | [View Site](https://main.d396oielaum726.amplifyapp.com/) | ✅ Live |
| Dashboard | [View App](https://main.d31wkgvjp4a2zm.amplifyapp.com) | ✅ Live |
| Backend API | [API Endpoint](https://stockvault-backend-env.eba-f37mvakq.ap-south-1.elasticbeanstalk.com) | ✅ Live |

## 📊 Features in Detail

### 1. Holdings Page
- View all owned stocks
- Real-time price updates
- Current value and P&L calculation
- Portfolio distribution

### 2. Positions Page
- Active trading positions
- Live P&L tracking
- Intraday performance
- Position analytics

### 3. Orders Page
- Buy/Sell order execution
- Order history
- Pending orders management
- Order status tracking

### 4. Dashboard Home
- Portfolio summary
- Market overview
- Quick actions
- Performance charts

## 🔐 Authentication Flow

```
User Registration
    ↓
Email Verification
    ↓
JWT Token Generation
    ↓
Protected Routes Access
```

## 📡 Data Flow

```
User Action 
    ↓
Frontend Component
    ↓
apiService.js
    ↓
Backend API (index.js)
    ↓
stockService.js → RapidAPI
    ↓
Live Data Fetched
    ↓
Transform to Schema
    ↓
Return to Frontend
    ↓
Real-time Display
```

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd dashboard
npm test
```

Tests are written using **Jest** and cover:
- API endpoints
- Authentication flows
- Component rendering
- Service functions

## 📸 Screenshots

> Add your screenshots here

### Landing Page
![Landing Page](./screenshots/landing.png)

### Dashboard
![Dashboard](./screenshots/dashboard.png)

### Holdings
![Holdings](./screenshots/holdings.png)

### Order Execution
![Orders](./screenshots/orders.png)

## 🔑 Environment Variables

### Backend (.env)
```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAPIDAPI_KEY=your_rapidapi_key
RAPIDAPI_HOST=live-stock-market.p.rapidapi.com
ALLOWED_ORIGINS=https://main.d31wkgvjp4a2zm.amplifyapp.com
PORT=5713
```

### Frontend (.env)
```env
VITE_API_BASE=https://stockvault-backend-env.eba-f37mvakq.ap-south-1.elasticbeanstalk.com
```

## 📈 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  fullName: String,
  email: String,
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Orders Collection
```javascript
{
  _id: ObjectId,
  name: String,      // Stock symbol
  qty: Number,       // Quantity
  price: Number,     // Execution price
  mode: String,      // "BUY" or "SELL"
  createdAt: Date
}
```

## 🚧 Known Limitations

- Market data available during market hours only
- RapidAPI rate limits apply (check your plan)
- Real-time updates depend on API response time

## 🛣️ Roadmap

- [ ] Advanced charting and technical indicators
- [ ] Buy and Sell functionality
- [ ] Price alerts and notifications
- [ ] Multi-exchange support
- [ ] Paper trading mode

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Devesh Jaiswal**

- Email: deveshjaiswal1212@gmail.com
- LinkedIn: https://www.linkedin.com/in/deveshjaiswal11/
- Portfolio: https://deveshsj-portfolio.netlify.app/

## 🙏 Acknowledgments

- [RapidAPI](https://rapidapi.com) for live market data
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for database hosting
- [AWS](https://aws.amazon.com) for reliable deployment infrastructure

## 📞 Support

For support, email deveshjaiswal1212@gmail.com or create an issue in the repository.

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by [Devesh Jaiswal](https://github.com/deveshSJ11)

</div>
