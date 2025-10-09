/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import { createOrder, getStockData } from "../services/ApiService";
import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState("");
  const [stockPrice, setStockPrice] = useState("");
  const [livePrice, setLivePrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingType, setLoadingType] = useState(null); // Track which button is loading
  const [fetchingPrice, setFetchingPrice] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  const { closeBuyWindow } = useContext(GeneralContext);

  useEffect(() => {
    if (!uid) return;

    const fetchPrice = async () => {
      setFetchingPrice(true);
      setError(null);

      try {
        const stockData = await getStockData(uid);
        console.log("Fetched stockData:", stockData);

        if (stockData && stockData.regularMarketPrice !== undefined) {
          const price = stockData.regularMarketPrice;
          setLivePrice(price);
          setStockPrice(price.toString());
          setStockQuantity("1");
        } else {
          setError("Live price not available");
        }
      } catch (err) {
        console.error("Error fetching live price:", err);
        setError("Failed to fetch live price");
      } finally {
        setFetchingPrice(false);
      }
    };

    fetchPrice();
  }, [uid]);

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setStockQuantity(value);
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setStockPrice(value);
    }
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleOrder = async (mode) => {
    const qty = parseInt(stockQuantity);
    const price = parseFloat(stockPrice);

    if (!stockQuantity || qty <= 0) {
      showNotification("Please enter a valid quantity", "error");
      return;
    }
    if (!stockPrice || price <= 0) {
      showNotification("Please enter a valid price", "error");
      return;
    }

    setLoading(true);
    try {
      await createOrder({
        name: uid,
        qty: qty,
        price: price,
        mode,
      });
      
      // FIX: Show notification BEFORE closing window
      const totalValue = (qty * price).toFixed(2);
      showNotification(
        `${mode} order placed successfully! ${qty} shares of ${uid} at ₹${price.toFixed(2)} (Total: ₹${totalValue})`,
        "success"
      );
      
      // Close window after a short delay to show notification
      setTimeout(() => {
        closeBuyWindow();
      }, 1500);
    } catch (err) {
      console.error(`Error placing ${mode} order:`, err);
      showNotification("Failed to place order. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleBuyClick = () => handleOrder("BUY");
  const handleSellClick = () => handleOrder("SELL");
  const handleCancelClick = () => closeBuyWindow();

  const qty = parseInt(stockQuantity) || 0;
  const price = parseFloat(stockPrice) || 0;
  const marginRequired = (qty * price).toFixed(2);

  return (
    <>
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          <div className="notification-content">
            <span className={`notification-icon notification-icon-${notification.type}`}>
              {notification.type === "success" ? "✓" : "!"}
            </span>
            <span className="notification-message">{notification.message}</span>
          </div>
          <div 
            className="notification-progress" 
            style={{ animationDuration: "3s" }}
          ></div>
        </div>
      )}

      <div className="container" id="buy-window">
        <div className="header">
          <h3>
            {uid} <span>NSE</span>
          </h3>
          {livePrice !== null && (
            <div style={{ fontSize: "14px", color: "#fff", marginTop: "5px" }}>
              Live Price: ₹{livePrice.toFixed(2)}
            </div>
          )}
          {error && <div style={{ color: "#ffcccc", fontSize: "13px" }}>{error}</div>}
        </div>

        <div className="regular-order">
          <div className="inputs">
            <fieldset>
              <legend>Qty.</legend>
              <input
                type="text"
                inputMode="numeric"
                value={stockQuantity}
                onChange={handleQuantityChange}
                disabled={loading}
                placeholder="0"
              />
            </fieldset>
            <fieldset>
              <legend>Price</legend>
              <input
                type="text"
                inputMode="decimal"
                value={stockPrice}
                onChange={handlePriceChange}
                disabled={loading}
                placeholder="0.00"
              />
            </fieldset>
          </div>
        </div>

        <div className="buttons">
          <span>Margin required ₹{marginRequired}</span>
          <div className="button-group">
            <button
              className="btn btn-blue"
              onClick={handleBuyClick}
              disabled={loading}
            >
              {loading ? "Processing..." : "Buy"}
            </button>
            <button
              className="btn btn-sell"
              onClick={handleSellClick}
              disabled={loading}
            >
              {loading ? "Processing..." : "Sell"}
            </button>
            <button
              className="btn btn-grey"
              onClick={handleCancelClick}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyActionWindow;