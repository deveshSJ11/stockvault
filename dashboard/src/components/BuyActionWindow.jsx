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
  const [fetchingPrice, setFetchingPrice] = useState(false);
  const [error, setError] = useState(null);

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
    // Allow empty string or valid positive numbers
    if (value === "" || /^\d+$/.test(value)) {
      setStockQuantity(value);
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    // Allow empty string or valid decimal numbers
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setStockPrice(value);
    }
  };

  const handleOrder = async (mode) => {
    const qty = parseInt(stockQuantity);
    const price = parseFloat(stockPrice);

    if (!stockQuantity || qty <= 0) {
      alert("Please enter a valid quantity");
      return;
    }
    if (!stockPrice || price <= 0) {
      alert("Please enter a valid price");
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
      
      // Close window first, then show success message
      closeBuyWindow();
      setTimeout(() => {
        alert(`${mode} order placed successfully!`);
      }, 100);
    } catch (err) {
      console.error(`Error placing ${mode} order:`, err);
      alert("Failed to place order. Please try again.");
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
        <div>
          <button
            className="btn btn-blue"
            onClick={handleBuyClick}
            disabled={loading}
          >
            {loading ? "Processing..." : "Buy"}
          </button>
          <button
            className="btn"
            style={{
              backgroundColor: "#ff5722",
              color: "white",
              margin: "0 10px",
            }}
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
  );
};

export default BuyActionWindow;