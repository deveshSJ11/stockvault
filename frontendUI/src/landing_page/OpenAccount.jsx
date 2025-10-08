import React from "react";
import { Link } from "react-router-dom";

function OpenAccount() {
  return (
    <section className="open-account-section position-relative overflow-hidden py-5">
      {/* Animated Gradient Background */}
      <div className="open-account-bg"></div>

      <div className="container position-relative z-2 text-center">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            {/* Main Heading - Scale in */}
            <h1 className="display-3 fw-bold mb-4 text-gradient scroll-animate scale-in stagger-1">
              Try StockVault <br />
              <span className="highlight-text">Demo Platform</span>
            </h1>

            {/* Description - Fade in */}
            <p className="fs-5 text-muted mb-2 scroll-animate stagger-2">
              Explore the full-stack trading platform demo. Test real-time charts, 
              portfolio tracking, and secure authentication.
            </p>

            {/* Disclaimer - Fade in */}
            <p className="small text-muted mb-4 scroll-animate stagger-3">
              <strong>Educational Demo Only</strong> - No real trading or financial services
            </p>

            {/* CTA Button - Scale in */}
            <div className="scroll-animate scale-in stagger-4">
              <Link to="/signup" className="btn btn-outline-primary btn-lg px-5 py-3 mt-3">
                Get Started <i className="fas fa-arrow-right ms-2"></i>
              </Link>
            </div>

            {/* Feature Badges - Slide up */}
            <div className="d-flex gap-3 justify-content-center text-muted small mt-3 feature-badges scroll-animate slide-up stagger-5">
              <div className="feature-badge">
                <i className="fas fa-shield-alt me-2"></i>
                Secure & Safe
              </div>
              <div className="feature-badge">
                <i className="fas fa-clock me-2"></i>
                24/7 Access
              </div>
              <div className="feature-badge">
                <i className="fas fa-desktop me-2"></i>
                Desktop & Mobile
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OpenAccount;