import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllOrders, deleteOrder } from "../services/ApiService";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllOrders();
      setAllOrders(data);
    } catch (err) {
      setError('Failed to fetch orders. Please try again.');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle delete order
  const handleDelete = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) {
      return;
    }

    try {
      setDeletingId(orderId);
      await deleteOrder(orderId);
      
      // Remove from state immediately for better UX
      setAllOrders(allOrders.filter(order => order._id !== orderId));
      
      // Show success message (optional)
      alert('Order deleted successfully!');
    } catch (err) {
      console.error('Error deleting order:', err);
      alert('Failed to delete order. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p style={{ marginTop: '20px' }}>Loading orders...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <div style={{ color: '#d9534f', marginBottom: '20px' }}>
          <i className="fa fa-exclamation-circle" style={{ fontSize: '48px' }}></i>
        </div>
        <h4>{error}</h4>
        <button className="btn btn-primary" onClick={fetchOrders}>
          Retry
        </button>
      </div>
    );
  }

  // Empty state - No orders
  if (allOrders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      </div>
    );
  }

  // Calculate order statistics
  const buyOrders = allOrders.filter(order => order.mode === 'BUY');
  const sellOrders = allOrders.filter(order => order.mode === 'SELL');
  const totalBuyValue = buyOrders.reduce((sum, order) => sum + (order.price * order.qty), 0);
  const totalSellValue = sellOrders.reduce((sum, order) => sum + (order.price * order.qty), 0);

  return (
    <div className="orders">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 className="title">Orders ({allOrders.length})</h3>
        <button className="btn btn-sm btn-outline-primary btn-blue " onClick={fetchOrders}>
          <i className="fa fa-refresh"></i> Refresh
        </button>
      </div>

      {/* Order Statistics */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '15px', 
        marginBottom: '25px' 
      }}>
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#e7f3ff', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h5 style={{ color: '#0066cc', margin: 0 }}>{buyOrders.length}</h5>
          <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>Buy Orders</p>
          <small style={{ color: '#666' }}>₹{totalBuyValue.toFixed(2)}</small>
        </div>
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#fff3e0', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h5 style={{ color: '#ff9800', margin: 0 }}>{sellOrders.length}</h5>
          <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>Sell Orders</p>
          <small style={{ color: '#666' }}>₹{totalSellValue.toFixed(2)}</small>
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
                      onClick={() => handleDelete(order._id)}
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
  );
};

export default Orders;