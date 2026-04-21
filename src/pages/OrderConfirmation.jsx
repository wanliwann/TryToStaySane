import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderConfirmation.css';

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasProcessed, setHasProcessed] = useState(false);

  useEffect(() => {
    if (hasProcessed) return; // Only run once
    
    console.log('📋 OrderConfirmation loading...');
    
    // Get order from localStorage
    const currentOrder = JSON.parse(localStorage.getItem('currentOrder'));
    console.log('✅ Order from storage:', currentOrder?.id || 'NOT FOUND');
    
    if (!currentOrder || !currentOrder.id) {
      console.warn('❌ No order found, redirecting home in 1 second...');
      setTimeout(() => {
        navigate('/');
      }, 1000);
      return;
    }

    // ✅ ORDER FOUND - PROCESS IT
    setOrder(currentOrder);
    setHasProcessed(true);

    // Save to order history
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    const orderExists = orderHistory.some(o => o.id === currentOrder.id);
    
    if (!orderExists) {
      orderHistory.push({
        ...currentOrder,
        savedDate: new Date().toISOString()
      });
      localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
      console.log('✅ Order saved to history');
    }

    // Update membership
    const membershipData = JSON.parse(localStorage.getItem('membershipData') || '{}');
    membershipData.totalSpent = (membershipData.totalSpent || 0) + currentOrder.total;
    membershipData.lastOrderDate = new Date().toISOString();
    
    // ===== SAVE CUSTOMER INFO IF NOT ALREADY SAVED =====
    if (!membershipData.email && currentOrder.customerEmail) {
      membershipData.email = currentOrder.customerEmail;
      membershipData.name = currentOrder.customerName;
    }
    
    localStorage.setItem('membershipData', JSON.stringify(membershipData));

    setLoading(false);
    console.log('✅ OrderConfirmation ready');

    // ===== SCROLL TO TOP =====
    window.scrollTo(0, 0);
  }, [navigate, hasProcessed]);

  const handlePrint = () => {
    window.print();
  };

  if (loading || !order) {
    return (
      <div className="receipt-page">
        <div className="error-container">
          <h2>Order Not Found</h2>
          <p>Unable to load order information. Redirecting...</p>
          <button onClick={() => navigate('/')}>Return to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="receipt-page">
      <div className="receipt-wrapper">
        {/* Print Button */}
        <div className="receipt-header-action">
          <button className="btn-print" onClick={handlePrint}>🖨️ Print Receipt</button>
        </div>

        {/* Receipt Container */}
        <div className="receipt-container">
          
          {/* Company Header */}
          <div className="receipt-company-header">
            <h1 className="company-name">TryToStaySane ♡</h1>
            <p className="company-tagline">Premium Perfume Collection</p>
          </div>

          {/* Success Status */}
          <div className="receipt-status-banner">
            <div className="status-check">✓</div>
            <div className="status-text">
              <p className="status-title">ORDER CONFIRMED</p>
              <p className="status-message">Thank you for your purchase</p>
            </div>
          </div>

          {/* Receipt Title & Order Number */}
          <div className="receipt-title-section">
            <h2 className="receipt-title">ORDER RECEIPT</h2>
            <div className="order-reference">
              <p><strong>Order Number:</strong> <span className="order-id">{order.id}</span></p>
              <p><strong>Order Date:</strong> <span>{order.orderDate}</span></p>
              <p><strong>Order Time:</strong> <span>{order.orderTime}</span></p>
            </div>
          </div>

          {/* Customer Information */}
          <div className="receipt-section">
            <h3 className="section-title">BILLING INFORMATION</h3>
            <div className="info-block">
              <div className="info-row">
                <span className="info-label">Name:</span>
                <span className="info-value">{order.customerName}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email:</span>
                <span className="info-value">{order.customerEmail}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Phone:</span>
                <span className="info-value">{order.phone}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Shipping Address:</span>
                <span className="info-value">{order.shippingAddress}</span>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="receipt-section">
            <h3 className="section-title">ITEMS PURCHASED</h3>
            <table className="items-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items && order.items.map((item, idx) => {
                  // Calculate price from size if not directly available
                  const sizeData = item.sizes?.find((s) => s.oz === item.size);
                  const itemPrice = sizeData?.price || item.price || 0;
                  const qty = item.quantity || 1;
                  
                  return (
                    <tr key={idx}>
                      <td>
                        <div className="product-info">
                          <p className="product-name">{item.name || 'Product'}</p>
                          <p className="product-brand">{item.brand || ''}</p>
                          <p className="product-size">{item.size || '0'}ml</p>
                        </div>
                      </td>
                      <td className="qty-cell">{qty}</td>
                      <td className="price-cell">${itemPrice.toFixed(2)}</td>
                      <td className="total-cell">${(itemPrice * qty).toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Payment Summary */}
          <div className="receipt-section">
            <h3 className="section-title">PAYMENT SUMMARY</h3>
            <div className="summary-block">
              <div className="summary-item">
                <span>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              {order.shipping > 0 ? (
                <div className="summary-item">
                  <span>Shipping Fee</span>
                  <span>${order.shipping.toFixed(2)}</span>
                </div>
              ) : (
                <div className="summary-item free-shipping">
                  <span>Shipping (Free)</span>
                  <span>$0.00</span>
                </div>
              )}
              <div className="summary-divider"></div>
              <div className="summary-item total-amount">
                <span>TOTAL AMOUNT</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* VIP Membership Offer */}
          {order.total >= 500 && (
            <div className="receipt-section vip-section">
              <div className="vip-header">
                <span className="vip-badge">👑 VIP MEMBER</span>
                <h3>Exclusive VIP Benefits</h3>
              </div>
              <p className="vip-intro">Congratulations! Your purchase qualifies you for our exclusive membership program.</p>
              <ul className="vip-list">
                <li>30% discount on all future purchases</li>
                <li>Early access to limited edition fragrances</li>
                <li>Free shipping on all orders</li>
                <li>Priority customer support</li>
              </ul>
              <div className="vip-code-box">
                <p>Use promo code: <strong className="promo-code">NEWMEMBER</strong></p>
              </div>
            </div>
          )}

          {/* Delivery Information */}
          <div className="receipt-section">
            <h3 className="section-title">DELIVERY INFORMATION</h3>
            <div className="delivery-info">
              <p><strong>Estimated Delivery:</strong> 3-5 Business Days</p>
              <p><strong>Shipping Method:</strong> Standard Courier</p>
              <p><strong>Tracking:</strong> Available on your account</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="receipt-actions">
            <button className="btn-track" onClick={() => navigate('/delivery')}>
              Track Your Order
            </button>
            <button className="btn-shop" onClick={() => navigate('/browse')}>
              Continue Shopping
            </button>
          </div>

          {/* Footer */}
          <div className="receipt-footer">
            <p>A confirmation email has been sent to <strong>{order.customerEmail}</strong></p>
            <p>For assistance, please <a href="/reach-out">contact our support team</a></p>
            <div className="receipt-timestamp">
              Receipt Generated: {new Date().toLocaleString()}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
