/* eslint-disable react-refresh/only-export-components */

import React, { useState } from "react";


const Funds = () => {
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [amount, setAmount] = useState("");
  const [availableMargin, setAvailableMargin] = useState(4043.10);
  const [usedMargin] = useState(3757.30);
  const [openingBalance] = useState(4043.10);
  const [payin, setPayin] = useState(4064.00);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddFunds = () => {
    setShowAddFunds(true);
    setAmount("");
  };

  const handleWithdraw = () => {
    setShowWithdraw(true);
    setAmount("");
  };

  const handleCloseModal = () => {
    setShowAddFunds(false);
    setShowWithdraw(false);
    setAmount("");
  };

  const handleSubmitAddFunds = (e) => {
    e.preventDefault();
    const fundAmount = parseFloat(amount);
    
    if (!amount || fundAmount <= 0) {
      showNotification("Please enter a valid amount", "error");
      return;
    }

    const newMargin = availableMargin + fundAmount;
    const newPayin = payin + fundAmount;

    setAvailableMargin(newMargin);
    setPayin(newPayin);
    
    showNotification(
      `₹${fundAmount.toFixed(2)} added successfully! New available margin: ₹${newMargin.toFixed(2)}`,
      "success"
    );
    handleCloseModal();
  };

  const handleSubmitWithdraw = (e) => {
    e.preventDefault();
    const withdrawAmount = parseFloat(amount);
    
    if (!amount || withdrawAmount <= 0) {
      showNotification("Please enter a valid amount", "error");
      return;
    }

    if (withdrawAmount > availableMargin) {
      showNotification(
        `Insufficient funds. Available margin: ₹${availableMargin.toFixed(2)}`,
        "error"
      );
      return;
    }

    const newMargin = availableMargin - withdrawAmount;
    const newPayin = payin - withdrawAmount;

    setAvailableMargin(newMargin);
    setPayin(newPayin);

    showNotification(
      `₹${withdrawAmount.toFixed(2)} withdrawal initiated! New available margin: ₹${newMargin.toFixed(2)}`,
      "success"
    );
    handleCloseModal();
  };

  const handleOpenCommodity = () => {
    showNotification(
      "Redirecting to account opening form. This is a demo feature.",
      "success"
    );
  };

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

      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI</p>
        <button className="btn btn-green" onClick={handleAddFunds}>
          Add funds
        </button>
        <button className="btn btn-blue" onClick={handleWithdraw}>
          Withdraw
        </button>
      </div>

      <div className="row">
        <div className="col">
          <span>
            <p>Equity</p>
          </span>

          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">{availableMargin.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">{usedMargin.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp">{availableMargin.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <hr />
            <div className="data">
              <p>Opening Balance</p>
              <p>{openingBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="data">
              <p>Opening Balance</p>
              <p>3736.40</p>
            </div>
            <div className="data">
              <p>Payin</p>
              <p>{payin.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="data">
              <p>SPAN</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Delivery margin</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Exposure</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Options premium</p>
              <p>0.00</p>
            </div>
            <hr />
            <div className="data">
              <p>Collateral (Liquid funds)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Collateral (Equity)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Total Collateral</p>
              <p>0.00</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
            <button className="btn btn-blue" onClick={handleOpenCommodity}>
              Open Account
            </button>
          </div>
        </div>
      </div>

      {/* Add Funds Modal */}
      {showAddFunds && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Funds</h3>
              <button className="close-btn" onClick={handleCloseModal}>×</button>
            </div>
            <form onSubmit={handleSubmitAddFunds}>
              <div className="modal-body">
                <label>Enter Amount</label>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="₹ 0.00"
                  value={amount}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^\d*\.?\d*$/.test(value)) {
                      setAmount(value);
                    }
                  }}
                  autoFocus
                />
                <div className="quick-amounts">
                  <button type="button" onClick={() => setAmount("1000")}>₹1,000</button>
                  <button type="button" onClick={() => setAmount("5000")}>₹5,000</button>
                  <button type="button" onClick={() => setAmount("10000")}>₹10,000</button>
                  <button type="button" onClick={() => setAmount("25000")}>₹25,000</button>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-grey" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-green">
                  Add Funds
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdraw && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Withdraw Funds</h3>
              <button className="close-btn" onClick={handleCloseModal}>×</button>
            </div>
            <form onSubmit={handleSubmitWithdraw}>
              <div className="modal-body">
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
                  Available: ₹{availableMargin.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <label>Enter Amount</label>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="₹ 0.00"
                  value={amount}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^\d*\.?\d*$/.test(value)) {
                      setAmount(value);
                    }
                  }}
                  autoFocus
                />
                <div className="quick-amounts">
                  <button type="button" onClick={() => setAmount("1000")}>₹1,000</button>
                  <button type="button" onClick={() => setAmount("2000")}>₹2,000</button>
                  <button type="button" onClick={() => setAmount("4000")}>₹4,000</button>
                  <button type="button" onClick={() => setAmount(availableMargin.toString())}>Max</button>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-grey" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-blue">
                  Withdraw
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Funds;