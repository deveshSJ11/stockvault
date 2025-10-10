import React, { useState } from "react";
import { useSocket } from "../hooks/useSocket";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Use custom hook to get live positions
  const { status: connectionStatus } = useSocket("updatePositions", (data) => {
    setAllPositions(data);
    setLastUpdated(new Date());
  });

  // Format last updated time
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

  const totalPnL = allPositions.reduce((sum, stock) => {
    return sum + (stock.price - stock.avg) * stock.qty;
  }, 0);

  // Loading or reconnecting
  if (connectionStatus === "connecting" || connectionStatus === "reconnecting") {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Connecting...</span>
        </div>
        <p style={{ marginTop: "20px" }}>
          {connectionStatus === "connecting" 
            ? "Connecting to live data..." 
            : "Reconnecting to server..."}
        </p>
        <p style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
          Status: {connectionStatus}
        </p>
      </div>
    );
  }

  // Error state when no data
  if (connectionStatus === "error" && !allPositions.length) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <div style={{ color: "#d9534f", marginBottom: "20px" }}>
          <i className="fa fa-exclamation-circle" style={{ fontSize: "48px" }}></i>
        </div>
        <h4>Connection Error</h4>
        <p>Failed to connect to live data server.</p>
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

  // Empty state
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
