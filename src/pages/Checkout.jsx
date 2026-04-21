import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Checkout.css';

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [loading, setLoading] = useState(false);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    location: ''
  });

  // ===== CALCULATE SUBTOTAL =====
  const subtotal = cartItems.reduce((sum, item) => {
    const sizeData = item.sizes?.find((s) => s.oz === item.size);
    return sum + (sizeData?.price || 0) * item.quantity;
  }, 0);

  // ===== GET CUSTOMER DATA BY EMAIL =====
  const customerKey = `customerData_${formData.email}`;
  const customerData = formData.email ? JSON.parse(localStorage.getItem(customerKey) || '{}') : {};

  // ===== EXCLUSIVE DISCOUNT (ONLY ONE APPLIES) =====
  let totalDiscountRate = 0;
  let discountBreakdown = [];
  let showVipAlert = false;
  let vipUnlocked = false;

  // Priority order (highest tier wins):
  // 1. VIP Member → 30%
  // 2. $500+ → 30% (VIP unlock)
  // 3. $250-$499 → 15%
  // 4. < $250 + NEWMEMBER code → 5%
  // 5. Otherwise → 0%

  if (customerData.isVIPMember) {
    // CASE 1: Already VIP
    totalDiscountRate = 0.30;
    discountBreakdown.push('30% (VIP Member)');
  } 
  else if (subtotal >= 500) {
    // CASE 2: First purchase $500+ → VIP unlock!
    totalDiscountRate = 0.30;
    discountBreakdown.push('30% (VIP Unlock!)');
    vipUnlocked = true;
    showVipAlert = true;
  } 
  else if (subtotal >= 250) {
    // CASE 3: $250-$499 → Auto 15%
    totalDiscountRate = 0.15;
    discountBreakdown.push('15% (Over $250)');
  } 
  else if (promoApplied && promoCode.toUpperCase() === 'NEWMEMBER') {
    // CASE 4: < $250 + NEWMEMBER code → 5% (one-time)
    if (!customerData.hasUsedNewMemberCode) {
      totalDiscountRate = 0.05;
      discountBreakdown.push('5% (NEWMEMBER Code)');
    } else {
      setError('❌ Code already used. You\'re no longer a new member!');
      setPromoApplied(false);
      totalDiscountRate = 0;
      discountBreakdown.push('No discount');
    }
  }
  else {
    // CASE 5: < $250 + No code → 0%
    totalDiscountRate = 0;
    discountBreakdown.push('No discount');
  }

  const discountAmount = subtotal * totalDiscountRate;
  const discountedSubtotal = subtotal - discountAmount;
  const shipping = discountedSubtotal > 50 ? 0 : 5;
  const total = discountedSubtotal + shipping;

  // ===== HANDLE PROMO CODE =====
  const handlePromoCode = () => {
    const code = promoCode.toUpperCase().trim();
    
    if (code === 'NEWMEMBER') {
      if (customerData.hasUsedNewMemberCode) {
        setError('❌ Code already used for this email');
        setPromoApplied(false);
        return;
      }
      setPromoApplied(true);
      setPromoCode('NEWMEMBER');
      setError('✅ Code applied!');
      return;
    }
    setError('❌ Invalid code');
    setPromoApplied(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.email || !formData.location) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const orderId = `ORD-${Date.now()}`;
      const now = new Date();
      const orderDate = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      const orderTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

      // ===== UPDATE CUSTOMER DATA =====
      const updatedCustomerData = {
        email: formData.email,
        name: formData.customerName,
        phone: formData.phone,
        address: formData.location,
        ...customerData,
        totalSpent: (customerData.totalSpent || 0) + total,
        lastOrderDate: new Date().toISOString()
      };

      if (promoApplied && promoCode.toUpperCase() === 'NEWMEMBER') {
        updatedCustomerData.hasUsedNewMemberCode = true;
        updatedCustomerData.newMemberCodeUsedDate = new Date().toISOString();
      }

      if (vipUnlocked && !customerData.isVIPMember) {
        updatedCustomerData.isVIPMember = true;
        updatedCustomerData.vipUnlockedDate = new Date().toISOString();
        
        // ===== ALSO UPDATE GLOBAL MEMBERSHIP DATA =====
        const membershipData = JSON.parse(localStorage.getItem('membershipData') || '{}');
        membershipData.email = formData.email;  // ← Save email!
        membershipData.name = formData.customerName;  // ← Save name!
        membershipData.status = 'vip';
        membershipData.joinDate = new Date().toISOString();
        membershipData.totalSpent = total;
        localStorage.setItem('membershipData', JSON.stringify(membershipData));
      }

      localStorage.setItem(customerKey, JSON.stringify(updatedCustomerData));

      const orderData = {
        id: orderId,
        orderId: orderId,
        orderDate: orderDate,
        orderTime: orderTime,
        customerName: formData.customerName,
        customerEmail: formData.email,
        email: formData.email,
        shippingAddress: formData.location,
        phone: formData.phone,
        items: cartItems,
        subtotal: subtotal,
        discountAmount: discountAmount,
        discountRate: totalDiscountRate,
        discountBreakdown: discountBreakdown,
        shipping: shipping,
        total: total,
        vipUnlocked: vipUnlocked,
      };
      localStorage.setItem("currentOrder", JSON.stringify(orderData));

      try {
        await fetch("http://localhost:3002/api/purchase", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerName: formData.customerName,
            email: formData.email,
            location: formData.location,
            phone: formData.phone,
            items: cartItems,
            subtotal: subtotal,
            total: total,
          }),
        });
      } catch (apiError) {
        console.log('⚠️ API not available');
      }

      navigate("/payment", { state: { vipUnlocked: vipUnlocked } });
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Error processing checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-breadcrumb">Home</div>
      
      <div className="checkout-wrapper">
        <h1 className="checkout-title">Checkout</h1>

        <form onSubmit={handleCheckout} className="checkout-form">
          {/* LEFT: SHIPPING INFORMATION */}
          <div className="checkout-left">
            <div className="form-section">
              <h2>Shipping Information</h2>

              <div className="form-group">
                <label>FULL NAME *</label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                />
              </div>

              <div className="form-group">
                <label>EMAIL *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email Address"
                  required
                />
              </div>

              <div className="form-group">
                <label>PHONE</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your Phone Number"
                />
              </div>

              <div className="form-group">
                <label>LOCATION *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Your Location"
                  required
                />
              </div>

              <div className="promo-section">
                <label>PROMO CODE (OPTIONAL)</label>
                <div className="promo-input-group">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                  />
                  <button type="button" className="btn-apply" onClick={handlePromoCode}>
                    Apply
                  </button>
                </div>
                {error && <p className={error.includes('✅') ? 'success-msg' : 'error-msg'}>{error}</p>}
              </div>

              <button type="submit" className="btn-continue" disabled={loading || cartItems.length === 0}>
                {loading ? 'Processing...' : 'CONTINUE TO PAYMENT'}
              </button>
            </div>
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="checkout-right">
            <div className="order-summary">
              <h2>Order Summary</h2>

              {/* Items List */}
              <div className="items-list">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item-row">
                    <div className="item-info">
                      <p className="item-name">{item.name}</p>
                      <p className="item-detail">{item.size}ml</p>
                    </div>
                    <p className="item-price">${item.price?.toFixed(2) || '0.00'}</p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="totals">
                <div className="total-row">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {totalDiscountRate > 0 && (
                  <div className="total-row discount-row">
                    <span>Discount ({(totalDiscountRate * 100).toFixed(0)}% off):</span>
                    <span className="discount-text">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="total-row">
                  <span>Shipping:</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>

                <div className="total-row total">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* VIP Alert - Simple Style */}
              {showVipAlert && (
                <div className="vip-promo-box">
                  <p className="vip-title">👑 VIP MEMBERSHIP UNLOCKED!</p>
                  <p className="vip-msg">Congratulations! You've joined our VIP membership program.</p>
                  <p className="vip-benefit">From now on: Get 30% OFF every purchase automatically!</p>
                  <p className="vip-saving">Today's savings: -${discountAmount.toFixed(2)}</p>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
