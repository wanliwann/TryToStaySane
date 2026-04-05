import SectionHeader from '../components/SectionHeader'
import ProductCard from '../components/ProductCard'
import { bestSellers } from '../data/products'
import './BestSellers.css'

function BestSellers() {
  return (
    <section className="best-sellers">
      <div className="best-sellers__container">
        <SectionHeader
          eyebrow="Golden Picks"
          title="Warm Favorites"
          description="Scents that glow like late afternoon sun — tried, loved, and treasured."
        />
        <div className="best-sellers__grid">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BestSellers
