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

  const handleAddFunds = () => {
    setShowAddFunds(true);
  };

  const handleWithdraw = () => {
    setShowWithdraw(true);
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
      alert("Please enter a valid amount");
      return;
    }

    // Update the available margin and payin
    setAvailableMargin(prev => prev + fundAmount);
    setPayin(prev => prev + fundAmount);
    
    alert(`₹${fundAmount.toFixed(2)} added to your account!\n\nYour new available margin: ₹${(availableMargin + fundAmount).toFixed(2)}\n\nNote: This is a demo. In production, integrate with payment gateway.`);
    handleCloseModal();
  };

  const handleSubmitWithdraw = (e) => {
    e.preventDefault();
    const withdrawAmount = parseFloat(amount);
    
    if (!amount || withdrawAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    if (withdrawAmount > availableMargin) {
      alert(`Insufficient funds. Available margin: ₹${availableMargin.toFixed(2)}`);
      return;
    }

    // Update the available margin and payin
    setAvailableMargin(prev => prev - withdrawAmount);
    setPayin(prev => prev - withdrawAmount);

    alert(`₹${withdrawAmount.toFixed(2)} withdrawal initiated!\n\nYour new available margin: ₹${(availableMargin - withdrawAmount).toFixed(2)}\n\nNote: This is a demo. In production, process through bank.`);
    handleCloseModal();
  };

  const handleOpenCommodity = () => {
    alert("Opening commodity account...\n\nNote: This is a demo feature. In production, this would redirect to account opening form.");
  };

  return (
    <>
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