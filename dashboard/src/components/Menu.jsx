import React, { useState } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <div className="brand">
        <div className="logo">SV</div>

        {/* Proper SVG rectangle */}
        <svg width="40" height="40" style={{ display: "inline-block", marginLeft: "8px" }}>
        
        </svg>

        <span className="brand-name">StockVault</span>
      </div>

      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(5)}
            >
              <p className={selectedMenu === 5 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>
      </div>

      <div className="profile" onClick={handleProfileClick}>
        <div className="avatar"> U</div>
        <p className="username">User</p>

        {isProfileOpen && (
          <div className="profile-dropdown">
            <div className="dropdown-item">
              <span>👤</span> My Profile
            </div>
            <div className="dropdown-item">
              <span>⚙️</span> Settings
            </div>
            <div className="dropdown-item">
              <span>💳</span> Billing
            </div>
            <hr className="dropdown-divider" />
            <div className="dropdown-item logout">
              <Link 
                to="http://localhost:5174/,https://main.d396oielaum726.amplifyapp.com/"
                onClick={() => {
                  localStorage.removeItem("token"); // clear login info
                }}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span>🚪</span> Logout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
