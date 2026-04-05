import { Link } from 'react-router-dom'
import { womenProducts } from '../data/products'
import '../pages/Shop.css'

function BestsellersWomen() {
  // Get women's bestsellers (pick top 5 rated)
  const bestsellers = womenProducts.slice(0, 5) // Top 5 women perfumes

  return (
    <div className="shop-page">
      <div className="shop-page__header">
        <p className="eyebrow" style={{ textAlign: 'center' }}>For Her</p>
        <h1 className="shop-page__title">Women's Bestsellers</h1>
        <p className="shop-page__desc">
          Our most-loved scents. {bestsellers.length} products.
        </p>
      </div>

      <div className="shop-grid">
        {bestsellers.map((product) => (
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

export default BestsellersWomen
