import { Link } from 'react-router-dom'
import Button from '../components/Button'
import './PromoSection.css'

function PromoSection() {
  return (
    <section className="promo-section">
      <div className="promo-section__container">
        <div className="promo-section__image">
          <img src="/story.jpg" alt="Premium Perfume" loading="lazy" />
        </div>
        
        <div className="promo-section__content">
          <p className="promo-section__eyebrow">Why Choose Us</p>
          <h3 className="promo-section__title">
            Your Scent, <em>Your Glow</em>
          </h3>
          
          <div className="promo-section__features">
            <div className="feature-item">
              <span className="feature-icon"></span>
              <p>✦ Handcrafted with ethically sourced ingredients</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon"></span>
              <p>✦ Long-lasting formula — stays with you 8+ hours</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon"></span>
              <p>✦ 100% cruelty-free and vegan friendly</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon"></span>
              <p>✦ Free shipping on all orders over $50</p>
            </div>
          </div>
          
          <div className="promo-section__actions">
            <Link to="/browse" className="btn-wrapper">
              <Button variant="primary">Start Shopping</Button>
            </Link>
            <Link to="/gift-cards" className="btn-wrapper">
              <Button variant="gold">Gift Cards</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PromoSection