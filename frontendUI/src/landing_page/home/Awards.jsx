import { Link } from "react-router-dom";
import React from "react";

function Awards() {
  return (
    <div className="container mt-5 mb-5">
      <div className="row align-items-center">
        {/* Left - Main Message */}
        <div className="col-12 col-md-6 p-5">
          {/* Main Heading - Slide from left */}
          <h1 className="display-3 fw-bold mb-4 scroll-animate slide-right stagger-1">
            Invest in Your <br/>
            <span style={{ color: "#14b8a6" }}>Trading Skills</span>
          </h1>

          {/* Description - Slide from left */}
          <p className="fs-5 text-muted mb-4 scroll-animate slide-right stagger-2">
            Trading platform with real-time charts, portfolio tracking, 
            and order management. Learn without risk.
          </p>

          {/* Buttons - Slide from left */}
          <div className="d-flex gap-3 mb-4 scroll-animate slide-right stagger-3">
            <Link to="/login" className="btn btn-primary btn-lg px-3 py-2 mt-4">
              Start Trading Demo <i className="fas fa-arrow-right ms-2"></i>
            </Link>

            <Link to="/dashboard" className="btn btn-outline-primary btn-lg px-3 py-2 mt-4">
              View Dashboard <i className="fas fa-arrow-right ms-2"></i>
            </Link>
          </div>

          {/* Feature Icons - Slide from left */}
          <div className="d-flex gap-4 text-muted small scroll-animate slide-right stagger-4">
            <div>
              <i className="fas fa-shield-check me-2" style={{ color: "#10b981" }}></i>
              Secure Platform
            </div>
            <div>
              <i className="fas fa-clock me-2" style={{ color: "#10b981" }}></i>
              Real-time Data
            </div>
            <div>
              <i className="fas fa-mobile-alt me-2" style={{ color: "#10b981" }}></i>
              Mobile Friendly
            </div>
          </div>
        </div>

        {/* Right - Quick Stats with Floating Cards */}
        <div className="col-12 col-md-6 p-5 position-relative">
          {/* Floating Cards */}
          <div className="awards-floating-card card-1">
            <i className="fas fa-trophy"></i>
            <span>Top Rated</span>
          </div>
          <div className="awards-floating-card card-2">
            <i className="fas fa-star"></i>
            <span>Live update</span>
          </div>
          <div className="awards-floating-card card-3">
            <i className="fas fa-users"></i>
            <span>Users friendly</span>
          </div>

          {/* Stats Card - Slide from right */}
          <div className="card border-0 shadow-lg p-4 scroll-animate slide-left stagger-2">
            <div className="row g-3">
              {/* Each stat box animates individually */}
              <div className="col-6 scroll-animate scale-in stagger-3">
                <div className="text-center p-4 bg-light rounded hover-lift">
                  <h2 className="display-5 fw-bold mb-1" style={{ color: "#14b8a6" }}>₹0</h2>
                  <p className="text-muted small mb-0">Demo Trading Fee</p>
                </div>
              </div>
              
              <div className="col-6 scroll-animate scale-in stagger-4">
                <div className="text-center p-4 bg-light rounded hover-lift">
                  <h2 className="display-5 fw-bold mb-1" style={{ color: "#14b8a6" }}>24/7</h2>
                  <p className="text-muted small mb-0">Platform Access</p>
                </div>
              </div>
              
              <div className="col-6 scroll-animate scale-in stagger-5">
                <div className="text-center p-4 bg-light rounded hover-lift">
                  <h2 className="display-5 fw-bold mb-1" style={{ color: "#14b8a6" }}>100+</h2>
                  <p className="text-muted small mb-0">Stocks to Trade</p>
                </div>
              </div>
              
              <div className="col-6 scroll-animate scale-in stagger-6">
                <div className="text-center p-4 bg-light rounded hover-lift">
                  <h2 className="display-5 fw-bold mb-1" style={{ color: "#14b8a6" }}>Live</h2>
                  <p className="text-muted small mb-0">Market Charts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Awards;