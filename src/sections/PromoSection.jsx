import { Link } from 'react-router-dom'
import Button from '../components/Button'
import './PromoSection.css'

function PromoSection() {
  return (
    <section className="promo-section">
      <div className="promo-section__container">
        <div className="promo-section__image">
          <span>lifestyle image</span>
        </div>
        <div className="promo-section__text">
          <p className="eyebrow">Why Choose Us</p>
          <h3>
            Your Scent, <em>Your Glow</em>
          </h3>
          <div className="promo-section__features">
            <p>✦ Handcrafted with ethically sourced ingredients</p>
            <p>✦ Long-lasting formula — stays with you 8+ hours</p>
            <p>✦ 100% cruelty-free and vegan friendly</p>
            <p>✦ Free shipping on all orders over $50</p>
          </div>
          <div className="promo-section__buttons">
            <Link to="/browse">
              <Button variant="primary">Start Shopping</Button>
            </Link>
            <Link to="/browse">
              <Button variant="gold">Gift Cards</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PromoSection
