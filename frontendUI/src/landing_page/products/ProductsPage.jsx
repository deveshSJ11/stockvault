import React from "react";
import Hero from "./Hero";
import Feature from "./Feature"; 
import Universe from "./Universe";

function ProductsPage() {
  return (
    <>
      <Hero />

      {/* Feature 1 - Image LEFT, Content RIGHT */}
      <Feature
        imageURL="media/images/trading-platform.png"
        productName="Trading Dashboard"
        productDescription="Experience seamless trading with real-time market updates, interactive charts, and an intuitive interface. Monitor live stock prices, track your portfolio performance, and execute trades with confidence all in one place."
        isReversed={false}
        featureBadges={[
          { icon: "fas fa-chart-line", text: "Real-time Updates" },
          { icon: "fas fa-tachometer-alt", text: "Live Charts" },
          { icon: "fas fa-shield-alt", text: "Secure Trading" }
        ]}
      />

      {/* Feature 2 - Content LEFT, Image RIGHT */}
      <Feature
        imageURL="media/images/portfolio.png"
        productName="Portfolio Management"
        productDescription="Keep track of all your investments in one centralized hub. View comprehensive analytics, monitor your order history, and gain valuable insights into your trading patterns with detailed performance reports."
        isReversed={true}
        featureBadges={[
          { icon: "fas fa-chart-pie", text: "Analytics" },
          { icon: "fas fa-history", text: "Order History" },
          { icon: "fas fa-file-chart-line", text: "Performance Reports" }
        ]}
      />

      {/* Feature 3 - Image LEFT, Content RIGHT */}
      <Feature
        imageURL="media/images/orders.png"
        productName="Order Tracking"
        productDescription="Stay informed about every trade you make. Access your complete order history, track pending orders, and review past transactions with detailed timestamps and execution prices for better trading decisions."
        isReversed={false}
        featureBadges={[
          { icon: "fas fa-list-check", text: "Complete History" },
          { icon: "fas fa-clock", text: "Real-time Status" },
          { icon: "fas fa-receipt", text: "Detailed Records" }
        ]}
      />

      {/* Feature 4 - Content LEFT, Image RIGHT */}
      <Feature
        imageURL="media/images/live-data.png"
        productName="Live Market Data"
        productDescription="Get instant access to real-time stock prices and market movements. Our platform integrates live market feeds to ensure you're always trading with the most current information available."
        isReversed={true}
        featureBadges={[
          { icon: "fas fa-satellite-dish", text: "Live Feeds" },
          { icon: "fas fa-sync-alt", text: "Auto-refresh" },
          { icon: "fas fa-database", text: "Market Integration" }
        ]}
      />

      <Universe/>
    </>
  );
}

export default ProductsPage;