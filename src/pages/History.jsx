import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './History.css';

export default function History() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [vipMembers, setVipMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);

    // ===== LOAD ORDERS =====
    const orderHistory = localStorage.getItem('orderHistory');
    if (orderHistory) {
      try {
        setOrders(JSON.parse(orderHistory));
      } catch (e) {
        console.error('Error parsing orders:', e);
      }
    }

    // ===== LOAD MESSAGES (Ask Questions, Report Issues, Product Reviews) =====
    const userMessages = localStorage.getItem('userMessages');
    if (userMessages) {
      try {
        setMessages(JSON.parse(userMessages));
      } catch (e) {
        console.error('Error parsing messages:', e);
      }
    }

    // ===== LOAD FEEDBACKS (General Feedback/Inquiries) =====
    const userFeedback = localStorage.getItem('userFeedback');
    if (userFeedback) {
      try {
        setFeedbacks(JSON.parse(userFeedback));
      } catch (e) {
        console.error('Error parsing feedbacks:', e);
      }
    }

    // ===== LOAD ALL VIP MEMBERS (Scan all customerData_{email} keys) =====
    const allVipMembers = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('customerData_')) {
        try {
          const customerData = JSON.parse(localStorage.getItem(key));
          if (customerData.isVIPMember) {
            allVipMembers.push({
              email: customerData.email,
              name: customerData.name,
              totalSpent: customerData.totalSpent || 0,
              joinDate: customerData.vipUnlockedDate,
              vipUnlockedDate: customerData.vipUnlockedDate
            });
          }
        } catch (e) {
          console.error('Error parsing customer data:', e);
        }
      }
    }
    
    // Sort by total spent (highest first)
    allVipMembers.sort((a, b) => b.totalSpent - a.totalSpent);
    setVipMembers(allVipMembers);
    console.log('✅ Loaded VIP members:', allVipMembers.length);

    setLoading(false);
  };

  const handleReplyMessage = async (messageIndex, reply) => {
    if (!reply.trim()) return;

    const updatedMessages = [...messages];
    updatedMessages[messageIndex].reply = reply;
    updatedMessages[messageIndex].repliedAt = new Date().toISOString();

    // Save to localStorage with correct key
    localStorage.setItem('userMessages', JSON.stringify(updatedMessages));
    setMessages(updatedMessages);

    // Try to send to API
    try {
      await fetch('http://localhost:3002/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...updatedMessages[messageIndex],
          type: 'reply'
        })
      });
    } catch (err) {
      console.log('API unavailable, saved locally');
    }
  };

  return (
    <div className="history-page">
      <div className="history__container">
        <h1>My Account History</h1>

        {/* TAB NAVIGATION */}
        <div className="history__tabs">
          <button
            className={`history__tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            📦 Orders
          </button>
          <button
            className={`history__tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            💬 Messages
          </button>
          <button
            className={`history__tab-btn ${activeTab === 'membership' ? 'active' : ''}`}
            onClick={() => setActiveTab('membership')}
          >
            👑 Membership
          </button>
          <button
            className={`history__tab-btn ${activeTab === 'feedback' ? 'active' : ''}`}
            onClick={() => setActiveTab('feedback')}
          >
            ⭐ Feedback
          </button>
        </div>

        {/* TAB CONTENT */}
        <div className="history__content">
          {/* ===== ORDERS TAB ===== */}
          {activeTab === 'orders' && (
            <div className="history__tab-content">
              <h3>Order History</h3>
              {orders.length === 0 ? (
                <div className="empty-message">
                  No orders yet. <a href="/browse" style={{ color: '#B87848', textDecoration: 'underline' }}>Start shopping</a>
                </div>
              ) : (
                <div className="orders-list">
                  {orders.map((order, idx) => (
                    <div key={idx} className="order-card">
                      <div className="order-header">
                        <span className="order-id">Order #{order.id || 'ORD-' + Date.now()}</span>
                        <span className={`order-status ${order.status?.toLowerCase() || 'completed'}`}>
                          {order.status || 'COMPLETED'}
                        </span>
                      </div>
                      <div className="order-details">
                        <p><strong>Date:</strong> {order.orderDate || order.date || 'N/A'}</p>
                        <p><strong>Customer:</strong> {order.customerName || order.fullName || 'Guest'}</p>
                        <p><strong>Location:</strong> {order.shippingAddress || order.location || 'N/A'}</p>
                        <p><strong>Items:</strong> {order.items?.length || order.itemCount || '—'}</p>
                        <p><strong>Subtotal:</strong> ${parseFloat(order.subtotal || 0).toFixed(2)}</p>
                        {order.discountApplied && (
                          <p><strong>Discount:</strong> -${parseFloat(order.discountApplied).toFixed(2)}</p>
                        )}
                        <p className="order-total">
                          <strong>Total:</strong> ${parseFloat(order.total || order.subtotal || 0).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ===== MESSAGES TAB ===== */}
          {activeTab === 'messages' && (
            <div className="history__tab-content">
              <h3>Messages & Support</h3>
              {messages.length === 0 ? (
                <div className="empty-message">
                  No messages. <a href="/reach-out" style={{ color: '#B87848', textDecoration: 'underline' }}>Contact us</a>
                </div>
              ) : (
                <div className="messages-list">
                  {messages.map((msg, idx) => (
                    <div key={idx} className="message-card">
                      <div className="message-header">
                        <span className="message-subject">{msg.subject || msg.title || 'Support Request'}</span>
                        <span className="message-date">{msg.date || new Date(msg.timestamp).toLocaleDateString()}</span>
                      </div>
                      <p><strong>From:</strong> {msg.fullName || msg.name || 'Anonymous'}</p>
                      <p><strong>Email:</strong> {msg.email}</p>
                      <div className="message-content">{msg.message || msg.content}</div>
                      {msg.reply ? (
                        <div className="message-reply">
                          <p><strong>Your Reply:</strong></p>
                          <p style={{ fontStyle: 'italic', color: '#666' }}>{msg.reply}</p>
                          <p style={{ fontSize: '12px', color: '#999' }}>Replied: {new Date(msg.repliedAt).toLocaleDateString()}</p>
                        </div>
                      ) : (
                        <div className="message-reply">
                          <p><strong>Reply to this message:</strong></p>
                          <textarea placeholder="Type your reply..." onBlur={(e) => {
                            if (e.target.value) {
                              handleReplyMessage(idx, e.target.value);
                              e.target.value = '';
                            }
                          }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ===== MEMBERSHIP TAB ===== */}
          {activeTab === 'membership' && (
            <div className="history__tab-content">
              <h3>👑 VIP Members ({vipMembers.length})</h3>
              
              {vipMembers.length > 0 ? (
                <div className="vip-members-grid">
                  {vipMembers.map((member, idx) => (
                    <div key={idx} className="membership-card">
                      <h4>👑 VIP Member #{idx + 1}</h4>
                      
                      {/* Customer Info */}
                      <p><strong>Email:</strong> {member.email}</p>
                      {member.name && <p><strong>Name:</strong> {member.name}</p>}
                      
                      {/* Membership Details */}
                      <p><strong>Joined:</strong> {member.joinDate ? new Date(member.joinDate).toLocaleDateString() : 'N/A'}</p>
                      <p><strong>Total Spent:</strong> ${parseFloat(member.totalSpent).toFixed(2)}</p>

                      <p style={{ marginTop: '16px' }}>
                        <strong>Benefits:</strong>
                      </p>

                      <ul>
                        <li>✓ 30% discount on all purchases</li>
                        <li>✓ Free shipping on all orders</li>
                        <li>✓ Early access to new collections</li>
                        <li>✓ Priority customer support</li>
                        <li>✓ Exclusive member-only events</li>
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-message">
                  💎 No VIP members yet. Spend $500+ to unlock VIP status!
                </div>
              )}
            </div>
          )}

          {/* ===== FEEDBACK TAB ===== */}
          {activeTab === 'feedback' && (
            <div className="history__tab-content">
              <h3>Your Feedback</h3>
              {feedbacks.length === 0 ? (
                <div className="empty-message">
                  No feedback submitted yet. <a href="/reach-out" style={{ color: '#B87848', textDecoration: 'underline' }}>Share your thoughts</a>
                </div>
              ) : (
                <div className="feedbacks-list">
                  {feedbacks.map((feedback, idx) => (
                    <div key={idx} className="feedback-card">
                      <div className="feedback-header">
                        <span className="feedback-subject">{feedback.subject || 'General Feedback'}</span>
                        <span className="feedback-date">{new Date(feedback.timestamp).toLocaleDateString()}</span>
                      </div>
                      <p><strong>From:</strong> {feedback.name || 'Anonymous'}</p>
                      <p><strong>Email:</strong> {feedback.email}</p>
                      <div className="feedback-content">
                        {feedback.message || 'No comment'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}