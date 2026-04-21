import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import './ContactConfirmation.css';

function ContactConfirmation() {
  const navigate = useNavigate();

  return (
    <div className="contact-confirmation-page">
      <Breadcrumb />
      
      <div className="confirmation-container">
        <div className="confirmation-box">
          <div className="success-icon">✓</div>
          
          <h1>Thank You!</h1>
          
          <p className="confirmation-message">
            Your message has been received. We appreciate you reaching out to us!
          </p>
          
          <div className="confirmation-details">
            <p>
              Our team will review your message and get back to you within 24-48 hours.
            </p>
            <p>
              You can also check your email for updates.
            </p>
          </div>

          <div className="action-buttons">
            <button 
              className="btn-home"
              onClick={() => navigate('/')}
            >
              Back to Home
            </button>
            <button 
              className="btn-shop"
              onClick={() => navigate('/shop')}
            >
              Continue Shopping
            </button>
          </div>

          <p className="confirmation-note">
            💌 Check your inbox for confirmation email
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactConfirmation;
