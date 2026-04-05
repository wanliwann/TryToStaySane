import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import './Hero.css'

const slides = [
  {
    eyebrow: 'Sun-Kissed Luxury',
    title: 'Dripping In',
    titleAccent: 'Honey & Light',
    desc: 'Warm, golden fragrances that make every day feel like a perfect summer afternoon. Crafted for the bold and the beautiful.',
    image: null,
  },
  {
    eyebrow: 'New This Season',
    title: 'Glow From',
    titleAccent: 'The Inside Out',
    desc: 'Discover scents that radiate warmth and confidence. Each bottle is a golden invitation to shine.',
    image: null,
  },
  {
    eyebrow: 'Limited Edition',
    title: 'Chasing',
    titleAccent: 'Golden Hour',
    desc: 'Our most exclusive blend yet — inspired by sunsets, slow evenings, and the magic of golden light.',
    image: null,
  },
]

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const slide = slides[activeSlide]

  // Auto-play slider
  useEffect(() => {
    const timer = setInterval(() => {
      handleSlideChange((activeSlide + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [activeSlide])

  const handleSlideChange = (index) => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setActiveSlide(index)
      setTimeout(() => setIsAnimating(false), 600)
    }, 300)
  }

  return (
    <section className="hero hero-animate">
      <div className="hero__container">
        <div className={`hero__text ${isAnimating ? 'slide-out' : 'slide-in'}`}>
          <p className="eyebrow">{slide.eyebrow}</p>
          <h1 className="hero__title">
            {slide.title}<br />
            <em>{slide.titleAccent}</em>
          </h1>
          <p className="hero__desc">{slide.desc}</p>
          <div className="hero__buttons">
            <Link to="/browse">
              <Button variant="primary">Explore Scents</Button>
            </Link>
            <Link to="/browse">
              <Button variant="gold">Seasonal Picks</Button>
            </Link>
          </div>
        </div>
        <div className={`hero__image float-animation ${isAnimating ? 'slide-out-right' : 'slide-in-right'}`}>
          {slide.image ? (
            <img src={slide.image} alt="Featured perfume" />
          ) : (
            <span>featured perfume bottle</span>
          )}
        </div>
      </div>
      <div className="hero__dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`hero__dot ${index === activeSlide ? 'active' : ''}`}
            onClick={() => handleSlideChange(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero
