import React, { useState, useEffect } from "react";
import { getAllPositions } from "../services/ApiService";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch positions data
  const fetchPositions = async (showRefreshIndicator = false) => {
    try {
      if (showRefreshIndicator) {
        setIsRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);
      
      const data = await getAllPositions();
      setAllPositions(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to fetch positions data. Please try again.');
      console.error('Error fetching positions:', err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchPositions();

    // Auto-refresh every 2 minutes
    const interval = setInterval(() => fetchPositions(true), 2 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Manual refresh
  const handleRefresh = () => {
    fetchPositions(true);
  };

  // Calculate total P&L
  const totalPnL = allPositions.reduce((sum, stock) => {
    const pnl = (stock.price - stock.avg) * stock.qty;
    return sum + pnl;
  }, 0);

  // Format last updated time
  const formatLastUpdated = () => {
    if (!lastUpdated) return '';
    const now = new Date();
    const diff = Math.floor((now - lastUpdated) / 1000);
    
    if (diff < 60) return `Updated ${diff}s ago`;
    if (diff < 3600) return `Updated ${Math.floor(diff / 60)}m ago`;
    return `Updated at ${lastUpdated.toLocaleTimeString()}`;
  };

  // Loading state
  if (loading && allPositions.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p style={{ marginTop: '20px' }}>Fetching live positions...</p>
      </div>
    );
  }

  // Error state
  if (error && allPositions.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <div style={{ color: '#d9534f', marginBottom: '20px' }}>
          <i className="fa fa-exclamation-circle" style={{ fontSize: '48px' }}></i>
        </div>
        <h4>{error}</h4>
        <button className="btn btn-primary btn-blue" onClick={() => fetchPositions()}>
          Retry
        </button>
      </div>
    );
  }

  // Empty state
  if (allPositions.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <p>No positions available</p>
        <button className="btn btn-primary" onClick={() => fetchPositions()}>
          Refresh
        </button>
      </div>
    );
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 className="title">Positions ({allPositions.length})</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '12px', color: '#666' }}>
            {formatLastUpdated()}
          </span>
          <button 
            className="btn btn-sm btn-outline-primary btn-blue" 
            onClick={handleRefresh}
            disabled={isRefreshing}
            style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            <i className={`fa fa-refresh ${isRefreshing ? 'fa-spin' : ''}`}></i>
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Total P&L Summary */}
      <div style={{ 
        padding: '15px', 
        backgroundColor: totalPnL >= 0 ? '#d4edda' : '#f8d7da',
        borderRadius: '8px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <h5 className={totalPnL >= 0 ? 'profit' : 'loss'} style={{ margin: 0 }}>
          Total P&L: ₹{totalPnL.toFixed(2)}
        </h5>
      </div>

      {/* Positions Table */}
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
              const curValue = stock.price * stock.qty;
              const pnl = curValue - stock.avg * stock.qty;
              const isProfit = pnl >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.day && stock.day.startsWith('+') ? "profit" : "loss";

              return (
                <tr key={index}>
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td className={profClass}>
                    {pnl.toFixed(2)}
                  </td>
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