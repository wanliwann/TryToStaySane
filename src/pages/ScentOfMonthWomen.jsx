import { Link } from 'react-router-dom'
import { womenProducts } from '../data/products'
import '../pages/Shop.css'

function ScentOfMonthWomen() {
  // Get top-rated women's products as "scent of month"
  const scents = womenProducts.filter(p => p.rating >= 4.6).slice(0, 3)

  return (
    <div className="shop-page">
      <div className="shop-page__header">
        <p className="eyebrow" style={{ textAlign: 'center' }}>For Her</p>
        <h1 className="shop-page__title">Women's Scent of the Month</h1>
        <p className="shop-page__desc">
          Discover our latest arrivals. {scents.length} products.
        </p>
      </div>

      <div className="shop-grid">
        {scents.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="shop-card"
          >
            <div className="shop-card__image">
              <img src={product.mainImage || product.image} alt={product.name} />
            </div>
            <div className="shop-card__info">
              <p className="shop-card__brand">{product.brand}</p>
              <h3 className="shop-card__name">{product.name}</h3>
              <div className="shop-card__stars">
                {'★ '.repeat(Math.floor(product.rating))}{'☆ '.repeat(5 - Math.floor(product.rating))}
              </div>
              <p className="shop-card__price">
                From ${Math.min(...product.sizes.map(s => s.price))}
              </p>
              <p className="shop-card__sizes">
                {product.sizes.length} size{product.sizes.length > 1 ? 's' : ''} available
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ScentOfMonthWomen
