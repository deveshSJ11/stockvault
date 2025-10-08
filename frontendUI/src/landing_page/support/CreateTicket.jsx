import React from "react";
import  { useEffect } from "react";

function CreateTicket() {
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

  const categories = [
    { 
      icon: "fa-user-plus", 
      title: "Account Setup", 
      links: ["Demo Account", "Profile Config", "Security Settings"],
      color: "#10b981",
      gradient: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)"
    },
    { 
      icon: "fa-wallet", 
      title: "Funds & Banking", 
      links: ["Fund Management", "Transactions", "Balance Overview"],
      color: "#14b8a6",
      gradient: "linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)"
    },
    { 
      icon: "fa-chart-line", 
      title: "Trading Features", 
      links: ["Trading Interface", "Order Types", "Market Data"],
      color: "#06b6d4",
      gradient: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)"
    },
    { 
      icon: "fa-briefcase", 
      title: "Portfolio", 
      links: ["Dashboard", "Analytics", "Reports"],
      color: "#0ea5e9",
      gradient: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)"
    },
  ];

  return (
    <div className="container py-5" style={{ marginTop: '60px' }}>
      {/* Section Header */}
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold mb-3 scroll-animate" style={{ color: '#0f172a' }}>
          Browse Support Categories
        </h1>
        <p className="lead text-muted scroll-animate stagger-1" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Explore key help topics and find answers to common questions
        </p>
      </div>

      {/* Category Cards Grid */}
      <div className="row g-4">
        {categories.map((cat, i) => (
          <div key={i} className="col-lg-3 col-md-6 scroll-animate" style={{ transitionDelay: `${0.1 * i}s` }}>
            <div 
              className="h-100 p-4 rounded-4 shadow-sm hover-lift"
              style={{
                background: cat.gradient,
                border: '2px solid',
                borderColor: `${cat.color}20`,
                transition: 'all 0.3s ease'
              }}
            >
              {/* Icon Header */}
              <div 
                className="d-inline-flex align-items-center justify-content-center mb-3"
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '12px',
                  background: 'white',
                  boxShadow: `0 4px 12px ${cat.color}30`
                }}
              >
                <i className={`fas ${cat.icon} fs-3`} style={{ color: cat.color }}></i>
              </div>

              <h4 className="fw-bold mb-3" style={{ color: '#0f172a' }}>
                {cat.title}
              </h4>

              {/* Links List */}
              <ul className="list-unstyled mb-0">
                {cat.links.map((link, j) => (
                  <li key={j} className="mb-2">
                    <a 
                      href="#" 
                      onClick={(e) => e.preventDefault()}
                      className="text-decoration-none d-flex align-items-center py-2"
                      style={{
                        color: '#64748b',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = cat.color;
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#64748b';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      <i className="fas fa-chevron-right me-2" style={{ fontSize: '0.75rem' }}></i>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA Section */}
      <div className="mt-5 pt-5">
        <div 
          className="p-5 rounded-4 text-center scroll-animate"
          style={{
            background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1), rgba(6, 182, 212, 0.1))',
            border: '2px solid rgba(20, 184, 166, 0.2)'
          }}
        >
          <i className="fas fa-question-circle fs-1 mb-3" style={{ color: '#14b8a6' }}></i>
          <h3 className="fw-bold mb-3" style={{ color: '#0f172a' }}>
            Can't find what you're looking for?
          </h3>
          <p className="text-muted mb-4">
            Our support team is here to help you with any questions
          </p>
          <button
  className="btn btn-lg px-5 py-3"
  style={{
    background: 'linear-gradient(135deg, #14b8a6, #06b6d4)',
    border: 'none',
    color: 'white',
    fontWeight: '600',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  }}
  onClick={() => window.location.href = 'mailto:deveshjaiswal1212@gmail.com'}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translateY(-3px)';
    e.currentTarget.style.boxShadow = '0 10px 30px rgba(20, 184, 166, 0.4)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = 'none';
  }}
>
  <i className="fas fa-envelope me-2"></i>
  Contact Support
</button>

        </div>
      </div>
    </div>
  );
}

export default CreateTicket;
