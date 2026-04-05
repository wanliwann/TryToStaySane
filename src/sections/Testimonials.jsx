import SectionHeader from '../components/SectionHeader'
import TestimonialCard from '../components/TestimonialCard'
import { testimonials } from '../data/testimonials'
import './Testimonials.css'

function Testimonials() {
  return (
    <section className="testimonials">
      <div className="testimonials__container">
        <SectionHeader
          eyebrow="Kind Words"
          title="Loved By Many"
          showLine={true}
        />
        <div className="testimonials__grid">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
