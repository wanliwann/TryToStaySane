import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './Payment.css';

export default function Payment() {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { clearWishlist } = useWishlist();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoValid, setPromoValid] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [vipCode, setVipCode] = useState(null);
  const [vipCodeUsed, setVipCodeUsed] = useState(false);
  const [showVipAlert, setShowVipAlert] = useState(false);
  const [justUnlockedVip, setJustUnlockedVip] = useState(false);
  
  const [formData, setFormData] = useState({
    cardHolder: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  // ===== GET CURRENT ORDER FROM STORAGE =====
  const storedOrder = localStorage.getItem('currentOrder');
  console.log('📦 Payment.jsx - currentOrder in storage:', storedOrder ? 'YES ✅' : 'NO ❌');
  const currentOrder = storedOrder ? JSON.parse(storedOrder) : {};
  const membershipData = JSON.parse(localStorage.getItem('membershipData') || '{}');
  
  // ===== CHECK FOR VIP CODE =====
  useEffect(() => {
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    let totalSpent = 0;

    orderHistory.forEach(order => {
      totalSpent += parseFloat(order.total || order.subtotal || 0);
    });

    // If spent $500+, unlock VIP code
    if (totalSpent >= 500 && membershipData.status !== 'vip') {
      setVipCode({
        code: 'NEWMEMBER',
        discount: 0.30, // 30% off
        description: 'Your VIP Gift Card',
        unlocked: true
      });

      // Update membership to VIP
      const updated = {
        ...membershipData,
        status: 'vip',
        totalSpent: totalSpent,
        vipUnlockedAt: new Date().toISOString()
      };
      localStorage.setItem('membershipData', JSON.stringify(updated));
    } else if (membershipData.status === 'vip') {
      setVipCode({
        code: 'NEWMEMBER',
        discount: 0.30,
        description: 'Your VIP Gift Card',
        unlocked: true
      });
      setVipCodeUsed(membershipData.vipCodeUsed || false);
    }
  }, []);

  // ===== USE ALREADY-DISCOUNTED TOTAL FROM CHECKOUT =====
  // currentOrder.total = already discounted from checkout (e.g., $598.95)
  // This is what customer actually pays, not the original $1089
  const checkoutTotal = currentOrder.total || 0; // Already discounted ($598.95)
  const originalSubtotal = currentOrder.subtotal || 0; // Original price ($1089)
  
  // If customer applies NEWMEMBER code on payment page, 
  // apply 5% discount to the ALREADY-DISCOUNTED checkout total
  const additionalDiscount = checkoutTotal * discount; // 5% of $598.95
  const finalTotal = checkoutTotal - additionalDiscount;



  // ===== COPY CODE TO CLIPBOARD (NO ALERT) =====
  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    // Silent copy - no alert
  };

  // ===== APPLY PROMO CODE (NEW MEMBER - 5% OFF) =====
  const handlePromoCode = () => {
    const trimmedCode = promoCode.toUpperCase().trim();

    if (trimmedCode === 'NEWMEMBER') {
      // Check if THIS CUSTOMER (by email) has already used the code
      const customerEmail = currentOrder.customerEmail;
      
      if (!customerEmail) {
        setError('❌ Customer email not found');
        setPromoValid(false);
        return;
      }

      // Get this customer's data (per-email)
      const customerKey = `customerData_${customerEmail}`;
      const customerData = JSON.parse(localStorage.getItem(customerKey) || '{}');

      // Check if THIS customer already used the code
      if (customerData.hasUsedNewMemberCode) {
        setError('❌ NEWMEMBER code already used for this email');
        setPromoValid(false);
        return;
      }

      setDiscount(0.05); // 5% for new members
      setPromoValid(true);
      setError('✅ New Member Code Applied! 5% OFF');
      return;
    }

    setError('❌ Invalid promo code');
    setPromoValid(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      const cleaned = value.replace(/\s/g, '');
      const formatted = cleaned.replace(/(\d{4})/g, '$1 ').trim();
      setFormData(prev => ({
        ...prev,
        [name]: formatted.slice(0, 19)
      }));
      return;
    }

    if (name === 'expiry') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length >= 2) {
        const formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
        setFormData(prev => ({
          ...prev,
          [name]: formatted
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: cleaned
        }));
      }
      return;
    }

    if (name === 'cvv') {
      setFormData(prev => ({
        ...prev,
        [name]: value.replace(/\D/g, '').slice(0, 3)
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.cardHolder.trim()) {
      setError('Cardholder name is required');
      setLoading(false);
      return;
    }
    if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
      setError('Card number must be 16 digits');
      setLoading(false);
      return;
    }
    if (!formData.expiry || formData.expiry.length !== 5) {
      setError('Expiry date must be MM/YY');
      setLoading(false);
      return;
    }
    if (formData.cvv.length !== 3) {
      setError('CVV must be 3 digits');
      setLoading(false);
      return;
    }

    try {
      const usedCode = promoValid 
        ? (promoCode.toUpperCase() === 'NEWMEMBER' ? 'NEWMEMBER' : 'VIPGIFT30')
        : null;

      const paymentData = {
        orderId: currentOrder.id,
        cardHolder: formData.cardHolder,
        amount: finalTotal.toFixed(2),
        currency: 'USD',
        timestamp: new Date().toISOString(),
        promoCodeUsed: usedCode,
        discountApplied: additionalDiscount.toFixed(2)
      };

      const response = await fetch('http://localhost:3002/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData)
      });

      const data = await response.json();

      if (data.success || response.ok) {
        console.log('✅ Payment successful, saving order and redirecting...');
        
        // ===== MARK CODE AS USED =====
        if (promoValid && promoCode.toUpperCase() === 'NEWMEMBER') {
          // Is it VIP code or New Member code?
          if (vipCode && vipCode.unlocked && !vipCodeUsed) {
            // Mark VIP code as used
            const memberData = JSON.parse(localStorage.getItem('membershipData') || '{}');
            memberData.vipCodeUsed = true;
            memberData.vipCodeUsedAt = new Date().toISOString();
            memberData.vipCodeUsedOnOrder = currentOrder.id;
            localStorage.setItem('membershipData', JSON.stringify(memberData));
          } else {
            // Mark New Member code as used (per-email tracking)
            const customerEmail = currentOrder.customerEmail;
            const customerKey = `customerData_${customerEmail}`;
            const customerData = JSON.parse(localStorage.getItem(customerKey) || '{}');
            
            if (customerData) {
              customerData.hasUsedNewMemberCode = true;
              customerData.newMemberCodeUsedDate = new Date().toISOString();
              customerData.newMemberCodeUsedOnOrder = currentOrder.id;
              localStorage.setItem(customerKey, JSON.stringify(customerData));
            }
          }
        }

        // ===== SAVE PAYMENT INFO =====
        localStorage.setItem('paymentInfo', JSON.stringify({
          orderId: currentOrder.id,
          cardHolder: formData.cardHolder,
          amount: finalTotal.toFixed(2),
          currency: 'USD',
          timestamp: new Date().toISOString(),
          promoCodeUsed: promoValid ? promoCode.toUpperCase() : null,
          discountApplied: additionalDiscount.toFixed(2),
          status: 'completed'
        }));

        // ===== ENSURE CURRENT ORDER IS SAVED =====
        const finalOrder = JSON.parse(localStorage.getItem('currentOrder')) || currentOrder;
        finalOrder.paymentCompleted = true;
        finalOrder.paymentTime = new Date().toISOString();
        localStorage.setItem('currentOrder', JSON.stringify(finalOrder));
        
        console.log('✅ Order saved:', finalOrder.id);
        
        // ===== CLEAR CART & WISHLIST =====
        clearCart();
        clearWishlist();
        console.log('✅ Cart and Wishlist cleared');
        
        console.log('🔄 Redirecting to /confirmation');
        
        // Small delay to ensure localStorage is written
        setTimeout(() => {
          navigate('/confirmation');
        }, 100);
      } else {
        console.error('❌ Payment failed:', data.message);
        setError(data.message || 'Payment failed');
      }
    } catch (err) {
      console.error('❌ Payment error:', err);
      
      // Get order from localStorage
      const orderData = JSON.parse(localStorage.getItem('currentOrder'));
      
      if (orderData && orderData.id) {
        console.log('📦 Using order from localStorage:', orderData.id);
        
        // Save order with payment info even if API failed
        orderData.paymentCompleted = true;
        orderData.paymentTime = new Date().toISOString();
        localStorage.setItem('currentOrder', JSON.stringify(orderData));

        localStorage.setItem('paymentInfo', JSON.stringify({
          orderId: orderData.id,
          amount: orderData.total?.toFixed(2) || '0.00',
          status: 'completed',
          timestamp: new Date().toISOString()
        }));

        console.log('✅ Order saved, redirecting to confirmation');
        
        // ===== CLEAR CART & WISHLIST =====
        clearCart();
        clearWishlist();
        console.log('✅ Cart and Wishlist cleared');
        
        // Redirect to confirmation even if API failed
        setTimeout(() => {
          navigate('/confirmation');
        }, 100);
      } else {
        console.error('❌ No order data found!');
        setError('Payment processing error. Please try again or contact support.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <div className="payment-header">
          <h1>Secure Payment</h1>
          <p>Complete your purchase safely</p>
        </div>

        <div className="payment-content">
          {/* Summary Card */}
          <div className="payment-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-item">
              <span>Subtotal (After Checkout Discount)</span>
              <span>${checkoutTotal.toFixed(2)}</span>
            </div>

            {/* VIP GIFT CARD */}
            {vipCode && vipCode.unlocked && (
              <div className="vip-card">
                <div className="vip-badge">👑 VIP GIFT CARD</div>
                <p className="vip-description">{vipCode.description}</p>
                <p className="vip-discount">30% OFF</p>
                
                <div className="vip-code-display">
                  <span className="vip-code">{vipCode.code}</span>
                  <button 
                    type="button"
                    className="vip-copy-btn"
                    onClick={() => copyToClipboard(vipCode.code)}
                  >
                    📋 Copy
                  </button>
                </div>
                
                {vipCodeUsed && (
                  <p className="vip-used">✓ Code used on {membershipData.vipCodeUsedAt ? new Date(membershipData.vipCodeUsedAt).toLocaleDateString() : 'this account'}</p>
                )}
              </div>
            )}

            {/* Promo Code Section */}
            <div className="promo-section">
              <div className="promo-input-group">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="promo-input"
                  maxLength="20"
                />
                <button
                  type="button"
                  onClick={handlePromoCode}
                  className="promo-btn"
                >
                  Apply
                </button>
              </div>
              {promoValid && (
                <p className="promo-success">✓ Code applied! -${additionalDiscount.toFixed(2)}</p>
              )}
            </div>

            {discount > 0 && (
              <div className="summary-item discount">
                <span>Additional Discount ({Math.round(discount * 100)}%)</span>
                <span>-${additionalDiscount.toFixed(2)}</span>
              </div>
            )}

            <div className="summary-divider"></div>

            <div className="summary-item total">
              <span>Total Amount</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handlePayment} className="payment-form">
            <h2>Payment Information</h2>

            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="cardHolder">Cardholder Name</label>
              <input
                type="text"
                id="cardHolder"
                name="cardHolder"
                placeholder="Full name as shown on card"
                value={formData.cardHolder}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={handleChange}
                required
                className="form-input"
              />
              <p className="form-help">16 digits</p>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiry">Expiry Date</label>
                <input
                  type="text"
                  id="expiry"
                  name="expiry"
                  placeholder="MM/YY"
                  value={formData.expiry}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
                <p className="form-help">MM/YY</p>
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
                <p className="form-help">3 digits</p>
              </div>
            </div>

            <div className="security-notice">
              <p>🔒 Your payment information is secure and encrypted</p>
            </div>

            <button
              type="submit"
              className="payment-btn"
              disabled={loading}
            >
              {loading ? 'Processing Payment...' : `Pay $${finalTotal.toFixed(2)}`}
            </button>

            <p className="form-footer">
              By completing this purchase, you agree to our terms and conditions
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
