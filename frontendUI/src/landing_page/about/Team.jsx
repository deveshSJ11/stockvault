import React, { useEffect } from "react";

function Team() {
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

    const animatedElements = document.querySelectorAll(
      '.scroll-animate, .slide-right, .slide-left'
    );
    
    animatedElements.forEach(el => observer.observe(el));

    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div style={{ background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)" }}>
      {/* Developer Profile Section */}
      <div className="container py-5 border-top">
        <div className="row">
          <div className="col-12 text-center mb-5">
            <h2 className="fw-bold scroll-animate stagger-1" style={{ fontSize: "2.5rem", color: "#0f172a" }}>
              About the Developer
            </h2>
            <p className="text-muted fs-5 mt-3 scroll-animate stagger-2" style={{ maxWidth: "600px", margin: "0 auto" }}>
              Passionate about building scalable, user-centric web applications
            </p>
            
            {/* Tech Stack Badges */}
            <div className="mt-4 scroll-animate stagger-3">
              <span className="feature-badge">
                <i className="fab fa-react me-1"></i> React
              </span>
              <span className="feature-badge">
                <i className="fab fa-node-js me-1"></i> Node.js
              </span>
              <span className="feature-badge">
                <i className="fas fa-database me-1"></i> MongoDB
              </span>
              <span className="feature-badge">
                <i className="fab fa-aws me-1"></i> AWS
              </span>
            </div>
          </div>
        </div>

        <div className="row align-items-start">
          {/* Left - Developer Profile Card */}
          <div className="col-12 col-lg-5 mb-5 mb-lg-0">
            <div className="scroll-animate slide-right">
              <div 
                className="p-5 rounded-3 shadow-sm hover-lift text-center"
                style={{
                  background: "white",
                  border: "2px solid #e2e8f0"
                }}
              >
                <div className="mb-4">
                  <div>
                    <img
                      src="media/images/my-pic.jpeg"
                      alt="Devesh Jaiswal"
                      className="rounded-circle d-inline-flex align-items-center justify-content-center"
                      style={{
                        width: "180px",
                        height: "180px",
                        background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
                        color: "white",
                        fontSize: "4rem",
                        boxShadow: "0 15px 40px rgba(20, 184, 166, 0.3)",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
                
                <h3 className="fw-bold mb-2" style={{ color: "#0f172a" }}>Devesh Jaiswal</h3>
                <p className="text-muted mb-3">Full-Stack Developer</p>
                <p className="text-muted small mb-4">
                  <i className="fas fa-map-marker-alt me-2" style={{ color: "#14b8a6" }}></i>
                  Pune, Maharashtra
                </p>

                {/* Social Links */}
                <div className="d-flex justify-content-center gap-2 mb-4 flex-wrap">
                  <a 
                    href="https://github.com/deveshSJ11" 
                    className="btn btn-outline-primary btn-sm hover-lift"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ borderRadius: "10px", fontWeight: "600" }}
                  >
                    <i className="fab fa-github me-1"></i>GitHub
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/deveshjaiswal11/" 
                    className="btn btn-outline-primary btn-sm hover-lift"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ borderRadius: "10px", fontWeight: "600" }}
                  >
                    <i className="fab fa-linkedin me-1"></i>LinkedIn
                  </a>
                  <a 
                     href="https://mail.google.com/mail/?view=cm&fs=1&to=deveshjaiswal1212.com"
                     className="btn btn-outline-primary btn-sm hover-lift"
                      target="_blank"
                     rel="noopener noreferrer"
                     style={{ borderRadius: "10px", fontWeight: "600" }}
                   >
               <i className="fas fa-envelope me-1"></i>Email
                           </a>
                   
                </div>

                {/* Enhanced Stats with Tooltips */}
                <div className="row g-3 mt-4">
                  <div className="col-6">
                    <div 
                      className="p-3 rounded-3 hover-lift"
                      style={{
                        background: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)",
                        border: "2px solid #d1fae5",
                        cursor: "pointer",
                        transition: "all 0.3s ease"
                      }}
                      title="Successfully delivered 5+ full-stack projects"
                    >
                      <i className="fas fa-project-diagram fs-4 mb-2" style={{ color: "#14b8a6" }}></i>
                      <h5 className="fw-bold mb-0 gradient-text">5+</h5>
                      <p className="small text-muted mb-0">Projects Delivered</p>
                      <p className="small" style={{ color: "#14b8a6", fontWeight: "600", fontSize: "0.7rem", marginTop: "4px" }}>
                        Full-Stack Apps
                      </p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div 
                      className="p-3 rounded-3 hover-lift"
                      style={{
                        background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
                        border: "2px solid #bfdbfe",
                        cursor: "pointer",
                        transition: "all 0.3s ease"
                      }}
                      title="2+ years of hands-on development experience"
                    >
                      <i className="fas fa-code fs-4 mb-2" style={{ color: "#14b8a6" }}></i>
                      <h5 className="fw-bold mb-0 gradient-text">2+</h5>
                      <p className="small text-muted mb-0">Coding Experience</p>
                      <p className="small" style={{ color: "#14b8a6", fontWeight: "600", fontSize: "0.7rem", marginTop: "4px" }}>
                        Active Developer
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Left Portfolio Section */}
              <div className="scroll-animate slide-left stagger-2" style={{ marginTop: "24px" }}>
                <div
                  className="p-4 rounded-3 shadow-sm hover-lift d-flex flex-column"
                  style={{
                    background: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)",
                    border: "2px solid #d1fae5",
                    height: "100%",
                    minHeight: "240px"
                  }}
                >
                  <h5 className="fw-bold mb-3">
                    <i className="fab fa-medium" 
                       
                    
                    ></i>
                    Blog
                  </h5>
                  <p className="mb-3 text-muted  |"
                   style={{
                    maxWidth: "100%",
                    padding: "0 20px",
                    lineHeight: "1.8",
                    fontSize: "1rem",
                    textAlign: "justify"
                  }} >
                    I share insights from my development journey, breaking down complex concepts into practical, digestible guides. Perfect for developers seeking hands-on knowledge and real-world application strategies.
                    </p>


                    <a
          href="https://medium.com/@devesh.jaiswal"
             className=" btn btn-btn-primary hover-lift text-white"
             target="_blank"
               rel="noopener noreferrer"
                  style={{
               background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
              fontWeight: 500,
                fontSize: "15px",
              padding: "12px 14px",
             borderRadius: "8px",
              display: "inline-block",
            width: "fit-content",
              alignSelf: "flex-start",
              textDecoration: "none",
               boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
           >
               <i class="fa-solid fa-blog -alt me-2"></i>
                 Blog
                     </a>

                </div>
              </div>
            </div>
          </div>

          {/* Right - Skills & Project Info */}
          <div className="col-12 col-lg-7">
            {/* Background Section - Better Margins */}
            <div className="scroll-animate slide-left mb-4">
              <div
                className="p-4 rounded-3 shadow-sm hover-lift"
                style={{
                  background: "white",
                  border: "2px solid #e2e8f0",
                  minHeight: "280px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginBottom: "24px"
                }}
              >
                {/* Header */}
                <div className="d-flex align-items-center mb-3">
                  <div
                    className="me-3"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    <i className="fa-solid fa-user"></i>
                  </div>
                  <h4 className="fw-bold mb-0 gradient-text">Background</h4>
                </div>

                {/* Paragraph with Better Margins */}
                <p
                  className="text-muted mb-0"
                  style={{
                    maxWidth: "100%",
                    padding: "0 20px",
                    lineHeight: "1.8",
                    fontSize: "1rem",
                    textAlign: "justify"
                  }}
                >
                  I'm a builder who loves turning ideas into scalable, impactful digital products. I focus on creating systems that are reliable, efficient, and designed to last — combining technical depth with a strong sense of product vision. I believe great products come from thoughtful problem-solving, collaboration, and continuous learning. My work is driven by curiosity and a desire to make technology genuinely useful and meaningful. I'm especially interested in how emerging technologies like artificial intelligence can shape smarter, more intuitive experiences.
                </p>
              </div>
            </div>

            {/* Core Competencies - More Impressive */}
            <div className="scroll-animate slide-left stagger-1" style={{ marginBottom: "24px" }}>
              <div
                className="p-4 rounded-3 shadow-sm hover-lift"
                style={{
                  background: "white",
                  border: "2px solid #e2e8f0",
                }}
              >
                <h5 className="fw-bold mb-4">
                  <i className="fas fa-star me-2" style={{ color: "#f59e0b" }}></i>
                  Core Competencies
                </h5>

                <div className="row g-3">
                  {[
                    { icon: "fas fa-layer-group", text: "Full-Stack Architecture", color: "#14b8a6" },
                    { icon: "fas fa-shield-alt", text: "Secure Authentication", color: "#8b5cf6" },
                    { icon: "fas fa-database", text: "Database Design", color: "#3b82f6" },
                    { icon: "fas fa-rocket", text: "Performance Optimization", color: "#f59e0b" },
                    { icon: "fas fa-mobile-alt", text: "Responsive Design", color: "#ec4899" },
                    { icon: "fas fa-cloud", text: "Cloud Infrastructure", color: "#10b981" },
                  ].map((skill, index) => (
                    <div key={index} className="col-12 col-md-6">
                      <div 
                        className="d-flex align-items-center p-2 rounded hover-lift"
                        style={{
                          background: "linear-gradient(135deg, #f8fafc, #ffffff)",
                          border: "1px solid #e2e8f0",
                          transition: "all 0.3s ease"
                        }}
                      >
                        <div
                          className="me-3"
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "10px",
                            background: `linear-gradient(135deg, ${skill.color}, ${skill.color}dd)`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            flexShrink: 0
                          }}
                        >
                          <i className={skill.icon}></i>
                        </div>
                        <span className="text-muted fw-medium" style={{ fontSize: "0.95rem" }}>
                          {skill.text}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Portfolio Website Link */}
            <div className="scroll-animate slide-left stagger-2">
              <div
                className="p-4 rounded-3 shadow-sm hover-lift"
                style={{
                  background: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)",
                  border: "2px solid #d1fae5",
                  marginTop: "24px"
                }}
              >
                <h5 className="fw-bold mb-3">
                  <i className="fas fa-globe me-2" style={{ color: "#14b8a6" }}></i>
                  Portfolio Website
                </h5>
                <p className="mb-3 text-muted 
                "   style={{
                    maxWidth: "100%",
                    padding: "0 20px",
                    lineHeight: "1.8",
                    fontSize: "1rem",
                    textAlign: "justify"
                  }}>

                  
                  Explore my complete portfolio to dive into detailed project case studies and uncover the technologies, tools, and methodologies I use to craft seamless, high-performing digital experiences. Each project reflects a balance of design precision, technical depth, and real-world problem-solving.
                </p>
                <a
                  href="https://deveshsj-portfolio.netlify.app/"
                  className="btn btn-primary  hover-lift "
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
                    border: "none",
                    fontWeight: "600",
                    padding: "12px",
                    borderRadius: "10px",
                  }}
                >
                 <i class="fas fa-briefcase me-2"></i>Visit Portfolio
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why StockVault Section */}
      <div className="container py-5 border-top">
        <div className="row">
          <div className="col-12 text-center mb-5">
            <h3 className="fw-bold scroll-animate stagger-4" style={{ fontSize: "2rem", color: "#0f172a" }}>
              Why StockVault?
            </h3>
            <p className="text-muted scroll-animate stagger-5">The motivation behind this portfolio project</p>
          </div>

          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <div className="scroll-animate slide-right stagger-6 h-100">
              <div 
                className="p-4 rounded-3 shadow-sm hover-lift h-100 text-center"
                style={{
                  background: "white",
                  border: "2px solid #e2e8f0"
                }}
              >
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
                  <i className="fas fa-lightbulb fa-2x"></i>
                </div>
                <h5 className="fw-bold mb-3 gradient-text">Learning-Focused</h5>
                <p className="text-muted mb-0">
                  Built to understand complex financial workflows and real-time data handling
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <div className="scroll-animate slide-right stagger-7 h-100">
              <div 
                className="p-4 rounded-3 shadow-sm hover-lift h-100 text-center"
                style={{
                  background: "white",
                  border: "2px solid #e2e8f0"
                }}
              >
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
                  <i className="fas fa-code-branch fa-2x"></i>
                </div>
                <h5 className="fw-bold mb-3 gradient-text">Production-Ready</h5>
                <p className="text-muted mb-0">
                  Follows industry standards with proper error handling, validation, and security
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="scroll-animate slide-right stagger-8 h-100">
              <div 
                className="p-4 rounded-3 shadow-sm hover-lift h-100 text-center"
                style={{
                  background: "white",
                  border: "2px solid #e2e8f0"
                }}
              >
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
                  <i className="fas fa-users fa-2x"></i>
                </div>
                <h5 className="fw-bold mb-3 gradient-text">Portfolio Showcase</h5>
                <p className="text-muted mb-0">
                  Demonstrates ability to build complex, user-friendly applications from scratch
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="container py-5 mb-5">
        <div className="scroll-animate stagger-9">
          <div 
            className="p-5 rounded-3 text-center shadow-sm"
            style={{
              background: "linear-gradient(135deg, rgba(20, 184, 166, 0.08), rgba(6, 182, 212, 0.08))",
              border: "2px solid rgba(20, 184, 166, 0.15)"
            }}
          >
            <div 
              className="d-inline-flex align-items-center justify-content-center mb-4"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "20px",
                background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
                color: "white",
                boxShadow: "0 10px 30px rgba(20, 184, 166, 0.3)"
              }}
            >
              <i className="fas fa-handshake fa-2x"></i>
            </div>

            <h3 className="fw-bold mb-3 gradient-text">
              Interested in Collaborating?
            </h3>
            <p className="text-muted mb-4" style={{ maxWidth: "600px", margin: "0 auto 2rem auto" }}>
              Open to opportunities in full-stack development, fintech, and web applications. 
              Let's build something amazing together!
            </p>
            
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=deveshjaiswal1212.com"
                className="btn btn-lg hover-lift"
                target="_blank"
                     rel="noopener noreferrer"
                style={{
                  background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
                  border: "none",
                  color: "white",
                  fontWeight: "600",
                  padding: "14px 32px",
                  borderRadius: "12px"
                }}
              >
                <i className="fas fa-envelope me-2"></i>Get in Touch
              </a>
              <a 
                href="https://github.com/deveshSJ11" 
                className="btn btn-outline-primary btn-lg hover-lift"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontWeight: "600",
                  padding: "14px 32px",
                  borderRadius: "12px",
                  borderWidth: "2px"
                }}
              >
                <i className="fab fa-github me-2"></i>View Projects
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;