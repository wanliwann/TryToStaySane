function About() {
  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '72px 64px' }}>
      <p className="eyebrow" style={{ textAlign: 'center' }}>Our Journey</p>
      <h1 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '48px',
        fontWeight: 300,
        textAlign: 'center',
        margin: '16px 0 24px',
      }}>
        The Story Behind <em style={{ color: 'var(--terra)' }}>TryToStaySane</em>
      </h1>
      <p style={{
        fontSize: '15px',
        color: 'var(--faint)',
        lineHeight: 1.8,
        maxWidth: '640px',
        margin: '0 auto',
        textAlign: 'center',
      }}>
        What started as a love for golden-hour scents became a mission — to bottle that warm,
        glowing feeling. Every fragrance we create is an invitation to slow down, breathe deep,
        and enjoy the moment. We believe scent is personal, and everyone deserves a fragrance
        that feels like home.
      </p>
      <div style={{
        width: '100%',
        height: '400px',
        background: 'var(--surface)',
        borderRadius: '12px',
        marginTop: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--border)',
        fontStyle: 'italic',
      }}>
        brand story image
      </div>
    </div>
  )
}

export default About
