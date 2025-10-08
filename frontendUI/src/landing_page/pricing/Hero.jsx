import React, { useEffect, useState } from "react";

// Hero Component - Enhanced Pricing Hero
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

    const animatedElements = document.querySelectorAll('.scroll-animate, .slide-up');
    animatedElements.forEach(el => observer.observe(el));

    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="hero-section" style={{ 
      background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)',
        animation: 'rotate 30s linear infinite',
        pointerEvents: 'none'
      }}></div>

      <div className="container py-5 position-relative">
        
        
        {/* Main Header */}
        <div className="row text-center mb-5">
          <div className="col-12">
            <h1 className="scroll-animate stagger-2 fw-bold display-4 mb-3" style={{ color: "#0f172a" }}>
               Pricing
            </h1>
            <p className="scroll-animate stagger-3 lead text-muted mb-4" style={{ maxWidth: "700px", margin: "0 auto" }}>
              Sample pricing structure for{" "}
              <span style={{ 
                background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "700"
              }}>
                educational demonstration
              </span>{" "}
              only
            </p>
            
            {/* Feature Pills */}
            <div className="scroll-animate stagger-4 d-flex justify-content-center gap-2 flex-wrap">
              <span className="badge px-3 py-2" style={{
                background: "white",
                border: "2px solid #d1fae5",
                color: "#059669",
                fontSize: "0.9rem",
                fontWeight: "600",
                borderRadius: "12px"
              }}>
                <i className="fas fa-lock me-1"></i> Secure Demo
              </span>
              
              <span className="badge px-3 py-2" style={{
                background: "white",
                border: "2px solid #d1fae5",
                color: "#059669",
                fontSize: "0.9rem",
                fontWeight: "600",
                borderRadius: "12px"
              }}>
                <i className="fas fa-chart-line me-1"></i> Real-time Data
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="row p-4">
          {[
            {
              icon: "fa-gift",
              title: "Free Equity Delivery",
              description: "Sample pricing model: All equity delivery investments (NSE, BSE) with zero brokerage fees.",
              gradient: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)",
              border: "#d1fae5",
              stagger: 5
            },
            {
              icon: "fa-chart-line",
              title: "Intraday & F&O",
              description: "Demo structure: Flat ₹20 or 0.03% (whichever is lower) per order on intraday trades.",
              gradient: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
              border: "#bfdbfe",
              stagger: 6
            },
            {
              icon: "fa-piggy-bank",
              title: "Free Direct MF",
              description: "Sample model: Direct mutual fund investments with zero commissions and DP charges.",
              gradient: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)",
              border: "#e9d5ff",
              stagger: 7
            }
          ].map((item, i) => (
            <div key={i} className={`col-md-4 mb-4 scroll-animate slide-up stagger-${item.stagger}`}>
              <div className="h-100 p-4 rounded-4 shadow-sm hover-lift" style={{
                background: item.gradient,
                border: `2px solid ${item.border}`,
                transition: "all 0.4s ease"
              }}>
                <div style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "15px",
                  background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem auto",
                  color: "white",
                  boxShadow: "0 8px 20px rgba(20, 184, 166, 0.3)"
                }}>
                  <i className={`fas ${item.icon} fs-3`}></i>
                </div>
                
                <h3 className="fw-bold mb-3 text-center" style={{ color: "#14b8a6", fontSize: "1.5rem" }}>
                  {item.title}
                </h3>
                
                <p className="text-muted text-center mb-4" style={{ fontSize: "0.95rem", lineHeight: "1.7" }}>
                  {item.description}
                </p>
                
                <div className="text-center">
                  <span style={{ 
                    fontSize: "0.85rem", 
                    color: "#059669", 
                    fontWeight: "600",
                    background: "rgba(16, 185, 129, 0.1)",
                    padding: "10px 16px",
                    borderRadius: "10px",
                    display: "inline-block"
                  }}>
                    <i className="fas fa-info-circle me-1"></i>
                    Demo pricing for illustration
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Interactive Pricing Comparison Component
function PricingComparison() {
  const [activeTab, setActiveTab] = useState('equity');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('animate-in');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));
    return () => document.querySelectorAll('.scroll-animate').forEach(el => observer.unobserve(el));
  }, []);

  const pricingData = {
    equity: [
      { feature: "Delivery Trading", stockvault: "₹0", traditional: "₹20-40" },
      { feature: "Intraday Trading", stockvault: "₹20", traditional: "0.03%" },
      { feature: "Account Opening", stockvault: "Free", traditional: "₹300-500" },
      { feature: "Annual Maintenance", stockvault: "₹0", traditional: "₹300-600" }
    ],
    fo: [
      { feature: "Futures", stockvault: "₹20", traditional: "0.03%" },
      { feature: "Options", stockvault: "₹20", traditional: "₹50-100" },
      { feature: "Currency", stockvault: "₹20", traditional: "0.03%" },
      { feature: "Commodities", stockvault: "₹20", traditional: "0.03%" }
    ],
    mutual: [
      { feature: "Direct MF", stockvault: "Free", traditional: "1-2% commission" },
      { feature: "SIP Setup", stockvault: "Free", traditional: "₹50-100" },
      { feature: "Exit Load", stockvault: "As per AMC", traditional: "As per AMC" },
      { feature: "Transaction Fees", stockvault: "₹0", traditional: "₹10-50" }
    ]
  };

  return (
    <div className="container py-5">
      <div className="row mb-5">
        <div className="col-12 text-center scroll-animate">
          <h2 className="display-5 fw-bold mb-3" style={{ color: "#0f172a" }}>
            Pricing Comparison
          </h2>
          <p className="lead text-muted" style={{ maxWidth: "700px", margin: "0 auto" }}>
            See how demo pricing compares to traditional brokerages
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="row mb-4 scroll-animate">
        <div className="col-12">
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            {[
              { key: 'equity', label: 'Equity', icon: 'fa-chart-line' },
              { key: 'fo', label: 'F&O', icon: 'fa-exchange-alt' },
              { key: 'mutual', label: 'Mutual Funds', icon: 'fa-coins' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="btn px-4 py-3"
                style={{
                  background: activeTab === tab.key 
                    ? "linear-gradient(135deg, #14b8a6, #06b6d4)" 
                    : "white",
                  color: activeTab === tab.key ? "white" : "#64748b",
                  border: activeTab === tab.key ? "none" : "2px solid #e2e8f0",
                  borderRadius: "12px",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                  boxShadow: activeTab === tab.key ? "0 4px 15px rgba(20, 184, 166, 0.3)" : "none"
                }}
              >
                <i className={`fas ${tab.icon} me-2`}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="row scroll-animate">
        <div className="col-12">
          <div className="table-responsive">
            <table className="table" style={{ 
              background: "white", 
              borderRadius: "20px", 
              overflow: "hidden",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)"
            }}>
              <thead style={{ background: "linear-gradient(135deg, #14b8a6, #06b6d4)" }}>
                <tr>
                  <th className="p-4" style={{ color: "white", fontSize: "1.1rem", borderBottom: "none" }}>Feature</th>
                  <th className="p-4 text-center" style={{ color: "white", fontSize: "1.1rem", borderBottom: "none" }}>
                    <i className="fas fa-star me-2"></i>StockVault
                  </th>
                  <th className="p-4 text-center" style={{ color: "white", fontSize: "1.1rem", borderBottom: "none" }}>Traditional</th>
                </tr>
              </thead>
              <tbody>
                {pricingData[activeTab].map((row, i) => (
                  <tr key={i} style={{ 
                    borderBottom: i < pricingData[activeTab].length - 1 ? "1px solid #f1f5f9" : "none",
                    transition: "background 0.2s ease"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "white"}
                  >
                    <td className="p-4" style={{ fontWeight: "600", color: "#0f172a" }}>{row.feature}</td>
                    <td className="p-4 text-center" style={{ 
                      color: "#10b981", 
                      fontWeight: "700",
                      fontSize: "1.1rem"
                    }}>
                      {row.stockvault}
                    </td>
                    <td className="p-4 text-center" style={{ color: "#64748b" }}>{row.traditional}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center mt-3 text-muted" style={{ fontSize: "0.9rem" }}>
            <i className="fas fa-info-circle me-1"></i>
            All prices are for demonstration purposes only
          </p>
        </div>
      </div>
    </div>
  )
}
export default Hero;