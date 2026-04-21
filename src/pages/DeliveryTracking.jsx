import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import "./DeliveryTracking.css";

export default function DeliveryTracking() {
  const navigate = useNavigate();
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Delivery stages
  const stages = [
    { step: 1, label: "Order Placed", icon: "✓", details: "Order confirmed and payment received" },
    { step: 2, label: "Processing", icon: "⚙", details: "Order is being processed and prepared" },
    { step: 3, label: "Shipped", icon: "📦", details: "Package has left our warehouse" },
    { step: 4, label: "In Transit", icon: "🚚", details: "Package is on the way to your location" },
    { step: 5, label: "Out for Delivery", icon: "📍", details: "Package out for delivery today" },
    { step: 6, label: "Delivered", icon: "🎁", details: "Package delivered successfully" }
  ];

  useEffect(() => {
    // Get order data from localStorage
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    const latestOrder = orderHistory[orderHistory.length - 1];

    if (!latestOrder) {
      setError('No order found');
      setLoading(false);
      return;
    }

    // Get delivery progress from localStorage
    const savedDelivery = JSON.parse(localStorage.getItem('deliveryProgress') || 'null');
    let currentStage = savedDelivery?.currentStage || 1;
    let startTime = savedDelivery?.startTime || Date.now();

    // Initialize delivery info with actual order data
    const newDeliveryInfo = {
      id: latestOrder.id,
      customerName: latestOrder.customerName,
      customerEmail: latestOrder.customerEmail,
      phone: latestOrder.phone,
      address: latestOrder.shippingAddress,
      status: stages[currentStage - 1]?.label || "Processing",
      eta: "2026-04-22",
      trackingNumber: `TRK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      currentStage: currentStage,
      startTime: startTime,
      totalPrice: latestOrder.total,
      itemCount: latestOrder.items.length,
    };

    setDeliveryInfo(newDeliveryInfo);
    setLoading(false);

    // Auto-progress delivery every 12 seconds
    const progressInterval = setInterval(() => {
      setDeliveryInfo(prev => {
        if (!prev) return prev;

        let nextStage = prev.currentStage + 1;

        // Stop at final stage
        if (nextStage > stages.length) {
          nextStage = stages.length;
          clearInterval(progressInterval);
        }

        const updated = {
          ...prev,
          currentStage: nextStage,
          status: stages[nextStage - 1]?.label || "Delivered"
        };

        // Save progress to localStorage
        localStorage.setItem('deliveryProgress', JSON.stringify({
          currentStage: nextStage,
          startTime: prev.startTime,
          orderId: prev.id
        }));

        return updated;
      });
    }, 12000); // Progress every 12 seconds

    return () => clearInterval(progressInterval);
  }, []);

  const getStatusStep = (status) => {
    return stages.findIndex(s => s.label === status) + 1 || 1;
  };

  const currentStep = deliveryInfo ? getStatusStep(deliveryInfo.status) : 0;

  const timeline = stages.map((stage, idx) => ({
    ...stage,
    status: currentStep > stage.step ? "completed" :
      currentStep === stage.step ? "active" : "pending"
  }));

  // Generate fake timestamps for updates
  const getUpdateTime = (stageIndex) => {
    if (stageIndex >= currentStep - 1) return null;

    const timeDiff = (currentStep - stageIndex - 1) * 12; // Each stage is 12 seconds
    const now = new Date();
    now.setSeconds(now.getSeconds() - timeDiff);

    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const date = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${date} at ${hours}:${minutes}`;
  };

  if (loading) {
    return (
      <div className="tracking-page">
        <Breadcrumb />
        <div className="tracking-wrapper">
          <div className="loading-state">
            <p>Loading tracking information...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !deliveryInfo) {
    return (
      <div className="tracking-page">
        <Breadcrumb />
        <div className="tracking-wrapper">
          <div className="error-state">
            <h2>Unable to Track Order</h2>
            <p>{error || 'No order found'}</p>
            <button onClick={() => navigate('/')}>Return to Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tracking-page">
      <Breadcrumb />

      <div className="tracking-wrapper">
        <div className="tracking-header">
          <h1>Order Tracking</h1>
          <p className="tracking-subtitle">Real-time delivery status and updates</p>
        </div>

        <div className="tracking-content">

          {/* Order Summary Card */}
          <div className="order-summary">
            <div className="summary-grid">
              <div className="summary-item">
                <label>Order Number</label>
                <p className="order-number">{deliveryInfo.id}</p>
              </div>
              <div className="summary-item">
                <label>Tracking Number</label>
                <p className="tracking-number">{deliveryInfo.trackingNumber}</p>
              </div>
              <div className="summary-item">
                <label>Estimated Delivery</label>
                <p>{deliveryInfo.eta}</p>
              </div>
              <div className="summary-item">
                <label>Items</label>
                <p>{deliveryInfo.itemCount} item{deliveryInfo.itemCount !== 1 ? 's' : ''}</p>
              </div>
            </div>
          </div>

          {/* Current Status Banner */}
          <div className={`status-banner status-${currentStep}`}>
            <div className="status-icon">{stages[currentStep - 1]?.icon}</div>
            <div className="status-content">
              <h2 className="current-status">{deliveryInfo.status}</h2>
              <p className="status-detail">{stages[currentStep - 1]?.details}</p>
            </div>
          </div>

          {/* Progress Timeline */}
          <div className="timeline-section">
            <h3 className="section-title">Delivery Progress</h3>
            <div className="timeline">
              {timeline.map((item, idx) => (
                <div key={item.step} className={`timeline-item ${item.status}`}>
                  <div className="timeline-marker">
                    <div className="marker-dot"></div>
                    {idx < timeline.length - 1 && <div className="marker-line"></div>}
                  </div>
                  <div className="timeline-content">
                    <h4>{item.label}</h4>
                    <p>{item.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Updates */}
          <div className="updates-section">
            <h3 className="section-title">Delivery Updates</h3>
            <div className="updates-list">
              {stages.map((stage, idx) => {
                if (idx >= currentStep) return null;
                const time = getUpdateTime(idx);
                return (
                  <div key={stage.step} className="update-item completed">
                    <div className="update-icon">✓</div>
                    <div className="update-content">
                      <p className="update-text">{stage.details}</p>
                      <p className="update-time">{time}</p>
                    </div>
                  </div>
                );
              })}
              {currentStep < stages.length && (
                <div className="update-item pending">
                  <div className="update-icon">⏳</div>
                  <div className="update-content">
                    <p className="update-text">Pending next update</p>
                    <p className="update-time">Coming soon</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recipient Information */}
          <div className="recipient-section">
            <h3 className="section-title">Delivery Address</h3>
            <div className="info-block">
              <div className="info-row">
                <span className="info-label">Name:</span>
                <span className="info-value">{deliveryInfo.customerName}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Address:</span>
                <span className="info-value">{deliveryInfo.address}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email:</span>
                <span className="info-value">{deliveryInfo.customerEmail}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Phone:</span>
                <span className="info-value">{deliveryInfo.phone}</span>
              </div>
            </div>
          </div>

          {/* Helpful Information */}
          <div className="help-section">
            <h3 className="section-title">Need Assistance?</h3>
            <div className="help-grid">
              <div className="help-item">
                <h4>Delivery Questions?</h4>
                <p>For questions about your delivery, contact our support team at any time.</p>
              </div>
              <div className="help-item">
                <h4>Package Not Arrived?</h4>
                <p>If your package hasn't arrived by the estimated date, reach out to us immediately.</p>
              </div>
            </div>
            <button className="btn-support" onClick={() => navigate('/reach-out')}>
              Contact Support
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="progress-indicator">
            <p>Stage {currentStep} of {stages.length} • Updates every 12 seconds</p>
          </div>

        </div>
      </div>
    </div>
  );
}
