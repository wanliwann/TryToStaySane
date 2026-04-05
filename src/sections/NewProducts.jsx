import { Link } from 'react-router-dom'
import SectionHeader from '../components/SectionHeader'
import ProductCard from '../components/ProductCard'
import Button from '../components/Button'
import { newArrivals } from '../data/products'
import './NewProducts.css'

function NewProducts() {
  return (
    <section className="new-products">
      <div className="new-products__container">
        <SectionHeader
          eyebrow="Just Arrived"
          title="Fresh Drops"
          description="New this season — be the first to wear them."
        />
        <div className="new-products__grid">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="new-products__cta">
          <Link to="/browse">
            <Button variant="outline">View All Scents</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NewProducts
