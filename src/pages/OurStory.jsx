import './OurStory.css'

function OurStory() {
  const features = [
    { id: 1, text: 'Free Shipping' },
    { id: 2, text: '10 Days Refund' },
    { id: 3, text: 'Friendly Support' }
  ]

  return (
    <div className="our-story">
      {/* Main Content */}
      <section className="our-story__main">
        <div className="our-story__container">
          {/* Left Content */}
          <div className="our-story__content">
            <h1 className="our-story__heading">
              About <span className="gold">us</span>
            </h1>
            
            <h2 className="our-story__subtitle">Who We Are?</h2>
            
            <p className="our-story__text">
              TryToStaySane is more than just a perfume shop—it's a celebration of self-expression and personal identity. We believe that fragrance is a powerful form of art that tells your story without words. Our carefully curated collection brings together the finest perfumes from around the world, each one selected for its quality, uniqueness, and ability to evoke emotion.
            </p>

            <p className="our-story__text">
              What started as a passion for golden-hour scents became a mission to bottle that warm, glowing feeling and share it with the world. We're committed to helping you discover fragrances that resonate with your personality, mood, and lifestyle. From bold and daring to soft and subtle, every bottle in our collection is a promise: to help you stay true to yourself and embrace the moments that matter most.
            </p>

            {/* Features Grid */}
            <div className="our-story__features">
              {features.map(feature => (
                <div key={feature.id} className="our-story__feature">
                  <div className="our-story__feature-icon">✓</div>
                  <span className="our-story__feature-text">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="our-story__image-section">
            <img src="/story.jpg" alt="Perfume bottle" className="our-story__image" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default OurStory
