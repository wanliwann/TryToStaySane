import { Link } from 'react-router-dom'
import { menProducts, womenProducts } from '../data/products'
import './FreshDrops.css'

function FreshDrops() {
  // Get 2 latest men products (with "New" tag)
  const newMen = menProducts.filter(p => p.tag === 'New').slice(0, 2)
  
  // Get 2 latest women products (highest rated)
  const newWomen = womenProducts.filter(p => p.rating >= 4.6).slice(0, 2)
  
  // Combine them
  const freshDrops = [...newMen, ...newWomen]

  return (
    <section className="fresh-drops">
      <div className="fresh-drops__header">
        <p className="eyebrow">Fresh Drops</p>
        <h2 className="fresh-drops__title">Latest Arrivals</h2>
        <p className="fresh-drops__desc">New scents from both collections</p>
      </div>

      <div className="fresh-drops__grid">
        {freshDrops.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="fresh-card"
          >
            <div className="fresh-card__image">
              <img src={product.mainImage || product.image} alt={product.name} />
              {product.tag && (
                <span className="fresh-card__tag">{product.tag}</span>
              )}
            </div>
            <div className="fresh-card__info">
              <p className="fresh-card__brand">{product.brand}</p>
              <h3 className="fresh-card__name">{product.name}</h3>
              <p className="fresh-card__price">
                From ${Math.min(...product.sizes.map(s => s.price))}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* View All Button */}
      <div className="fresh-drops__footer">
        <Link to="/browse-all" className="view-all-btn">
          VIEW ALL SCENTS
        </Link>
      </div>
    </section>
  )
}

export default FreshDrops
