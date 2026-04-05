import { Link } from 'react-router-dom'
import Button from '../components/Button'
import './AboutPreview.css'

function AboutPreview() {
  return (
    <section className="about-preview">
      <div className="about-preview__container">
        <p className="eyebrow" style={{ textAlign: 'center' }}>Our Beginning</p>
        <div className="gold-line"></div>
        <div className="about-preview__content">
          <div className="about-preview__image">
            <span>brand story image</span>
          </div>
          <div className="about-preview__text">
            <h3>
              Crafted With <em>Heart &amp; Warmth</em>
            </h3>
            <p>
              What started as a love for golden-hour scents became a mission — to bottle
              that warm, glowing feeling. Every fragrance we create is an invitation to
              slow down, breathe deep, and enjoy the moment.
            </p>
            <Link to="/our-story">
              <Button variant="outline">Read Our Story</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutPreview
