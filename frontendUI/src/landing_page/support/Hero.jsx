import React, { useEffect } from "react";

// Hero Component - Enhanced
function Hero() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('animate-in');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.scroll-animate, .slide-right, .slide-left').forEach(el => observer.observe(el));

    return () => document.querySelectorAll('.scroll-animate, .slide-right, .slide-left').forEach(el => observer.unobserve(el));
  }, []);

  return (
    <section className="hero-section" style={{ 
      background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decoration */}
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

      <div className="container py-5 position-relative" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <div className="row align-items-center g-5 w-100">
          {/* Left Column */}
          <div className="col-lg-6 scroll-animate slide-right">
            

            <h1 className="display-4 fw-bold mb-4 scroll-animate stagger-2" style={{ color: '#0f172a' }}>
               Support Portal
            </h1>
            
            <p className="lead text-muted mb-4 scroll-animate stagger-3" style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
              Browse help topics and explore the support interface. Experience comprehensive documentation and user assistance features.
            </p>

            {/* Search Bar */}
            <div className="scroll-animate stagger-4 mb-4">
              <div className="position-relative">
                <i className="fas fa-search position-absolute" style={{
                  right: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#64748b',
                  zIndex: 2
                }}></i>
                <input
           type="text"
           placeholder="Search demo features..."
                  style={{
                paddingLeft: "50px",
            padding: "18px 20px",
             fontSize: "1rem",
             borderRadius: "12px",
               border: "2px solid #e2e8f0",
               width: "100%",
           background: "white"
           }}
  className="form-control shadow-sm"
/>

              </div>
            </div>

            {/* Quick Link */}
             <a 
  href="/login"
  target="_blank"
  rel="noopener noreferrer"
  className="d-inline-flex align-items-center text-decoration-none p-3 rounded-3 hover-lift"
  style={{
    background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
    border: '2px solid #d1fae5',
    color: '#14b8a6',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translateY(-3px)';
    e.currentTarget.style.boxShadow = '0 8px 20px rgba(20, 184, 166, 0.15)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = 'none';
  }}
>
  <i className="fas fa-user-plus me-2"></i>
  Demo account setup
  <i className="fas fa-arrow-right ms-2" style={{ fontSize: '0.9rem' }}></i>
</a>


            {/* Feature badges */}
            <div className="mt-4 scroll-animate stagger-6">
              <div className="d-flex gap-2 flex-wrap">
                <span className="feature-badge">
                  <i className="fas fa-shield-alt me-1"></i> Secure
                </span>
                <span className="feature-badge">
                  <i className="fas fa-bolt me-1"></i> Fast Support
                </span>
                <span className="feature-badge">
                  <i className="fas fa-book me-1"></i> Documentation
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Featured Topics */}
          <div className="col-lg-6 scroll-animate slide-left">
            <div className="p-5 rounded-4 shadow-lg" style={{
              background: 'white',
              border: '2px solid #e2e8f0'
            }}>
              <div className="d-flex align-items-center mb-4">
                <div 
                  className="me-3" 
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #14b8a6, #06b6d4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}
                >
                  <i className="fas fa-star fs-4"></i>
                </div>
                <h2 className="fs-3 fw-bold mb-0" style={{ color: '#14b8a6' }}>Featured Topics</h2>
              </div>

              <ul className="list-unstyled mb-0">
                {[
                  { icon: 'fa-rocket', text: 'Getting Started', color: '#10b981' },
                  { icon: 'fa-chart-line', text: 'Trading Features', color: '#14b8a6' },
                  { icon: 'fa-briefcase', text: 'Portfolio Guide', color: '#06b6d4' }
                ].map((item, i) => (
                  <li key={i} className="mb-3 scroll-animate" style={{ transitionDelay: `${0.1 * (i + 1)}s` }}>
                    <a 
                      href="#" 
                      onClick={(e) => e.preventDefault()}
                      className="d-flex align-items-center text-decoration-none p-3 rounded-3"
                      style={{
                        background: '#f8fafc',
                        border: '2px solid transparent',
                        transition: 'all 0.3s ease',
                        color: '#0f172a'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = item.color;
                        e.currentTarget.style.background = 'white';
                        e.currentTarget.style.transform = 'translateX(8px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'transparent';
                        e.currentTarget.style.background = '#f8fafc';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      <i className={`fas ${item.icon} me-3 fs-5`} style={{ color: item.color }}></i>
                      <span className="fw-semibold">{item.text}</span>
                      <i className="fas fa-chevron-right ms-auto" style={{ color: '#94a3b8', fontSize: '0.9rem' }}></i>
                    </a>
                  </li>
                ))}
              </ul>

              {/* Stats */}
              <div className="mt-4 pt-4 border-top">
                <div className="row text-center g-3">
                  <div className="col-4">
                    <div className="p-2">
                      <i className="fas fa-book-open fs-4 mb-2" style={{ color: '#14b8a6' }}></i>
                      <h6 className="fw-bold mb-0" style={{ color: '#14b8a6' }}>50+</h6>
                      <small className="text-muted">Articles</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-2">
                      <i className="fas fa-video fs-4 mb-2" style={{ color: '#14b8a6' }}></i>
                      <h6 className="fw-bold mb-0" style={{ color: '#14b8a6' }}>25+</h6>
                      <small className="text-muted">Videos</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-2">
                      <i className="fas fa-headset fs-4 mb-2" style={{ color: '#14b8a6' }}></i>
                      <h6 className="fw-bold mb-0" style={{ color: '#14b8a6' }}>24/7</h6>
                      <small className="text-muted">Support</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
