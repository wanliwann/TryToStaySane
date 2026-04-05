import { Link } from 'react-router-dom'
import SectionHeader from '../components/SectionHeader'
import './Categories.css'

function Categories() {
  return (
    <section className="categories">
      <div className="categories__container">
        <SectionHeader
          eyebrow="Explore By"
          title="Shop By Mood"
          description="Whether bold or gentle — we've got your vibe covered."
        />
        <div className="categories__grid">
          <Link to="/browse" className="category-card category-card--him">
            <div className="category-card__content">
              <h3>For Him</h3>
              <p className="category-card__sub">Tobacco, cedar, spice</p>
              <span className="category-card__link">Explore →</span>
            </div>
          </Link>
          <Link to="/browse" className="category-card category-card--her">
            <div className="category-card__content">
              <h3>For Her</h3>
              <p className="category-card__sub">Honey, vanilla, amber</p>
              <span className="category-card__link">Explore →</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Categories
