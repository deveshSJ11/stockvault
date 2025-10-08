import React from "react";

function Stats() {
  const features = [
    {
      icon: "fas fa-chart-line",
      title: "Advanced Charting",
      desc: "Interactive candlestick charts with multiple timeframes. Analyze trends with technical indicators and drawing tools.",
    },
    {
      icon: "fas fa-wallet",
      title: "Portfolio Tracker",
      desc: "Monitor your holdings in real-time. Track profits, losses, and overall portfolio performance with detailed analytics.",
    },
    {
      icon: "fas fa-bolt",
      title: "Instant Orders",
      desc: "Place market and limit orders instantly. Experience fast order execution with real-time price updates.",
    },
    {
      icon: "fas fa-star",
      title: "Smart Watchlists",
      desc: "Create custom watchlists to track your favorite stocks. Get instant updates on price movements and changes.",
    },
    {
      icon: "fas fa-history",
      title: "Trade History",
      desc: "Complete transaction records with detailed breakdowns. Export reports and analyze your trading patterns.",
    },
    {
      icon: "fas fa-shield-alt",
      title: "Secure & Safe",
      desc: "Bank-grade security with JWT authentication. Your data is encrypted and protected at all times.",
    },
  ];

  return (
    <section className="stats-section position-relative overflow-hidden py-5">
      {/* Gradient Overlay for Continuity */}
      <div className="stats-bg"></div>

      <div className="container position-relative z-2 p-5 mb-5">
        {/* Section Header */}
        <div className="row text-center mb-5">
          <div className="col-12">
            <h2 className="display-5 fw-bold mb-3 text-gradient  scroll-animate scale-in stagger-1">
              Everything you need to trade
            </h2>
            <p className="text-muted fs-5  scroll-animate scale-in stagger-1">
              Professional-grade tools in a user-friendly interface
            </p>
          </div>
        </div>

        {/* Feature Cards - Each animates individually */}
        <div className="row g-4">
          {features.map((item, index) => (
            <div className="col-12 col-md-4" key={index}>
              <div className={`card border-0 h-100 p-4 shadow-sm hover-lift bg-light-subtle scroll-animate slide-up stagger-${index + 3}`}>
                <div className="mb-3 text-primary-gradient">
                  <i className={`${item.icon} fa-3x`}></i>
                </div>
                <h4 className="fw-bold mb-3">{item.title}</h4>
                <p className="text-muted">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;