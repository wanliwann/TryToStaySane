function TestimonialCard({ testimonial }) {
  const { quote, name, role } = testimonial

  return (
    <div className="testimonial-card">
      <div className="testimonial-card__avatar"></div>
      <p className="testimonial-card__quote">"{quote}"</p>
      <div className="testimonial-card__name">{name}</div>
      <div className="testimonial-card__role">{role}</div>
    </div>
  )
}

export default TestimonialCard
