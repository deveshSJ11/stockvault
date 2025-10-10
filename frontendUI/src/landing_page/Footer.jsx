



import React from "react";

function Footer() {
  return (
    <footer className="border-top mt-5" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container py-5">
        <div className="row">
          {/* Brand Section */}
          <div className="col-12 col-md-4 mb-4">
            <div className="d-flex align-items-center mb-3">
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="8" fill="#14b8a6"/>
                <path d="M12 24L16 18L20 22L28 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M24 12H28V16" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="ms-2 fw-bold fs-5" style={{ color: "#14b8a6" }}>StockVault</span>
            </div>
            <p className="text-muted small mb-3">
              A full-stack trading platform demo showcasing modern web development with MERN stack, real-time data visualization, and secure authentication.
            </p>
            <p className="text-muted small mb-0">
              <strong>Educational Project</strong> - Built for portfolio demonstration purposes.
            </p>
            <p className="text-muted small">
              © 2025 StockVault Demo. Personal Project.
            </p>
          </div>

          {/* Features Column */}
          <div className="col-6 col-md-2 mb-4">
            <h6 className="fw-bold mb-3" style={{ color: "#14b8a6" }}>Features</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="/login" className="text-muted text-decoration-none small">Dashboard</a></li>
              <li className="mb-2"><a href="https://main.d39p45abwbdyp1.amplifyapp.com/" className="text-muted text-decoration-none small">Portfolio</a></li>
              <li className="mb-2"><a href="https://main.d39p45abwbdyp1.amplifyapp.com/holdings" className="text-muted text-decoration-none small">Charts</a></li>
              <li className="mb-2"><a href="https://main.d39p45abwbdyp1.amplifyapp.com/apps" className="text-muted text-decoration-none small">Watchlist</a></li>
            </ul>
          </div>

          {/* Technologies Column */}
          <div className="col-6 col-md-2 mb-4">
            <h6 className="fw-bold mb-3" style={{ color: "#14b8a6" }}>Tech Stack</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><span className="text-muted small">MongoDB</span></li>
              <li className="mb-2"><span className="text-muted small">Express.js</span></li>
              <li className="mb-2"><span className="text-muted small">React.js</span></li>
              <li className="mb-2"><span className="text-muted small">Node.js</span></li>
            </ul>
          </div>

          {/* Additional Tech Column */}
          <div className="col-6 col-md-2 mb-4">
            <h6 className="fw-bold mb-3" style={{ color: "#14b8a6" }}>Tools Used</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><span className="text-muted small">JWT Auth</span></li>
              <li className="mb-2"><span className="text-muted small">Chart.js</span></li>
              <li className="mb-2"><span className="text-muted small">Jest Testing</span></li>
              <li className="mb-2"><span className="text-muted small">AWS Deploy</span></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="col-6 col-md-2 mb-4">
            <h6 className="fw-bold mb-3" style={{ color: "#14b8a6" }}>Connect</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="https://github.com/deveshSJ11"  className="text-muted text-decoration-none small" target="_blank" rel="noopener noreferrer">
                  <svg width="16" height="16" fill="currentColor" className="me-1" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                  GitHub
                </a>
              </li>
              <li className="mb-2">
                <a href="https://www.linkedin.com/in/deveshjaiswal11/" className="text-muted text-decoration-none small" target="_blank" rel="noopener noreferrer">
                  <svg width="16" height="16" fill="currentColor" className="me-1" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                  </svg>
                  LinkedIn
                </a>
              </li>
              <li className="mb-2">
                <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=deveshjaiswal1212.com"
                 
                className="text-muted text-decoration-none small">  
                
                  <svg width="16" height="16" fill="currentColor" className="me-1" viewBox="0 0 16 16">
                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                  </svg>
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-4" />

        {/* Disclaimer Section */}
        <div className="row">
          <div className="col-12">
            <div className="alert alert-light border small text-muted mb-0">
              <p className="mb-2">
                <strong>⚠️ Educational Demonstration Only:</strong> StockVault is a personal portfolio project created for educational and demonstration purposes. This is not a real trading platform and does not provide actual brokerage services.
              </p>
              <p className="mb-2">
                <strong>No Real Trading:</strong> All data shown is simulated or uses publicly available market data APIs for demonstration purposes only. No real money, securities, or financial transactions are involved.
              </p>
              <p className="mb-0">
                <strong>Technology Showcase:</strong> This project demonstrates proficiency in full-stack development, including secure authentication (JWT), real-time data visualization (Chart.js), database management (MongoDB), RESTful API design (Express.js), modern frontend development (React.js), testing (Jest), and cloud deployment (AWS).
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;