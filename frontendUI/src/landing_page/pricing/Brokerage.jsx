import React, { useEffect} from "react";
function Brockerage() {
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

  return (
    <div className="container py-5">
      <div className="row p-5" style={{ 
        background: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)", 
        borderRadius: "30px",
        boxShadow: "0 10px 40px rgba(20, 184, 166, 0.1)"
      }}>
        <div className="col-12 text-center mb-5 scroll-animate">
          <h2 className="display-5 fw-bold mb-3" style={{ color: "#14b8a6" }}>
            Why Choose StockVault Demo?
          </h2>
          <p className="lead text-muted" style={{ maxWidth: "700px", margin: "0 auto" }}>
            Experience seamless trading with our feature-rich demo platform
          </p>
        </div>

        <div className="row g-4">
          {[
            { icon: "fa-shield-alt", title: "Secure & Reliable", desc: "Bank-grade security with encrypted data and secure authentication" },
            { icon: "fa-bolt", title: "Lightning Fast", desc: "Real-time market data with millisecond-level precision" },
            { icon: "fa-chart-pie", title: "Advanced Analytics", desc: "Comprehensive portfolio insights with interactive charts" }
          ].map((item, i) => (
            <div key={i} className="col-md-4 scroll-animate" style={{ transitionDelay: `${0.1 * (i + 1)}s` }}>
              <div className="text-center p-4 h-100 hover-lift" style={{ 
                background: "white", 
                borderRadius: "20px",
                border: "2px solid #d1fae5",
                transition: "all 0.3s ease"
              }}>
                <div style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "20px",
                  background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem auto",
                  color: "white",
                  boxShadow: "0 8px 20px rgba(20, 184, 166, 0.3)"
                }}>
                  <i className={`fas ${item.icon} fs-2`}></i>
                </div>
                <h5 className="fw-bold mb-3">{item.title}</h5>
                <p className="text-muted mb-0" style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="col-12 text-center mt-5 scroll-animate">
          <button
  className="btn btn-lg px-5 py-3"
  style={{
    background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
    color: "white",
    border: "none",
    borderRadius: "15px",
    fontWeight: "600",
    fontSize: "1.1rem",
    boxShadow: "0 8px 25px rgba(20, 184, 166, 0.3)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  }}
  onClick={() => window.open("/login", "_blank")}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-3px)";
    e.currentTarget.style.boxShadow = "0 12px 30px rgba(20, 184, 166, 0.4)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 8px 25px rgba(20, 184, 166, 0.3)";
  }}
>
  Explore Demo Platform <i className="fas fa-arrow-right ms-2"></i>
</button>

          <p className="mt-3 text-muted">
            <i className="fas fa-graduation-cap me-1"></i>
            Educational project - Not for actual trading
          </p>
        </div>
      </div>
    </div>
  );
}

export default Brockerage;