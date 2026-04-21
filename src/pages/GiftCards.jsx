import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import "./GiftCards.css";

export default function GiftCards() {
  const navigate = useNavigate();
  const [totalSpent, setTotalSpent] = useState(0);
  const [copied, setCopied] = useState(false);
  const giftCardCode = "NEWMEMBER";

  useEffect(() => {
    // Calculate total spent from all orders in localStorage
    const orderHistory = JSON.parse(localStorage.getItem("orderHistory") || "[]");
    const total = orderHistory.reduce((sum, order) => sum + order.total, 0);
    setTotalSpent(total);
  }, []);

  const copyCode = () => {
    navigator.clipboard.writeText(giftCardCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToMembership = () => {
    const element = document.getElementById("membership-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const eligible = totalSpent >= 250;

  return (
    <div className="gift-cards-page">
      <Breadcrumb />

      <div className="gift-cards-container">
        <h1>Gift Cards</h1>
        <p className="subtitle">Reward yourself with exclusive discounts!</p>

        {eligible ? (
          <div className="gift-card-section">
            <div className="gift-card">
              <div className="gift-card__header">
                <h2>🎁 Gift Card</h2>
                <p className="gift-card__badge">15% OFF</p>
              </div>

              <div className="gift-card__content">
                <p className="gift-card__desc">
                  Spend <strong>$250+</strong> and unlock 15% OFF on ALL future purchases!
                </p>
                <p className="gift-card__code-label">Your Exclusive Code:</p>
                <div className="gift-card__code-box">
                  <code>{giftCardCode}</code>
                  <button 
                    className="btn-copy"
                    onClick={copyCode}
                  >
                    {copied ? "✓ Copied!" : "Copy"}
                  </button>
                </div>

                <div className="gift-card__details">
                  <p>✓ 15% OFF your next purchase</p>
                  <p>✓ Valid on all items</p>
                  <p>✓ Use anytime</p>
                </div>
              </div>
            </div>

            <div className="cta-section">
              <button 
                className="btn-primary"
                onClick={() => navigate("/browse")}
              >
                Start Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="no-eligible">
            <h2>You're Almost There! 🎉</h2>
            <p>
              Spend <strong>${(250 - totalSpent).toFixed(2)}</strong> more to unlock your 30% OFF gift card!
            </p>
            <p className="current-spent">Current spent: <strong>${totalSpent.toFixed(2)}</strong></p>
            <button 
              className="btn-primary"
              onClick={() => navigate("/browse")}
            >
              Continue Shopping
            </button>
          </div>
        )}

        <div className="membership-info" id="membership-section">
          <h3>Become a Member</h3>
          <p>Spend $500+ and unlock 30% OFF on ALL future purchases!</p>
          <ul className="membership-benefits-list">
            <li>✓ 30% OFF on all items, forever</li>
            <li>✓ Automatic discount on every purchase</li>
            <li>✓ Priority customer support</li>
            <li>✓ Free shipping on all orders</li>
            <li>✓ Birthday specials & exclusive offers</li>
          </ul>
          <p className="membership-how">
            Make your first purchase over $500 and we'll invite you to join!
          </p>
          <button 
            className="btn-secondary"
            onClick={() => navigate("/browse")}
          >
            Start Shopping to Unlock Membership
          </button>
        </div>
      </div>
    </div>
  );
}
