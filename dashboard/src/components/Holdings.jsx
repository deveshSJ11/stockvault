/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("connecting");

  useEffect(() => {
    // Get backend URL from environment variable
    const backendUrl = import.meta.env.VITE_API_BASE;
    
    if (!backendUrl) {
      console.error("VITE_API_BASE is not defined. Check your .env file");
      setConnectionStatus("error");
      setError("Configuration error: Backend URL not found");
      setLoading(false);
      return;
    }

    console.log("🔌 Connecting to Socket.IO at:", backendUrl);

    // Connect to backend Socket.IO
    const socket = io(backendUrl, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      transports: ['websocket', 'polling']
    });

    // Connection events
    socket.on("connect", () => {
      console.log("✅ Socket.IO connected for Holdings");
      setConnectionStatus("connected");
      setLoading(false);
      setError(null);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket.IO disconnected from Holdings");
      setConnectionStatus("disconnected");
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket.IO connection error:", err);
      setConnectionStatus("error");
      setError("Failed to connect to live data server");
      setLoading(false);
    });

    // Listen for live holdings updates (emitted every 5 seconds from backend)
    socket.on("updateHoldings", (data) => {
      console.log("📊 Holdings updated via Socket.IO:", data);
      
      // Transform and validate data
      const safeData = data.map((stock) => ({
        name: stock.name || "-",
        qty: Number(stock.qty) || 0,
        avg: Number(stock.avg) || 0,
        price: Number(stock.price) || 0,
        net: stock.net || "-",
        day: stock.day || "-",
      }));

      setAllHoldings(safeData);
      setLastUpdated(new Date());
      setLoading(false);
      setError(null);
    });

    // Cleanup on unmount
    return () => {
      console.log("🔌 Disconnecting Socket.IO for Holdings");
      socket.disconnect();
    };
  }, []);

  // Format last updated time
  const formatLastUpdated = () => {
    if (!lastUpdated) return "";
    const now = new Date();
    const diff = Math.floor((now - lastUpdated) / 1000);
    
    if (diff < 60) return `Updated ${diff}s ago`;
    if (diff < 3600) return `Updated ${Math.floor(diff / 60)}m ago`;
    return `Updated at ${lastUpdated.toLocaleTimeString()}`;
  };

  // Calculate totals
  const totalInvestment = allHoldings.reduce(
    (acc, stock) => acc + stock.avg * stock.qty,
    0
  );
  const totalCurrentValue = allHoldings.reduce(
    (acc, stock) => acc + stock.price * stock.qty,
    0
  );
  const totalPnL = totalCurrentValue - totalInvestment;
  const totalPnLPercent =
    totalInvestment > 0
      ? ((totalPnL / totalInvestment) * 100).toFixed(2)
      : 0;

  // Chart data
  const chartData = useMemo(
    () => ({
      labels: allHoldings.map((stock) => stock.name),
      datasets: [
        {
          label: "Current Value (₹)",
          data: allHoldings.map((stock) => stock.price * stock.qty),
          backgroundColor: "rgba(65, 132, 243, 0.7)",
          borderColor: "rgba(65, 132, 243, 1)",
          borderWidth: 1,
        },
        {
          label: "Investment (₹)",
          data: allHoldings.map((stock) => stock.avg * stock.qty),
          backgroundColor: "rgba(255, 159, 64, 0.7)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 1,
        },
      ],
    }),
    [allHoldings]
  );

  // Loading state
  if (loading && allHoldings.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p style={{ marginTop: "20px" }}>
          {connectionStatus === "connecting" 
            ? "Connecting to live data..." 
            : "Fetching live stock data..."}
        </p>
        <p style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
          Status: {connectionStatus}
        </p>
      </div>
    );
  }

  // Error state
  if (error && allHoldings.length === 0) {
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
  if (!allHoldings.length && connectionStatus === "connected") {
    return (
      <div style={{ textAlign: "center", padding: "50px", color: "#666" }}>
        <p>Waiting for holdings data...</p>
        <p style={{ fontSize: "12px", marginTop: "10px" }}>
          {connectionStatus === "connected" ? "🟢 Connected" : "🔴 Disconnected"}
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Header with live status */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h3 className="title">Holdings ({allHoldings.length})</h3>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <span style={{ fontSize: "12px", color: "#666" }}>
            {formatLastUpdated()} • {connectionStatus === "connected" ? "🟢 Live" : "🔴 Offline"}
          </span>
        </div>
      </div>

      {/* Scrollable Chart + Table */}
      <div style={{ overflowY: "auto", maxHeight: "70vh", paddingRight: "10px" }}>
        {allHoldings.length > 0 && (
          <div className="fade-in-chart">
            <VerticalGraph key={allHoldings.length} data={chartData} />
          </div>
        )}

        <div className="order-table" style={{ marginTop: "20px" }}>
          <table>
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Avg. cost</th>
                <th>LTP</th>
                <th>Cur. val</th>
                <th>P&L</th>
                <th>Net chg.</th>
                <th>Day chg.</th>
              </tr>
            </thead>
            <tbody>
              {allHoldings.map((stock, index) => {
                const curValue = stock.price * stock.qty;
                const investment = stock.avg * stock.qty;
                const pnl = curValue - investment;
                const isProfit = pnl >= 0.0;
                const profClass = isProfit ? "profit" : "loss";
                const dayClass =
                  stock.day && stock.day.startsWith("+") ? "profit" : "loss";

                return (
                  <tr key={index}>
                    <td>{stock.name}</td>
                    <td>{stock.qty}</td>
                    <td>{stock.avg.toFixed(2)}</td>
                    <td>{stock.price.toFixed(2)}</td>
                    <td>{curValue.toFixed(2)}</td>
                    <td className={profClass}>{pnl.toFixed(2)}</td>
                    <td className={profClass}>{stock.net}</td>
                    <td className={dayClass}>{stock.day}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Section */}
      <div className="row" style={{ marginTop: "20px" }}>
        <div className="col">
          <h5>
            {totalInvestment.toFixed(0).split(".")[0]}.
            <span>{totalInvestment.toFixed(2).split(".")[1] || "00"}</span>
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            {totalCurrentValue.toFixed(0).split(".")[0]}.
            <span>{totalCurrentValue.toFixed(2).split(".")[1] || "00"}</span>
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={totalPnL >= 0 ? "profit" : "loss"}>
            {totalPnL.toFixed(2)} ({totalPnL >= 0 ? "+" : ""}
            {totalPnLPercent}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
    </>
  );
};

export default Holdings;