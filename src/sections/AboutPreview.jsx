import { Link } from 'react-router-dom'
import './AboutPreview.css'

function AboutPreview() {
  return (
    <section className="about-preview">
      <div className="about-preview__label">About us</div>
      
      <div className="about-preview__container">
        <div className="about-preview__image">
          <img src="/model-perfume.jpg" alt="Woman spraying perfume" />
        </div>
        
        <div className="about-preview__content">
          <h2 className="about-preview__heading">
            Perfume<br /><span className="gold">Matters</span>
          </h2>
          
          <p className="about-preview__description">
            At TryToStaySane, we believe that fragrance is more than just a scent and it's an experience, a memory, a feeling. Our carefully curated collection of premium perfumes from around the world is designed to elevate your everyday moments and celebrate your unique style. From bold and daring to soft and subtle, we have the perfect fragrance to match your personality and mood. Each bottle is a promise: to help you stay true to yourself and embrace the moments that matter most.
          </p>
          
          <Link to="/our-story" className="about-preview__button">
            OUR STORY
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AboutPreview
