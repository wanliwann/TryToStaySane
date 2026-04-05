function SectionHeader({ eyebrow, title, description, showLine = false }) {
  return (
    <div className="section-header">
      {eyebrow && <p className="eyebrow" style={{ textAlign: 'center' }}>{eyebrow}</p>}
      {showLine && <div className="gold-line"></div>}
      {title && (
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          textAlign: 'center',
          fontSize: '36px',
          fontWeight: 300,
          marginBottom: '8px',
        }}>
          {title}
        </h2>
      )}
      {description && (
        <p style={{
          textAlign: 'center',
          fontSize: '13px',
          color: 'var(--faint)',
          lineHeight: 1.7,
          marginBottom: '40px',
          maxWidth: '460px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionHeader
