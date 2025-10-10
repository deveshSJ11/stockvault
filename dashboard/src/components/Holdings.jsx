import React, { useState, useEffect, useMemo } from "react";
import { useSocket } from "../hooks/useSocket";
import { VerticalGraph } from "./VerticalGraph";

// Memoized table row for performance
const HoldingsRow = React.memo(({ stock }) => {
  const curValue = stock.price * stock.qty;
  const investment = stock.avg * stock.qty;
  const pnl = curValue - investment;
  const isProfit = pnl >= 0;
  const profClass = isProfit ? "profit" : "loss";
  const dayClass = stock.day?.startsWith("+") ? "profit" : "loss";

  return (
    <tr>
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
});

const Holdings = () => {
  const { socket, status, error: socketError } = useSocket();
  const [allHoldings, setAllHoldings] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Socket event for live updates
  useEffect(() => {
    if (!socket) return;

    const handleUpdate = (data) => {
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
    };

    socket.on("updateHoldings", handleUpdate);

    return () => {
      socket.off("updateHoldings", handleUpdate);
    };
  }, [socket]);

  // Summary calculations
  const totalInvestment = allHoldings.reduce((acc, s) => acc + s.avg * s.qty, 0);
  const totalCurrentValue = allHoldings.reduce((acc, s) => acc + s.price * s.qty, 0);
  const totalPnL = totalCurrentValue - totalInvestment;
  const totalPnLPercent = totalInvestment > 0 ? ((totalPnL / totalInvestment) * 100).toFixed(2) : 0;

  // Chart data
  const chartData = useMemo(() => ({
    labels: allHoldings.map((s) => s.name),
    datasets: [
      {
        label: "Current Value (₹)",
        data: allHoldings.map((s) => s.price * s.qty),
        backgroundColor: "rgba(65, 132, 243, 0.7)",
        borderColor: "rgba(65, 132, 243, 1)",
        borderWidth: 1,
      },
      {
        label: "Investment (₹)",
        data: allHoldings.map((s) => s.avg * s.qty),
        backgroundColor: "rgba(255, 159, 64, 0.7)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  }), [allHoldings]);

  // Last updated formatting
  const formatLastUpdated = () => {
    if (!lastUpdated) return "";
    const diff = Math.floor((new Date() - lastUpdated) / 1000);
    if (diff < 60) return `Updated ${diff}s ago`;
    if (diff < 3600) return `Updated ${Math.floor(diff / 60)}m ago`;
    return `Updated at ${lastUpdated.toLocaleTimeString()}`;
  };

  // Connection status emojis
  const statusMap = {
    connected: "🟢 Live",
    connecting: "🟡 Connecting",
    reconnecting: "🟡 Reconnecting",
    disconnected: "🔴 Offline",
    error: "🔴 Error",
  };

  if ((status === "connecting" || status === "reconnecting") && allHoldings.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <div className="spinner-border text-primary" role="status"></div>
        <p>{statusMap[status]}</p>
      </div>
    );
  }

  if (status === "error" && allHoldings.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "50px", color: "#d9534f" }}>
        <h4>{socketError || "Socket connection failed"}</h4>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h3>Holdings ({allHoldings.length})</h3>
        <span style={{ fontSize: "12px", color: "#666" }}>
          {formatLastUpdated()} • {statusMap[status]}
        </span>
      </div>

      {/* Chart */}
      {allHoldings.length > 0 && <VerticalGraph key={allHoldings.length} data={chartData} />}

      {/* Table */}
      <div className="order-table" style={{ marginTop: "20px", overflowY: "auto", maxHeight: "60vh" }}>
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
            {allHoldings.map((stock, idx) => <HoldingsRow key={idx} stock={stock} />)}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="row" style={{ marginTop: "20px" }}>
        <div className="col">
          <h5>{totalInvestment.toFixed(2)}</h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>{totalCurrentValue.toFixed(2)}</h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={totalPnL >= 0 ? "profit" : "loss"}>
            {totalPnL.toFixed(2)} ({totalPnL >= 0 ? "+" : ""}{totalPnLPercent}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
    </>
  );
};

export default Holdings;
