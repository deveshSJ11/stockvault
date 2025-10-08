import React, { useEffect } from "react";

function Universe() {
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

    const animatedElements = document.querySelectorAll('.scroll-animate, .ecosystem-card');
    animatedElements.forEach(el => observer.observe(el));

    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  const ecosystemItems = [
    {
      title: "Advanced market analysis tools",
      icon: "fas fa-chart-bar"
    },
    {
      title: "Real-time portfolio tracking",
      icon: "fas fa-briefcase"
    },
    {
      title: "Educational resources and guides",
      icon: "fas fa-graduation-cap"
    },
    {
      title: "Live market news and updates",
      icon: "fas fa-newspaper"
    },
    {
      title: "Customizable stock watchlists",
      icon: "fas fa-eye"
    },
    {
      title: "Smart price alerts and notifications",
      icon: "fas fa-bell"
    }
  ];

  return (
    <div style={{ background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)" }}>
      <div className="container py-5 my-5">
        <div className="row">
          <div className="col-12 text-center mb-5">
            <h2 className="fw-bold mb-3 scroll-animate stagger-1" style={{ fontSize: "2.5rem", color: "#0f172a" }}>
              The{" "}
              <span className="gradient-text">
                StockVault
              </span>{" "}
              Ecosystem
            </h2>
            <p className="text-muted fs-5 scroll-animate stagger-2" style={{ maxWidth: "700px", margin: "0 auto" }}>
              Enhance your trading journey with our integrated tools and resources
            </p>
          </div>

          {ecosystemItems.map((item, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4 mb-4 scroll-animate scale-in stagger-1">
              <div 
                className={`ecosystem-card p-4 rounded-3 h-100 text-center hover-lift stagger-${index + 3}`}
                style={{
                  background: "white",
                  border: "2px solid #e2e8f0",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)"
                }}
              >
                <div 
                  className="mb-3 mx-auto scroll-animate scale-in stagger-1"
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "15px",
                    background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    boxShadow: "0 4px 15px rgba(20, 184, 166, 0.25)"
                  }}
                >
                  <i className={`${item.icon} fs-3`}></i>
                </div>
                <p className="text-muted fw-semibold mb-0">{item.title}</p>
              </div>
            </div>
          ))}

          <div className="col-12 text-center mt-4">
            <div className="scroll-animate stagger-9">
              <a
                href="/signup"
                className="btn btn-primary btn-lg px-5 py-3 hover-lift"
                style={{
                  background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
                  border: "none",
                  borderRadius: "12px",
                  fontWeight: "600",
                  boxShadow: "0 4px 15px rgba(20, 184, 166, 0.3)",
                  textDecoration: "none",
                  display: "inline-block"
                }}
              >
                Get Started
                <i className="fas fa-arrow-right ms-2"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Universe;