/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect, useMemo } from "react";
import { getAllHoldings } from "../services/ApiService";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch holdings data
  const fetchHoldings = async (showRefreshIndicator = false) => {
    try {
      if (showRefreshIndicator) setIsRefreshing(true);
      else setLoading(true);

      setError(null);

      const data = await getAllHoldings();
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
    } catch (err) {
      setError("Failed to fetch holdings data. Please try again.");
      console.error("Error fetching holdings:", err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  // Initial fetch + auto-refresh
// Initial fetch + auto-refresh every 5 seconds
useEffect(() => {
  fetchHoldings();
  const interval = setInterval(() => fetchHoldings(true), 5 * 1000); // 5 seconds
  return () => clearInterval(interval);
}, []);


  const handleRefresh = () => fetchHoldings(true);

  // Totals
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
  const chartData = useMemo(() => ({
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
  }), [allHoldings]);

  // Last updated format
  const formatLastUpdated = () => {
    if (!lastUpdated) return "";
    const now = new Date();
    const diff = Math.floor((now - lastUpdated) / 1000);
    if (diff < 60) return `Updated ${diff}s ago`;
    if (diff < 3600) return `Updated ${Math.floor(diff / 60)}m ago`;
    return `Updated at ${lastUpdated.toLocaleTimeString()}`;
  };

  // Loading state with message
  if (loading && allHoldings.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p style={{ marginTop: "20px" }}>Fetching live stock data...</p>
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
        <button className="btn btn-primary btn-blue" onClick={() => fetchHoldings()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Header + Refresh */}
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
            {formatLastUpdated()}
          </span>
          {/* <button
            className="btn btn-sm btn-outline-primary btn-blue"
            onClick={handleRefresh}
            disabled={isRefreshing}
            style={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            <i className={`fa fa-refresh ${isRefreshing ? "fa-spin" : ""}`}></i>
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </button> */}
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
