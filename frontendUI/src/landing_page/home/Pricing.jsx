import React from "react";

function Pricing() {
  return (
    <section className="pricing-section position-relative overflow-hidden py-5">
      {/* Soft animated gradient background for continuity */}
      <div className="pricing-bg"></div>

      <div className="container position-relative z-2 mb-5 py-5">
        {/* Section Header */}
        <div className="row scroll-animate stagger-1 ">
          <div className="col-12 text-center mb-5">
            <h2 className="display-5 fw-bold mb-3 text-gradient">
              Start trading in 3 simple steps
            </h2>
            <p className="text-muted fs-5">Get your demo account ready in minutes</p>
          </div>
        </div>

        {/* Steps Section */}
        <div className="row g-4 mb-5 scroll-animate stagger-2">
          {[ 
            {
              num: "1",
              title: "Create Account",
              text: "Sign up with your email and create a secure password. Takes less than 2 minutes."
            },
            {
              num: "2",
              title: "Explore Dashboard",
              text: "Browse the platform, check out charts, and familiarize yourself with the interface."
            },
            {
              num: "3",
              title: "Start Trading",
              text: "Place your first demo trade and experience the full trading workflow."
            }
          ].map((step, i) => (
            <div className="col-12 col-md-4" key={i}>
              <div className="card step-card border-0 shadow-sm h-100 p-4 text-center hover-lift">
                <div className="mb-3">
                  <div className="step-circle mx-auto mb-3">
                    <span className="display-6 fw-bold">{step.num}</span>
                  </div>
                </div>
                <h4 className="fw-bold mb-3">{step.title}</h4>
                <p className="text-muted">{step.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Two Column Layout: Learning & Resources */}
        <div className="row g-4 mt-5">
          {/* Left Side - Visual Learning */}
          <div className="col-12 col-md-6 scroll-animate stagger-1">
            <div className="edu-card card border-0 shadow-lg p-5 position-relative">
              {/* Floating Card */}
              <div className="floating-card card-edu">
                <i className="fas fa-lightbulb"></i>
                <span>Practice Mode</span>
              </div>

              <div className="text-center mb-4">
                <i className="fas fa-graduation-cap fa-4x mb-3 text-primary"></i>
                <h3 className="fw-bold mb-3 gradient-text">Learn Trading Basics</h3>
                <p className="text-muted mb-4">
                  Master the essentials with interactive tools and real-time market simulation.
                </p>
              </div>

              <div className="row g-3 mb-4">
                {[
                  { icon: "fa-chart-line", label: "Chart Reading" },
                  { icon: "fa-calculator", label: "P&L Analysis" },
                  { icon: "fa-tasks", label: "Order Types" },
                  { icon: "fa-shield-alt", label: "Risk Management" },
                ].map((item, idx) => (
                  <div className="col-6 text-center scroll-animate stagger-2" key={idx}>
                    <div className="feature-badge p-3">
                      <i className={`fas ${item.icon} fa-2x mb-2 text-primary`}></i>
                      <p className="small fw-semibold mb-0">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="alert alert-custom mt-3">
                <i className="fas fa-info-circle me-2"></i>
                <strong>Practice Mode:</strong> Test strategies without real money risk
              </div>
            </div>
          </div>

          {/* Right Side - Platform Support & Resources */}
          <div className="col-12 col-md-6 scroll-animate stagger-3">
            <h2 className="mb-4 fw-bold gradient-text">Platform Support & Resources</h2>
            <p className="text-muted mb-4 fs-5">
              Everything you need to get started and grow your confidence on the StockVault demo platform.
            </p>

            {[
              {
                icon: "fa-play",
                bg: "#e0f2fe",
                title: "Quick Start Guide",
                desc: "Step-by-step walkthrough to place your first demo trade and navigate the dashboard.",
                link: "/dashboard",
                text: "Get Started",
              },
              {
                icon: "fa-video",
                bg: "#fef3c7",
                title: "Video Tutorials",
                desc: "Comprehensive video guides covering all platform features, from basics to pro tools.",
                link: "https://www.youtube.com/",
                text: "Watch Videos",
              },
              {
                icon: "fa-question",
                bg: "#f3e8ff",
                title: "FAQs & Help Center",
                desc: "Find quick answers about setup, troubleshooting, and platform features.",
                link: "/support",
                text: "Browse FAQs",
              },
            ].map((card, i) => (
              <div
                className="card border-0 shadow-sm hover-lift mb-3 scroll-animate stagger-4"
                key={i}
              >
                <div className="card-body d-flex align-items-start">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{ width: "50px", height: "50px", backgroundColor: card.bg }}
                  >
                    <i className={`fas ${card.icon} text-primary`}></i>
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="fw-bold mb-2">{card.title}</h5>
                    <p className="text-muted mb-2 small">{card.desc}</p>
                    <a
                      href={card.link}
                      {...(card.link.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="edu-link gradient-text"
                      aria-label={`${card.text} - ${card.title}`}
                    >
                      {card.text} <i className="fas fa-arrow-right ms-1"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}

           
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;