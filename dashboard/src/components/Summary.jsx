/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";

const Summary = () => {
  // State for dynamic values
  const [equity, setEquity] = useState({
    marginAvailable: 4043.10,
    marginsUsed: 3757.30,
    openingBalance: 4043.10
  });

  const [holdings, setHoldings] = useState({
    profitLoss: 2847.60,
    profitLossPercent: 8.45,
    currentValue: 36547.20,
    investment: 33699.60,
    count: 13
  });

  const [dayPnL, setDayPnL] = useState({
    value: 412.80,
    percent: 1.13
  });

  const [totalPortfolio, setTotalPortfolio] = useState(40590.30);

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  // Get market status
  const getMarketStatus = () => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const day = now.getDay();
    
    // Market hours: Mon-Fri 9:15 AM - 3:30 PM IST
    if (day === 0 || day === 6) return { status: "Closed", color: "#999" };
    
    const currentTime = hour * 60 + minute;
    const marketOpen = 9 * 60 + 15; // 9:15 AM
    const marketClose = 15 * 60 + 30; // 3:30 PM
    
    if (currentTime >= marketOpen && currentTime <= marketClose) {
      return { status: "Open", color: "#00A25B" };
    }
    return { status: "Closed", color: "#999" };
  };

  const [greeting, setGreeting] = useState(getGreeting());
  const [marketStatus, setMarketStatus] = useState(getMarketStatus());

  // Update greeting and market status periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getGreeting());
      setMarketStatus(getMarketStatus());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Simulate live P&L updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate small random changes in day's P&L
      setDayPnL(prev => {
        const change = (Math.random() - 0.5) * 20;
        const newValue = prev.value + change;
        const newPercent = (newValue / totalPortfolio) * 100;
        return {
          value: newValue,
          percent: newPercent
        };
      });

      // Simulate holdings value changes
      setHoldings(prev => {
        const change = (Math.random() - 0.5) * 50;
        const newCurrentValue = prev.currentValue + change;
        const newProfitLoss = newCurrentValue - prev.investment;
        const newPercent = (newProfitLoss / prev.investment) * 100;
        return {
          ...prev,
          currentValue: newCurrentValue,
          profitLoss: newProfitLoss,
          profitLossPercent: newPercent
        };
      });
    }, 4000); // Update every 4 seconds

    return () => clearInterval(interval);
  }, [totalPortfolio]);

  // Format currency
  const formatCurrency = (value) => {
    const absValue = Math.abs(value);
    if (absValue >= 100000) {
      return `${(value / 100000).toFixed(2)}L`;
    } else if (absValue >= 1000) {
      return `${(value / 1000).toFixed(2)}k`;
    }
    return value.toFixed(2);
  };

  return (
    <>
      <div className="username">
        <div className="greeting-section">
          <h6>{greeting}!</h6>
          <div className="market-status">
            <span className="status-dot" style={{ backgroundColor: marketStatus.color }}></span>
            <span className="status-text">Markets {marketStatus.status}</span>
          </div>
        </div>
        <hr className="divider" />
      </div>

      {/* Equity Section */}
      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>{formatCurrency(equity.marginAvailable)}</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>{formatCurrency(equity.marginsUsed)}</span>
            </p>
            <p>
              Opening balance <span>{formatCurrency(equity.openingBalance)}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      {/* Holdings Section */}
      <div className="section">
        <span>
          <p>Holdings ({holdings.count})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={holdings.profitLoss >= 0 ? "profit" : "loss"}>
              {holdings.profitLoss >= 0 ? "+" : ""}
              {formatCurrency(holdings.profitLoss)}{" "}
              <small>
                {holdings.profitLossPercent >= 0 ? "+" : ""}
                {holdings.profitLossPercent.toFixed(2)}%
              </small>
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{formatCurrency(holdings.currentValue)}</span>
            </p>
            <p>
              Investment <span>{formatCurrency(holdings.investment)}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      {/* Day's P&L Section */}
      <div className="section">
        <span>
          <p>Today's P&L</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={dayPnL.value >= 0 ? "profit" : "loss"}>
              {dayPnL.value >= 0 ? "+" : ""}
              {formatCurrency(dayPnL.value)}{" "}
              <small>
                {dayPnL.percent >= 0 ? "+" : ""}
                {dayPnL.percent.toFixed(2)}%
              </small>
            </h3>
            <p>Unrealized</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Realized <span>+0.00</span>
            </p>
            <p>
              Total <span className={dayPnL.value >= 0 ? "profit" : "loss"}>
                {dayPnL.value >= 0 ? "+" : ""}
                {formatCurrency(dayPnL.value)}
              </span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      {/* Quick Stats Section */}
      <div className="section">
        <span>
          <p>Quick Stats</p>
        </span>

        <div className="portfolio-grid">
          <div className="portfolio-item">
            <p className="portfolio-label">Total Portfolio</p>
            <h4 className="portfolio-value">{formatCurrency(totalPortfolio)}</h4>
          </div>
          <div className="portfolio-item">
            <p className="portfolio-label">Overall Returns</p>
            <h4 className="portfolio-value profit">
              +{((holdings.profitLoss / holdings.investment) * 100).toFixed(1)}%
            </h4>
          </div>
          <div className="portfolio-item">
            <p className="portfolio-label">Today's Move</p>
            <h4 className={`portfolio-value ${dayPnL.value >= 0 ? 'profit' : 'loss'}`}>
              {dayPnL.value >= 0 ? "+" : ""}{dayPnL.percent.toFixed(2)}%
            </h4>
          </div>
          <div className="portfolio-item">
            <p className="portfolio-label">Active Stocks</p>
            <h4 className="portfolio-value">{holdings.count}</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;