import React from "react";

const Apps = () => {
  const apps = [
    {
      name: "Trading Terminal",
      description: "Advanced charting and trading tools",
      icon: "📊",
      status: "Installed"
    },
    {
      name: "Portfolio Tracker",
      description: "Track your investments in real-time",
      icon: "📈",
      status: "Available"
    },
    {
      name: "Market Scanner",
      description: "Scan stocks based on technical indicators",
      icon: "🔍",
      status: "Available"
    },
    {
      name: "Watchlist Manager",
      description: "Create and manage multiple watchlists",
      icon: "⭐",
      status: "Installed"
    },
    {
      name: "Option Chain",
      description: "Analyze options with advanced tools",
      icon: "🔗",
      status: "Available"
    },
    {
      name: "News & Alerts",
      description: "Get real-time market news and alerts",
      icon: "📰",
      status: "Installed"
    }
  ];

  const handleAppClick = (appName) => {
    alert(`Opening ${appName}...\n\nNote: This is a demo feature.`);
  };

  return (
    <div className="apps-container">
      <div className="apps-header">
        <h2>Trading Apps</h2>
        <p>Enhance your trading experience with these tools</p>
      </div>

      <div className="apps-grid">
        {apps.map((app, index) => (
          <div key={index} className="app-card" onClick={() => handleAppClick(app.name)}>
            <div className="app-icon">{app.icon}</div>
            <div className="app-details">
              <h3>{app.name}</h3>
              <p>{app.description}</p>
              <span className={`app-status ${app.status === 'Installed' ? 'installed' : 'available'}`}>
                {app.status}
              </span>
            </div>
          </div>
        ))}
      </div>

</div>
  );
};

export default Apps;