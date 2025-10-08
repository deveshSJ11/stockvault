
import {Link} from 'react-router-dom';

import React from "react";

function Hero() {
  return (
    <div className="hero-section">
      <div className="container py-5 mb-5">
        <div className="row">
          <div className="col-12 text-center">
            <div className="scroll-animate stagger-1">
              <div className="hero-image-wrapper">
                <img
                  src="media/images/homeHero.png"
                  alt="StockVault Trading Dashboard"
                  className="img-fluid mb-4 hero-image"
                  style={{ maxWidth: "900px" }}
                />
                {/* Floating Cards */}
                <div className="floating-card card-1">
                  <i className="fas fa-chart-line"></i>
                  <span>+24.5%</span>
                </div>
                <div className="floating-card card-2">
                 <i className="fas fa-stream"></i>
                  <span>Live Data</span>
                </div>
              </div>
            </div>
            
            <h1 className=" display-3 fw-bold mb-4  scroll-animate scale-in stagger-1" style={{ fontSize: "3rem", color: "#0f172a" }}>
              Trade Smarter, Track Better
            </h1>
            <p className="scroll-animate stagger-3 mb-4 fs-5" style={{ color: "#64748b", maxWidth: "600px", margin: "0 auto" }}>
              A modern trading platform demonstrating real-time market analytics, secure authentication, and intelligent portfolio management
            </p>
            <div className=" scroll-animate scale-in stagger-1">
                
                <Link to="/signup" className="btn btn-primary btn-lg px-5 py-3 mt-3">
                  Explore Demo <i className="fas fa-arrow-right ms-2"></i>
                  </Link>
            </div>
            <div className="scroll-animate stagger-5 mt-4">
              <span className="feature-badge">
                <i className="fas fa-shield-alt me-1"></i> Secure Authentication
              </span>
              <span className="feature-badge">
                <i className="fas fa-chart-line me-1"></i> Real-time Charts
              </span>
              <span className="feature-badge">
                <i className="fas fa-cloud me-1"></i> Security Focused
              </span>
            </div>
            
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;