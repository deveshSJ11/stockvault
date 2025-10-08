import React, { useEffect } from "react";

function Hero() {
  useEffect(() => {
    // Scroll Animation Observer
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

    const animatedElements = document.querySelectorAll(
      '.scroll-animate, .slide-right, .slide-left'
    );
    
    animatedElements.forEach(el => observer.observe(el));

    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="hero-section">
      {/* Hero Image Section with Floating Cards */}
      <div className="container py-5">
        <div className="row">
          <div className="col-12 text-center">
            <div className="scroll-animate stagger-1">
              <div className="hero-image-wrapper position-relative d-inline-block">
                <img
                  src="media/images/aboutHero.png"
                  alt="StockVault Platform Architecture"
                  className="img-fluid mb-4 hero-image"
                  style={{ maxWidth: "900px", borderRadius: "20px" }}
                />
                {/* Floating Achievement Cards */}
                <div className="floating-card card-1">
                  <i className="fas fa-code"></i>
                  <span>JEST tested</span>
                </div>
                <div className="floating-card card-2">
                  <i className="fas fa-shield-alt"></i>
                  <span>Secure Auth</span>
                </div>
              </div>
            </div>

            <h1 className="scroll-animate stagger-2 mt-5 mb-3 fw-bold" style={{ fontSize: "3rem", color: "#0f172a" }}>
              Building Modern Trading Platforms
              <br />
              <span className="gradient-text">A Full-Stack Development Journey</span>
            </h1>
            
            <p className="scroll-animate stagger-3 mb-4 fs-5" style={{ color: "#64748b", maxWidth: "700px", margin: "0 auto" }}>
              Educational demo project showcasing end-to-end implementation of financial technology with industry-standard practices
            </p>

            <div className="scroll-animate stagger-4 mt-4">
              <span className="feature-badge">
                <i className="fas fa-code me-1"></i> MERN Stack
              </span>
              <span className="feature-badge">
                <i className="fas fa-shield-alt me-1"></i> JWT Auth
              </span>
              <span className="feature-badge">
                <i className="fas fa-cloud me-1"></i> AWS Deployed
              </span>
              <span className="feature-badge">
                <i className="fas fa-mobile-alt me-1"></i> Responsive
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Content Section */}
      <div className="container py-5 mt-5 border-top">
        <div className="row" style={{ lineHeight: "1.8" }}>
          {/* Left Column - The Vision */}
          <div className="col-12 col-lg-6 mb-5 mb-lg-0">
            <div className="scroll-animate slide-right">
              <div className="d-flex align-items-center mb-4">
                <div 
                  className="me-3" 
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "15px",
                    background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    boxShadow: "0 8px 20px rgba(20, 184, 166, 0.25)"
                  }}
                >
                  <i className="fas fa-lightbulb fs-3"></i>
                </div>
                <h2 className="fw-bold mb-0 gradient-text">The Vision</h2>
              </div>
              
              <p className="text-muted fs-6 mb-4">
                StockVault was created as a comprehensive demonstration of modern web 
                development practices applied to financial technology. The goal was to 
                build a realistic trading platform that showcases both technical expertise 
                and understanding of user experience in fintech applications.
              </p>
            </div>

            <div className="scroll-animate slide-right stagger-1">
              <p className="text-muted fs-6 mb-4">
                This project demonstrates the complete development lifecycle - from 
                database design and API architecture to responsive frontend interfaces 
                and secure authentication systems.
              </p>
            </div>

            <div className="scroll-animate slide-right stagger-2">
              <p className="text-muted fs-6 mb-4">
                The platform simulates real-world trading workflows including portfolio 
                management, order execution, market data visualization, and transaction 
                history tracking, providing a hands-on learning environment.
              </p>
            </div>

            {/* Learning Objectives Card */}
            <div className="scroll-animate slide-right stagger-3">
              <div 
                className="p-4 rounded-3 shadow-sm hover-lift"
                style={{
                  background: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)",
                  border: "2px solid #d1fae5"
                }}
              >
                <div className="d-flex align-items-start">
                  <i className="fas fa-graduation-cap fs-3 me-3 mt-1" style={{ color: "#14b8a6" }}></i>
                  <div>
                    <h5 className="fw-bold mb-2" style={{ color: "#14b8a6" }}>
                      Learning Objectives
                    </h5>
                    <p className="mb-0 text-muted">
                      Master full-stack development, authentication patterns, database optimization, 
                      and deployment strategies through practical application.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Technical Implementation */}
          <div className="col-12 col-lg-6">
            <div className="scroll-animate slide-left">
              <div className="d-flex align-items-center mb-4">
                <div 
                  className="me-3" 
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "15px",
                    background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    boxShadow: "0 8px 20px rgba(20, 184, 166, 0.25)"
                  }}
                >
                  <i className="fas fa-cog fs-3"></i>
                </div>
                <h2 className="fw-bold mb-0 gradient-text">Technical Stack</h2>
              </div>
              
              <p className="text-muted fs-6 mb-4">
                Built with the MERN stack (MongoDB, Express.js, React, Node.js), 
                StockVault implements industry-standard security practices including 
                JWT authentication, encrypted data storage, and protected API routes.
              </p>
            </div>

            <div className="scroll-animate slide-left stagger-1">
              <p className="text-muted fs-6 mb-4">
                The platform features real-time data visualization using Chart.js, 
                responsive design for mobile and desktop, comprehensive test coverage 
                with Jest, and cloud deployment on AWS infrastructure.
              </p>
            </div>

            <div className="scroll-animate slide-left stagger-2">
              <div className="alert alert-custom mb-4">
                <div className="d-flex align-items-start">
                  <i className="fas fa-info-circle me-2 mt-1" style={{ color: "#14b8a6" }}></i>
                  <div>
                    <strong style={{ color: "#14b8a6" }}>Key Learning Outcomes:</strong> RESTful API design, database schema 
                    optimization, state management, authentication flows, and production deployment strategies.
                  </div>
                </div>
              </div>
            </div>

            {/* GitHub Repository Card */}
            <div className="scroll-animate slide-left stagger-3">
              <div 
                className="p-4 rounded-3 shadow-sm hover-lift"
                style={{
                  background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
                  border: "2px solid #bfdbfe"
                }}
              >
                <div className="d-flex align-items-start">
                  <i className="fab fa-github fs-2 me-3 mt-1" style={{ color: "#14b8a6" }}></i>
                  <div className="flex-grow-1">
                    <h5 className="fw-bold mb-2" style={{ color: "#14b8a6" }}>
                      Open Source Project
                    </h5>
                    <p className="mb-3 text-muted">
                      Full source code and documentation available on GitHub for learning and collaboration.
                    </p>
                    <a 
                      href="https://github.com/deveshSJ11/stockvault" 
                      className="btn btn-sm hover-lift"
                      style={{
                        background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
                        color: "white",
                        border: "none",
                        padding: "8px 20px",
                        borderRadius: "10px",
                        fontWeight: "600",
                        textDecoration: "none",
                        display: "inline-block"
                      }}
                    >
                      <i className="fab fa-github me-2"></i>
                      View Repository
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Stats Banner */}
      <div className="container py-5 mb-5">
        <div 
          className="p-5 rounded-3 shadow-sm scroll-animate stagger-4"
          style={{
            background: "linear-gradient(135deg, rgba(20, 184, 166, 0.08), rgba(6, 182, 212, 0.08))",
            border: "2px solid rgba(20, 184, 166, 0.15)"
          }}
        >
          <div className="row text-center g-4">
            <div className="col-6 col-md-3">
              <div className="scroll-animate stagger-5">
                <div 
                  className="d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "15px",
                    background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
                    color: "white"
                  }}
                >
                  <i className="fas fa-code fs-3"></i>
                </div>
                <h4 className="fw-bold mb-1 gradient-text">10,000+</h4>
                <p className="text-muted mb-0">Lines of Code</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="scroll-animate stagger-6">
                <div 
                  className="d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "15px",
                    background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
                    color: "white"
                  }}
                >
                  <i className="fas fa-layer-group fs-3"></i>
                </div>
                <h4 className="fw-bold mb-1 gradient-text">15+</h4>
                <p className="text-muted mb-0">Components</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="scroll-animate stagger-7">
                <div 
                  className="d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "15px",
                    background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
                    color: "white"
                  }}
                >
                  <i className="fas fa-database fs-3"></i>
                </div>
                <h4 className="fw-bold mb-1 gradient-text">REST API</h4>
                <p className="text-muted mb-0">Full Backend</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="scroll-animate stagger-8">
                <div 
                  className="d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "15px",
                    background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
                    color: "white"
                  }}
                >
                  <i className="fas fa-shield-alt fs-3"></i>
                </div>
                <h4 className="fw-bold mb-1 gradient-text">Secure</h4>
                <p className="text-muted mb-0">JWT Protected</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;