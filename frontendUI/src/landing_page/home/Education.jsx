import React from "react";
import { Link } from "react-router-dom";

function Education() {
  return (
    <div className=" container py-4">
      <div className="row align-items-center">


 {/* Project Access */}
        <div className="row justify-content-center scroll-animate stagger-3">
          <div className="col-12 text-center mb-5">
            <h1 className="mb-3 fw-bold text-gradient scroll-animate scale-in stagger-1">Project Access</h1>
            <p className="text-muted fs-5">
          This project highlights my full-stack development skills and <br/> ability to build seamless, end-to-end web applications.
            </p>
          </div>

          <div className="col-12 col-md-10">
            <div className="row g-4">
              {/* Demo Access */}
              <div className="col-12 col-lg-6">
                <div className="card pricing-card border-0 shadow-lg h-100 hover-lift">
                  <div className="card-body p-4 text-center">
                    <div className="mb-3">
                      <i className="fas fa-laptop-code fa-3x text-primary-gradient"></i>
                    </div>
                    <h3 className="fw-bold mb-3">Live Demo Access</h3>
                    <div className="display-4 fw-bold text-primary-gradient mb-3">Free</div>
                    <p className="text-muted mb-4">
                      Explore the fully functional trading platform demo
                    </p>
                    <ul className="list-unstyled text-start mb-4">
                      {[
                        "Full platform access",
                        "Test user authentication",
                        "Explore all features",
                        "View sample portfolios",
                        "Interactive charts",
                      ].map((item, index) => (
                        <li className="mb-2" key={index}>
                          <i className="fas fa-check text-success me-2"></i>{item}
                        </li>
                      ))}
                    </ul>
                    
                    <a
                      href="/login"
                      className="btn btn-primary btn-lg w-100"
                      target="_blank"
                      rel="noopener noreferrer"
                      
                    >
                      <i className="fas fa-arrow-right ms-2"></i>
                        Access Demo
                    </a>
                  </div>
                </div>
              </div>

              {/* GitHub Source */}
              <div className="col-12 col-lg-6">
                <div className="card pricing-card h-100 border-0 shadow-lg hover-lift">
                  <div className="card-body p-4 text-center">
                    <div className="mb-3">
                      <i className="fab fa-github fa-3x text-dark"></i>
                    </div>
                    <h3 className="fw-bold mb-3">Source Code</h3>
                    <div className="display-4 fw-bold mb-3" style={{ color: "#0f172a" }}>Open</div>
                    <p className="text-muted mb-4">Complete codebase available on GitHub</p>
                    <ul className="list-unstyled text-start mb-4">
                      {[
                        "Full MERN stack code",
                        "API documentation",
                        "Setup instructions",
                        "Test suite included",
                        "Deployment guides",
                      ].map((item, index) => (
                        <li className="mb-2" key={index}>
                          <i className="fas fa-check text-success me-2"></i>{item}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="https://github.com/deveshSJ11/stockvault"
                      className="btn btn-outline-dark btn-lg w-100"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on GitHub <i className="fab fa-github ms-2"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack Footer */}
            <div className="card mt-4 bg-light border-0 shadow-sm scroll-animate stagger-4">
              <div className="card-body p-4 text-center">
                <h5 className="fw-bold mb-3">Built With Modern Technologies</h5>
                <div className="d-flex flex-wrap justify-content-center gap-3">
                  {["MongoDB", "Express.js", "React", "Node.js", "Chart.js", "JWT", "JEST", "AWS"].map((tech, index) => (
                    <span key={index} className="tech-badge">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        

      </div>
    </div>
  );
}

export default Education;
