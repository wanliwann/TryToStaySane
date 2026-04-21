import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import "./FeedbackForm.css";

export default function FeedbackForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    rating: 5,
    name: "",
    email: "",
    message: "",
    orderId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "rating" ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3002/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Also save to localStorage for History page
        const feedbacksList = JSON.parse(localStorage.getItem('feedbacks') || '[]');
        const newFeedback = {
          id: data.feedbackId || `FB-${Date.now()}`,
          name: formData.name,
          email: formData.email,
          productId: formData.orderId,
          productName: formData.orderId || 'General Feedback',
          rating: formData.rating,
          comment: formData.message,
          createdAt: new Date().toISOString(),
          status: 'pending'
        };
        feedbacksList.push(newFeedback);
        localStorage.setItem('feedbacks', JSON.stringify(feedbacksList));

        console.log('✓ Feedback saved:', newFeedback);
        setSubmitted(true);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        alert(data.message || "Failed to submit feedback");
      }
    } catch (error) {
      console.error("Feedback error:", error);
      // Fallback to localStorage only
      const feedbacksList = JSON.parse(localStorage.getItem('feedbacks') || '[]');
      const newFeedback = {
        id: `FB-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        productId: formData.orderId,
        productName: formData.orderId || 'General Feedback',
        rating: formData.rating,
        comment: formData.message,
        createdAt: new Date().toISOString(),
        status: 'submitted'
      };
      feedbacksList.push(newFeedback);
      localStorage.setItem('feedbacks', JSON.stringify(feedbacksList));
      
      console.log('✓ Feedback saved to localStorage:', newFeedback);
      setSubmitted(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="feedback-page">
        <Breadcrumb />
        <div className="feedback-container">
          <div className="success-message">
            <div className="checkmark">✓</div>
            <h1>Thank You!</h1>
            <p>Your feedback has been submitted successfully.</p>
            <p className="redirect-text">Redirecting to home page...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="feedback-page">
      <Breadcrumb />

      <div className="feedback-container">
        <h1>Customer Feedback</h1>
        <p className="subtitle">We'd love to hear about your experience!</p>

        <form onSubmit={handleSubmit} className="feedback-form">
          {/* Rating */}
          <div className="form-group">
            <label>How would you rate us? *</label>
            <div className="rating-selector">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`star ${formData.rating >= star ? "active" : ""}`}
                  onClick={() => setFormData({ ...formData, rating: star })}
                >
                  ★
                </button>
              ))}
            </div>
            <p className="rating-label">
              {formData.rating === 1 && "Poor"}
              {formData.rating === 2 && "Fair"}
              {formData.rating === 3 && "Good"}
              {formData.rating === 4 && "Very Good"}
              {formData.rating === 5 && "Excellent"}
            </p>
          </div>

          {/* Order ID (optional) */}
          <div className="form-group">
            <label>Order ID (Optional)</label>
            <input
              type="text"
              name="orderId"
              value={formData.orderId}
              onChange={handleChange}
              placeholder="ORD-12345"
            />
          </div>

          {/* Name */}
          <div className="form-group">
            <label>Your Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />
          </div>

          {/* Message */}
          <div className="form-group">
            <label>Your Feedback *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us what you think about our products and service..."
              rows="6"
              required
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn-submit"
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>

        {/* Info Box */}
        <div className="info-box">
          <h3>Why Your Feedback Matters</h3>
          <ul>
            <li>✓ Help us improve our products and services</li>
            <li>✓ Share your experience with other customers</li>
            <li>✓ Get exclusive discounts on future purchases</li>
            <li>✓ Be part of our community</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
