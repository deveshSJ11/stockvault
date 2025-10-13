import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { getAllOrders, deleteOrder } from "../services/ApiService";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [notification, setNotification] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("connecting");
  const [lastUpdated, setLastUpdated] = useState(null);

  // FETCH INITIAL ORDERS FROM API
  useEffect(() => {
    const fetchInitialOrders = async () => {
      try {
        setLoading(true);
        const orders = await getAllOrders();
        console.log("📦 Initial orders fetched:", orders);
        
        // Transform orders data
        const transformedOrders = orders.map(order => ({
          _id: order._id,
          name: order.name || "-",
          qty: Number(order.qty) || 0,
          price: Number(order.price) || 0,
          mode: order.mode || "-"
        }));
        
        setAllOrders(transformedOrders);
        setLastUpdated(new Date());
        setError(null);
      } catch (err) {
        console.error("❌ Error fetching initial orders:", err);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialOrders();
  }, []);

  // SETUP SOCKET.IO FOR REAL-TIME UPDATES
  useEffect(() => {
    const backendUrl = import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_BASE;
    
    if (!backendUrl) {
      console.error("❌ VITE_API_BASE or VITE_SOCKET_URL is not defined");
      setConnectionStatus("error");
      return;
    }

    console.log("🔌 Connecting to Socket.IO at:", backendUrl);

    const socket = io(backendUrl, {
      path: '/socket.io',
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      timeout: 20000,
      autoConnect: true,
      withCredentials: true,
      forceNew: false,
      upgrade: true,
      secure: true
    });

    socket.on("connect", () => {
      console.log("✅ Socket.IO connected | ID:", socket.id);
      setConnectionStatus("connected");
    });

    socket.on("disconnect", (reason) => {
      console.log("🔌 Socket.IO disconnected | Reason:", reason);
      setConnectionStatus("disconnected");
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket.IO connection error:", err);
      setConnectionStatus("error");
    });

    socket.on("reconnect_attempt", (attemptNumber) => {
      console.log(`🔄 Reconnection attempt ${attemptNumber}...`);
      setConnectionStatus("reconnecting");
    });

    socket.on("reconnect", (attemptNumber) => {
      console.log(`✅ Reconnected after ${attemptNumber} attempts`);
      setConnectionStatus("connected");
    });

    socket.io.engine.on("upgrade", (transport) => {
      console.log("⬆️ Transport upgraded to:", transport.name);
    });

    // Listen for new orders from buy/sell actions
    socket.on("buyandsell", (data) => {
      console.log("📊 Socket.IO order update received:", data);
      
      if (data.type === "new_order" && data.order) {
        const newOrder = {
          _id: data.order._id,
          name: data.order.name || "-",
          qty: Number(data.order.qty) || 0,
          price: Number(data.order.price) || 0,
          mode: data.order.mode || "-"
        };

        setAllOrders(prevOrders => [newOrder, ...prevOrders]);
        setLastUpdated(new Date());
        showNotification(`New ${newOrder.mode} order added for ${newOrder.name}!`, "success");
      } else if (data.type === "order_deleted" && data.orderId) {
        setAllOrders(prevOrders => prevOrders.filter(order => order._id !== data.orderId));
        setLastUpdated(new Date());
      }
    });

    return () => {
      console.log("🔌 Disconnecting Socket.IO");
      socket.disconnect();
    };
  }, []);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const formatLastUpdated = () => {
    if (!lastUpdated) return "";
    const now = new Date();
    const diff = Math.floor((now - lastUpdated) / 1000);
    
    if (diff < 60) return `Updated ${diff}s ago`;
    if (diff < 3600) return `Updated ${Math.floor(diff / 60)}m ago`;
    return `Updated at ${lastUpdated.toLocaleTimeString()}`;
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case "connected": return "🟢";
      case "connecting": return "🟡";
      case "reconnecting": return "🟡";
      case "disconnected": return "🔴";
      case "error": return "🔴";
      default: return "⚪";
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case "connected": return "Live";
      case "connecting": return "Connecting";
      case "reconnecting": return "Reconnecting";
      case "disconnected": return "Offline";
      case "error": return "Error";
      default: return "Unknown";
    }
  };

  const handleDelete = async (orderId) => {
    try {
      setDeletingId(orderId);
      await deleteOrder(orderId);
      
      setAllOrders(allOrders.filter(order => order._id !== orderId));
      setShowDeleteConfirm(null);
      showNotification('Order deleted successfully!', 'success');
    } catch (err) {
      console.error('Error deleting order:', err);
      showNotification('Failed to delete order. Please try again.', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p style={{ marginTop: "20px" }}>Fetching orders...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <div style={{ color: "#d9534f", marginBottom: "20px" }}>
          <i className="fa fa-exclamation-circle" style={{ fontSize: "48px" }}></i>
        </div>
        <h4>{error}</h4>
        <button 
          className="btn btn-primary btn-blue" 
          onClick={() => window.location.reload()}
          style={{ marginTop: "20px" }}
        >
          Retry
        </button>
      </div>
    );
  }

  // Empty state
  if (allOrders.length === 0) {
    return (
      <div className="orders">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h3 className="title">Orders (0)</h3>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <span style={{ fontSize: "12px", color: "#666" }}>
              {getStatusColor()} {getStatusText()}
            </span>
          </div>
        </div>
        <div className="no-orders">
          <p>You haven't placed any orders yet</p>
          <Link to={"/"} className="btn">
            Place an order
          </Link>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const buyOrders = allOrders.filter(order => order.mode === 'BUY');
  const sellOrders = allOrders.filter(order => order.mode === 'SELL');
  const totalBuyValue = buyOrders.reduce((sum, order) => sum + (order.price * order.qty), 0);
  const totalSellValue = sellOrders.reduce((sum, order) => sum + (order.price * order.qty), 0);

  return (
    <>
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          <div className="notification-content">
            <span className={`notification-icon notification-icon-${notification.type}`}>
              {notification.type === "success" ? "✓" : "!"}
            </span>
            <span className="notification-message">{notification.message}</span>
          </div>
          <div 
            className="notification-progress" 
            style={{ animationDuration: "3s" }}
          ></div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(null)}>
          <div className="modal-content confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Confirm Delete</h3>
              <button className="close-btn" onClick={() => setShowDeleteConfirm(null)}>×</button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this order?</p>
              <p style={{ fontSize: "13px", color: "#999", marginTop: "12px" }}>
                This action cannot be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-grey" 
                onClick={() => setShowDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-danger"
                onClick={() => handleDelete(showDeleteConfirm)}
                disabled={deletingId === showDeleteConfirm}
              >
                {deletingId === showDeleteConfirm ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="orders">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h3 className="title">Orders ({allOrders.length})</h3>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <span style={{ fontSize: "12px", color: "#666" }}>
              {formatLastUpdated()} • {getStatusColor()} {getStatusText()}
            </span>
          </div>
        </div>

        {/* Order Statistics */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
          gap: "15px", 
          marginBottom: "25px" 
        }}>
          <div style={{ 
            padding: "15px", 
            backgroundColor: "#e7f3ff", 
            borderRadius: "8px",
            textAlign: "center"
          }}>
            <h5 style={{ color: "#0066cc", margin: 0 }}>{buyOrders.length}</h5>
            <p style={{ margin: "5px 0 0 0", fontSize: "14px" }}>Buy Orders</p>
            <small style={{ color: "#666" }}>₹{totalBuyValue.toFixed(2)}</small>
          </div>
          <div style={{ 
            padding: "15px", 
            backgroundColor: "#fff3e0", 
            borderRadius: "8px",
            textAlign: "center"
          }}>
            <h5 style={{ color: "#ff9800", margin: 0 }}>{sellOrders.length}</h5>
            <p style={{ margin: "5px 0 0 0", fontSize: "14px" }}>Sell Orders</p>
            <small style={{ color: "#666" }}>₹{totalSellValue.toFixed(2)}</small>
          </div>
        </div>

        {/* Orders Table */}
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Stock</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total Value</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order, index) => {
                const totalValue = order.price * order.qty;
                const isBuy = order.mode === 'BUY';
                const modeClass = isBuy ? 'profit' : 'loss';

                return (
                  <tr key={order._id}>
                    <td>{index + 1}</td>
                    <td style={{ fontWeight: 'bold' }}>{order.name}</td>
                    <td>{order.qty}</td>
                    <td>₹{order.price.toFixed(2)}</td>
                    <td>₹{totalValue.toFixed(2)}</td>
                    <td>
                      <span 
                        className={modeClass}
                        style={{ 
                          padding: '4px 12px', 
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}
                      >
                        {order.mode}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger btn-outline-primary btn-blue"
                        onClick={() => setShowDeleteConfirm(order._id)}
                        disabled={deletingId === order._id}
                        style={{ 
                          padding: '4px 12px',
                          fontSize: '12px'
                        }}
                      >
                        {deletingId === order._id ? (
                          <>
                            <i className="fa fa-spinner fa-spin"></i> Deleting...
                          </>
                        ) : (
                          <>
                            <i className="fa fa-trash"></i> Delete
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Add Order Button */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Link to={"/"} className="btn btn-primary">
            <i className="fa fa-plus"></i> Place New Order
          </Link>
        </div>
      </div>
    </>
  );
};

export default Orders;