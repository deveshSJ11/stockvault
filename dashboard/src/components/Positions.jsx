import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    // Connect to your backend Socket.IO
    const socket = io(import.meta.env.VITE_API_BASE || "https://your-backend-url.com");

    // Listen for live updates
    socket.on("updatePositions", (data) => {
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

  if (!allPositions.length) return <p>Loading positions...</p>;

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3>Positions ({allPositions.length})</h3>
        <span style={{ fontSize: '12px', color: '#666' }}>{formatLastUpdated()}</span>
      </div>

      <div style={{ padding: '15px', backgroundColor: totalPnL >= 0 ? '#d4edda' : '#f8d7da', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
        <h5 className={totalPnL >= 0 ? 'profit' : 'loss'}>Total P&L: ₹{totalPnL.toFixed(2)}</h5>
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
