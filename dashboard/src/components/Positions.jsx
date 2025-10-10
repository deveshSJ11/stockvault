import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("connecting");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get backend URL from environment variable
    const backendUrl = import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_BASE;
    
    if (!backendUrl) {
      console.error("❌ VITE_API_BASE or VITE_SOCKET_URL is not defined. Check your .env file");
      setConnectionStatus("error");
      setError("Configuration error: Backend URL not found");
      setLoading(false);
      return;
    }

    console.log("🔌 Connecting to Socket.IO at:", backendUrl);

    // Connect to backend Socket.IO with production-ready configuration
    const socket = io(backendUrl, {
      path: '/socket.io',
      transports: ['websocket', 'polling'], // Try WebSocket first, fallback to polling
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      timeout: 20000,
      autoConnect: true,
      withCredentials: true,
      forceNew: false,
      upgrade: true,
      secure: true // Required for HTTPS connections
    });

    // Connection events
    socket.on("connect", () => {
      console.log("✅ Socket.IO connected for Positions | ID:", socket.id);
      console.log("🔌 Transport:", socket.io.engine.transport.name);
      setConnectionStatus("connected");
      setLoading(false);
      setError(null);
    });

    socket.on("disconnect", (reason) => {
      console.log("🔌 Socket.IO disconnected from Positions | Reason:", reason);
      setConnectionStatus("disconnected");
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket.IO connection error:", err);
      console.log("Current transport:", socket.io.engine?.transport?.name || 'none');
      console.log("Backend URL:", backendUrl);
      setConnectionStatus("error");
      setError(`Connection failed: ${err.message}`);
      setLoading(false);
    });

    socket.on("reconnect_attempt", (attemptNumber) => {
      console.log(`🔄 Reconnection attempt ${attemptNumber}...`);
      setConnectionStatus("reconnecting");
    });

    socket.on("reconnect", (attemptNumber) => {
      console.log(`✅ Reconnected after ${attemptNumber} attempts`);
      setConnectionStatus("connected");
      setError(null);
    });

    // Listen for transport upgrade
    socket.io.engine.on("upgrade", (transport) => {
      console.log("⬆️ Transport upgraded to:", transport.name);
    });

    // Listen for live position updates
    socket.on("updatePositions", (data) => {
      console.log("📊 Positions updated via Socket.IO:", data.length, "positions");
      
      // Transform and validate data
      const safeData = data.map((position) => ({
        product: position.product || "-",
        name: position.name || "-",
        qty: Number(position.qty) || 0,
        avg: Number(position.avg) || 0,
        price: Number(position.price) || 0,
        net: position.net || "-",
        day: position.day || "-",
        isLoss: position.isLoss || false
      }));

      setAllPositions(safeData);
      setLastUpdated(new Date());
      setLoading(false);
      setError(null);
    });

    // Cleanup on unmount
    return () => {
      console.log("🔌 Disconnecting Socket.IO for Positions");
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

  const getStatusColor = () => {
    switch (connectionStatus) {
      case "connected": return "🟢";
      case "connecting": return "🟡";
      case "reconnecting": return "🟡";
      case "disconnected": return "🔴";
      case "error": return "🔴";
      default: return "⚪";
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case "connected": return "Live";
      case "connecting": return "Connecting";
      case "reconnecting": return "Reconnecting";
      case "disconnected": return "Offline";
      case "error": return "Error";
      default: return "Unknown";
    }
  };

  const totalPnL = allPositions.reduce((sum, position) => {
    return sum + (position.price - position.avg) * position.qty;
  }, 0);

  // Loading state
  if (loading && allPositions.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p style={{ marginTop: "20px" }}>
          {connectionStatus === "connecting" 
            ? "Connecting to live data..." 
            : connectionStatus === "reconnecting"
            ? "Reconnecting to server..."
            : "Fetching live position data..."}
        </p>
        <p style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
          Status: {connectionStatus}
        </p>
      </div>
    );
  }

  // Error state
  if (error && allPositions.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <div style={{ color: "#d9534f", marginBottom: "20px" }}>
          <i className="fa fa-exclamation-circle" style={{ fontSize: "48px" }}></i>
        </div>
        <h4>{error}</h4>
        <p style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
          Status: {connectionStatus}
        </p>
        <button 
          className="btn btn-primary btn-blue" 
          onClick={() => window.location.reload()}
          style={{ marginTop: "20px" }}
        >
          Retry Connection
        </button>
      </div>
    );
  }

  // Empty state (still connected but no data)
  if (!allPositions.length && connectionStatus === "connected") {
    return (
      <div style={{ textAlign: "center", padding: "50px", color: "#666" }}>
        <p>Waiting for positions data...</p>
        <p style={{ fontSize: "12px", marginTop: "10px" }}>
          {getStatusColor()} {getStatusText()}
        </p>
      </div>
    );
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3>Positions ({allPositions.length})</h3>
        <span style={{ fontSize: '12px', color: '#666' }}>
          {formatLastUpdated()} • {getStatusColor()} {getStatusText()}
        </span>
      </div>

      <div style={{ 
        padding: '15px', 
        backgroundColor: totalPnL >= 0 ? '#d4edda' : '#f8d7da', 
        borderRadius: '8px', 
        marginBottom: '20px', 
        textAlign: 'center' 
      }}>
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
            {allPositions.map((position, index) => {
              const pnl = (position.price - position.avg) * position.qty;
              const profClass = pnl >= 0 ? "profit" : "loss";
              const dayClass = position.day && position.day.startsWith('+') ? "profit" : "loss";
              
              return (
                <tr key={index}>
                  <td>{position.product}</td>
                  <td>{position.name}</td>
                  <td>{position.qty}</td>
                  <td>{position.avg.toFixed(2)}</td>
                  <td>{position.price.toFixed(2)}</td>
                  <td className={profClass}>{pnl.toFixed(2)}</td>
                  <td className={dayClass}>{position.day}</td>
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