import React, { useState, useEffect } from "react";
import Menu from "./Menu";

const TopBar = () => {
  // Simulate live price updates
  const [nifty, setNifty] = useState({
    value: 24567.80,
    change: 145.30,
    percentChange: 0.59
  });

  const [sensex, setSensex] = useState({
    value: 81234.50,
    change: 312.85,
    percentChange: 0.39
  });

  const [dow, setDow] = useState({
    value: 43789.50,
    change: -89.25,
    percentChange: -0.20
  });

  const [nasdaq, setNasdaq] = useState({
    value: 19234.75,
    change: 56.40,
    percentChange: 0.29
  });

  // Simulate real-time price fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      // Random small changes to simulate live updates
      const randomChange = () => (Math.random() - 0.5) * 10;
      
      setNifty(prev => {
        const change = prev.change + randomChange();
        const percentChange = (change / (prev.value - change)) * 100;
        return {
          value: prev.value - prev.change + change,
          change: change,
          percentChange: percentChange
        };
      });

      setSensex(prev => {
        const change = prev.change + randomChange() * 2;
        const percentChange = (change / (prev.value - change)) * 100;
        return {
          value: prev.value - prev.change + change,
          change: change,
          percentChange: percentChange
        };
      });

      setDow(prev => {
        const change = prev.change + randomChange() * 1.5;
        const percentChange = (change / (prev.value - change)) * 100;
        return {
          value: prev.value - prev.change + change,
          change: change,
          percentChange: percentChange
        };
      });

      setNasdaq(prev => {
        const change = prev.change + randomChange();
        const percentChange = (change / (prev.value - change)) * 100;
        return {
          value: prev.value - prev.change + change,
          change: change,
          percentChange: percentChange
        };
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const IndexCard = ({ name, value, change, percentChange }) => {
    const isPositive = change >= 0;
    const arrow = isPositive ? "▲" : "▼";
    
    return (
      <div className="index-card">
        <p className="index-name">{name}</p>
        <p className="index-value">{value.toFixed(2)}</p>
        <p className={`index-change ${isPositive ? 'positive' : 'negative'}`}>
          {arrow} {Math.abs(change).toFixed(2)} ({isPositive ? '+' : ''}{percentChange.toFixed(2)}%)
        </p>
      </div>
    );
  };

  return (
    <div className="topbar-container">
      <Menu />
      <div className="indices-container">
        <IndexCard 
          name="NIFTY 50" 
          value={nifty.value}
          change={nifty.change}
          percentChange={nifty.percentChange}
        />
        <IndexCard 
          name="SENSEX" 
          value={sensex.value}
          change={sensex.change}
          percentChange={sensex.percentChange}
        />
        <IndexCard 
          name="DOW JONES" 
          value={dow.value}
          change={dow.change}
          percentChange={dow.percentChange}
        />
        <IndexCard 
          name="NASDAQ" 
          value={nasdaq.value}
          change={nasdaq.change}
          percentChange={nasdaq.percentChange}
        />
      </div>


    </div>
  );
};

export default TopBar;