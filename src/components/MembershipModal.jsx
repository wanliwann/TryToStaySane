import { useState } from "react";
import "./MembershipModal.css";

export default function MembershipModal({ onClose, customerInfo, orderTotal }) {
  const [joined, setJoined] = useState(false);

  // Safety check - ensure we have data
  if (!onClose || (!customerInfo && !orderTotal)) return null;

  const handleJoinMembership = () => {
    // Save membership data to localStorage
    const membershipData = {
      name: customerInfo?.name || "Member",
      email: customerInfo?.email || "member@example.com",
      isMember: true,
      joinedDate: new Date().toISOString(),
      totalSpent: customerInfo?.totalSpent || orderTotal || 0,
    };

    localStorage.setItem("membershipData", JSON.stringify(membershipData));
    localStorage.setItem("isMember", "true");
    
    console.log("✓ Membership activated:", membershipData);
    setJoined(true);

    setTimeout(() => {
      onClose();
    }, 1500);
  };

  if (joined) {
    return (
      <div className="membership-overlay">
        <div className="membership-modal success">
          <div className="success-check">✓</div>
          <h2>Welcome to VIP!</h2>
          <p>Enjoy 50% OFF on all future purchases! 🎉</p>
        </div>
      </div>
    );
  }

  return (
    <div className="membership-overlay" onClick={onClose}>
      <div className="membership-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>

        <h2>🌟 Become a VIP Member!</h2>
        <p className="subtitle">
          You've spent ${typeof orderTotal === 'number' ? orderTotal.toFixed(2) : '0.00'} - Unlock exclusive benefits!
        </p>

        <div className="benefits">
          <div className="benefit">
            <span className="icon">💎</span>
            <span>50% OFF all future purchases</span>
          </div>
          <div className="benefit">
            <span className="icon">🚚</span>
            <span>Free shipping on all orders</span>
          </div>
          <div className="benefit">
            <span className="icon">🎁</span>
            <span>Early access to new perfumes</span>
          </div>
        </div>

        <div className="modal-buttons">
          <button className="btn-accept" onClick={handleJoinMembership}>
            Join VIP Now
          </button>
          <button className="btn-decline" onClick={onClose}>
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
