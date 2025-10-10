import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("connecting");

  useEffect(() => {
    // Get backend URL from environment variable
    const backendUrl = import.meta.env.VITE_API_BASE;
    
    if (!backendUrl) {
      console.error("VITE_API_BASE is not defined. Check your .env file");
      setConnectionStatus("error");
      return;
    }

    // Connect to your backend Socket.IO
    const socket = io(backendUrl, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    // Connection events
    socket.on("connect", () => {
      console.log("✅ Socket.IO connected");
      setConnectionStatus("connected");
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket.IO disconnected");
      setConnectionStatus("disconnected");
    });

    socket.on("connect_error", (error) => {
      console.error("❌ Socket.IO connection error:", error);
      setConnectionStatus("error");
    });

    // Listen for live position updates
    socket.on("updatePositions", (data) => {
      console.log("📊 Positions updated:", data);
      setAllPositions(data);
      setLastUpdated(new Date());
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const formatLastUpdated = () => {
    if (!lastUpdated) return '';
    const now = new Date();
    const diff = Math.floor((now - lastUpdated) / 1000);
    
    if (diff < 60) return `Updated ${diff}s ago`;
    if (diff < 3600) return `Updated ${Math.floor(diff / 60)}m ago`;
    return `Updated at ${lastUpdated.toLocaleTimeString()}`;
  };

  const totalPnL = allPositions.reduce((sum, stock) => {
    return sum + (stock.price - stock.avg) * stock.qty;
  }, 0);

  // Show loading state
  if (connectionStatus === "connecting") {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Connecting...</span>
        </div>
        <p style={{ marginTop: "20px" }}>Connecting to live data...</p>
      </div>
    );
  }

  // Show error state
  if (connectionStatus === "error") {
    return (
      <div style={{ textAlign: "center", padding: "50px", color: "#d9534f" }}>
        <i className="fa fa-exclamation-circle" style={{ fontSize: "48px" }}></i>
        <h4 style={{ marginTop: "20px" }}>Connection Error</h4>
        <p>Failed to connect to live data. Please refresh the page.</p>
      </div>
    );
  }

  // Show empty state
  if (!allPositions.length) {
    return (
      <div style={{ textAlign: "center", padding: "50px", color: "#666" }}>
        <p>Loading positions...</p>
        <p style={{ fontSize: "12px", marginTop: "10px" }}>Status: {connectionStatus}</p>
      </div>
    );
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3>Positions ({allPositions.length})</h3>
        <span style={{ fontSize: '12px', color: '#666' }}>
          {formatLastUpdated()} • {connectionStatus === "connected" ? "🟢 Live" : "🔴 Offline"}
        </span>
      </div>

      <div style={{ padding: '15px', backgroundColor: totalPnL >= 0 ? '#d4edda' : '#f8d7da', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
        <h5 className={totalPnL >= 0 ? 'profit' : 'loss'}>
          Total P&L: ₹{totalPnL.toFixed(2)}
        </h5>
      </div>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {allPositions.map((stock, index) => {
              const pnl = (stock.price - stock.avg) * stock.qty;
              const profClass = pnl >= 0 ? "profit" : "loss";
              const dayClass = stock.day && stock.day.startsWith('+') ? "profit" : "loss";
              return (
                <tr key={index}>
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td className={profClass}>{pnl.toFixed(2)}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;