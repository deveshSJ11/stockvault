import React, { useEffect } from "react";

function Feature({
  imageURL,
  productName,
  productDescription,
  isReversed = false,
  featureBadges = [
    { icon: "fas fa-check-circle", text: "Easy to Use" },
    { icon: "fas fa-bolt", text: "Fast Performance" },
    { icon: "fas fa-mobile-alt", text: "Responsive" }
  ],
}) {
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

    const animatedElements = document.querySelectorAll('.slide-right, .slide-left');
    animatedElements.forEach(el => observer.observe(el));

    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="container my-5 py-5 ">
      <div className={`row align-items-center ${isReversed ? 'flex-row-reverse' : ''}`}>
        {/* Image side */}
        <div className={`col-12 col-md-6 text-center mb-4 mb-md-0 ${isReversed ? 'slide-left' : 'slide-right'}`}>
          <div 
            className="p-4 rounded-3 hover-lift "
            style={{
              background: "white",
              border: "2px solid #e2e8f0",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)"
            }}
          >
            <img
              src={imageURL}
              alt={productName}
              className="img-fluid rounded"
              style={{ 
                maxHeight: '400px', 
                objectFit: 'contain',
                borderRadius: "12px"
              }}
            />
          </div>
        </div>

        {/* Content side */}
        <div className={`col-12 col-md-6 px-4 px-md-5 ${isReversed ? 'slide-right' : 'slide-left'}`}>
          <div className="d-flex align-items-center mb-4">
            <div 
              className="me-3" 
              style={{
                width: "55px",
                height: "55px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                boxShadow: "0 4px 15px rgba(20, 184, 166, 0.3)"
              }}
            >
              <i className="fas fa-star fs-5"></i>
            </div>
            <h2 className="fw-bold mb-0 gradient-text">
              {productName}
            </h2>
          </div>
          
          <p className="text-muted fs-6 mb-4" style={{ lineHeight: "1.8" }}>
            {productDescription}
          </p>
          
          {/* Feature highlights */}
          <div className="d-flex flex-wrap gap-2">
            {featureBadges.map((badge, index) => (
              <span key={index} className="feature-badge">
                <i className={`${badge.icon} me-1`}></i>
                {badge.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feature;