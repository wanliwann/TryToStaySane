import Hero from '../sections/Hero'
import AboutPreview from '../sections/AboutPreview'
import FeaturedPerfumes from '../sections/FeaturedPerfumes'
import Categories from '../sections/Categories'
import Testimonials from '../sections/Testimonials'
import PromoSection from '../sections/PromoSection'
import Newsletter from '../components/Newsletter'
import ScrollReveal from '../components/ScrollReveal'

function Home() {
  return (
    <div className="home">
      <Hero />

      <ScrollReveal direction="up">
        <AboutPreview />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <FeaturedPerfumes />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <Categories />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <Testimonials />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <PromoSection />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <Newsletter />
      </ScrollReveal>
    </div>
  )
}

export default Home
