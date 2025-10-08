import React, { useEffect } from "react";

function Hero() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => observer.observe(el));

    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="hero-section ">
      <div className="container py-5 mt-5">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="fw-bold mb-3  scroll-animate stagger-1" style={{ fontSize: "3rem", color: "#0f172a" }}>
              Platform Features
            </h1>
            <p className="text-muted fs-5 mb-5 scroll-animate stagger-2" style={{ maxWidth: "700px", margin: "0 auto" }}>
              Explore the key capabilities of{" "}
              <span className="gradient-text fw-bold">
                StockVault
              </span>{" "}
              demo trading platform
            </p>

            {/* Feature Highlights */}
            <div className="scroll-animate stagger-3">
              <span className="feature-badge">
                <i className="fas fa-chart-line me-1"></i> Real-Time Data
              </span>
              <span className="feature-badge">
                <i className="fas fa-shield-alt me-1"></i> Secure Trading
              </span>
              <span className="feature-badge">
                <i className="fas fa-mobile-alt me-1"></i> Responsive Design
              </span>
              <span className="feature-badge">
                <i className="fas fa-bolt me-1"></i> Fast Performance
              </span>
            </div>

            {/* Decorative Stats */}
            <div className="row mt-5 g-4 scroll-animate stagger-4">
              <div className="col-6 col-md-3">
                <div 
                  className="p-4 rounded-3 hover-lift"
                  style={{
                    background: "linear-gradient(135deg, rgba(20, 184, 166, 0.08), rgba(6, 182, 212, 0.08))",
                    border: "2px solid rgba(20, 184, 166, 0.15)"
                  }}
                >
                  <div 
                    className="d-inline-flex align-items-center justify-content-center mb-2"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
                      color: "white"
                    }}
                  >
                    <i className="fas fa-rocket fs-5"></i>
                  </div>
                  <h5 className="fw-bold mb-1 gradient-text">5+</h5>
                  <p className="text-muted small mb-0">Key Features</p>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div 
                  className="p-4 rounded-3 hover-lift"
                  style={{
                    background: "linear-gradient(135deg, rgba(20, 184, 166, 0.08), rgba(6, 182, 212, 0.08))",
                    border: "2px solid rgba(20, 184, 166, 0.15)"
                  }}
                >
                  <div 
                    className="d-inline-flex align-items-center justify-content-center mb-2"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
                      color: "white"
                    }}
                  >
                    <i className="fas fa-chart-line fs-5"></i>
                  </div>
                  <h5 className="fw-bold mb-1 gradient-text">Real-Time</h5>
                  <p className="text-muted small mb-0">Market Data</p>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div 
                  className="p-4 rounded-3 hover-lift"
                  style={{
                    background: "linear-gradient(135deg, rgba(20, 184, 166, 0.08), rgba(6, 182, 212, 0.08))",
                    border: "2px solid rgba(20, 184, 166, 0.15)"
                  }}
                >
                  <div 
                    className="d-inline-flex align-items-center justify-content-center mb-2"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
                      color: "white"
                    }}
                  >
                    <i className="fas fa-shield-alt fs-5"></i>
                  </div>
                  <h5 className="fw-bold mb-1 gradient-text">Secure</h5>
                  <p className="text-muted small mb-0">Authentication</p>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div 
                  className="p-4 rounded-3 hover-lift"
                  style={{
                    background: "linear-gradient(135deg, rgba(20, 184, 166, 0.08), rgba(6, 182, 212, 0.08))",
                    border: "2px solid rgba(20, 184, 166, 0.15)"
                  }}
                >
                  <div 
                    className="d-inline-flex align-items-center justify-content-center mb-2"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
                      color: "white"
                    }}
                  >
                    <i className="fas fa-code fs-5"></i>
                  </div>
                  <h5 className="fw-bold mb-1 gradient-text">MERN</h5>
                  <p className="text-muted small mb-0">Stack Built</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;