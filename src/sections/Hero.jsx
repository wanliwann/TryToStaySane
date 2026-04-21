import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'

const slides = [
  {
    id: 'w26',
    eyebrow: 'Yves Saint Laurent',
    title: 'Mon',
    titleAccent: 'Paris',
    desc: 'A sweet fruity floral perfume for women. Sweet notes of luscious red berries softened by datura flower and anchored by the woody scent of white musk.',
    price: 132,
    oz: '1.6',
    image: '/women/11-mon-paris/1.6oz-132.jpg',
    section: 'women',
  },
  {
    id: 'm1',
    eyebrow: 'Dior',
    title: 'Dior Sauvage',
    titleAccent: 'Eau de Parfum',
    desc: 'A powerful, fresh fragrance with dominant notes of bergamot, pepper, and lavender. The iconic scent for the modern man.',
    price: 232,
    oz: '6.8',
    image: '/men/01-dior-sauvage/DiorS 6.8oz -4.png',
    section: 'men',
  },
  {
    id: 'm8',
    eyebrow: 'Carolina Herrera',
    title: 'Bad Boy',
    titleAccent: 'Cobalt',
    desc: 'A bold, fresh cologne with bright pink pepper and lavender. Electric, confident, and irresistibly sexy.',
    price: 160,
    oz: '3.4',
    image: '/men/08-bad-boy-cobalt/bad 3.4oz -3.png',
    section: 'men',
  },
]

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const slide = slides[activeSlide]

  // Auto-play slider - 4 seconds per slide, infinite loop
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prevSlide => (prevSlide + 1) % slides.length)
    }, 4000)
    
    return () => clearInterval(timer)
  }, [])

  const handleSlideChange = (index) => {
    if (index === activeSlide) return
    setActiveSlide(index)
  }

  // Determine explore link based on section
  const exploreLink = slide.section === 'women' ? '/browse/women' : '/browse/men'

  return (
    <section className="hero hero-animate">
      <div className="hero__container">
        <div className="hero__text">
          <p className="eyebrow" key={`eyebrow-${slide.id}`}>{slide.eyebrow}</p>
          <h1 className="hero__title" key={`title-${slide.id}`}>
            {slide.title}<br />
            <em>{slide.titleAccent}</em>
          </h1>
          <p className="hero__desc" key={`desc-${slide.id}`}>{slide.desc}</p>
          <div className="hero__price-size" key={`price-${slide.id}`}>
            <span className="hero__price-label">Size: {slide.oz}</span>
            <span className="hero__price-amount">${slide.price}</span>
          </div>
          <div className="hero__buttons" key={`buttons-${slide.id}`}>
            <Link to={exploreLink} className="btn btn-primary">
              Explore More
            </Link>
            <Link to={`/product/${slide.id}`} className="btn btn-gold">
              Shop Now
            </Link>
          </div>
        </div>
        <div className="hero__image float-animation" key={`img-${slide.id}`}>
          <img src={slide.image} alt={slide.titleAccent} onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x500?text=Perfume'
          }} />
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
