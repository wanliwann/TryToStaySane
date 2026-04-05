import useScrollReveal from '../hooks/useScrollReveal'

function ScrollReveal({ children, direction = 'up', delay = 0, className = '' }) {
  const [ref, isVisible] = useScrollReveal()

  const directionClass = {
    up: 'reveal',
    left: 'reveal-left',
    right: 'reveal-right',
    scale: 'reveal-scale',
  }[direction] || 'reveal'

  const delayClass = delay > 0 ? `reveal-delay-${delay}` : ''

  return (
    <div
      ref={ref}
      className={`${directionClass} ${delayClass} ${isVisible ? 'visible' : ''} ${className}`}
    >
      {children}
    </div>
  )
}

export default ScrollReveal
