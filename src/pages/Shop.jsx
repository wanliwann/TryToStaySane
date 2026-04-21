import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { menProducts, womenProducts } from '../data/products'
import './Shop.css'

function Shop() {
  const { gender } = useParams() // gender will be 'men' or 'women'
  
  // Filter products based on gender
  const displayProducts = gender === 'women' ? womenProducts : menProducts
  const pageTitle = gender === 'women' ? "Women's Fragrances" : "Men's Fragrances"
  const eyebrowText = gender === 'women' ? 'For Her' : 'For Him'

  return (
    <div className="shop-page">
      <div className="shop-page__header">
        <p className="eyebrow" style={{ textAlign: 'center' }}>{eyebrowText}</p>
        <h1 className="shop-page__title">{pageTitle}</h1>
        <p className="shop-page__desc">
          {displayProducts.length} perfumes with the use sensory words like 'crisp', 'fresh' or 'warm', 'velvety' or 'soft' versus 'sharp' to describe your sensory experience when smelling a particular note.
        </p>
      </div>

      <div className="shop-grid">
        {displayProducts.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="shop-card"
          >
            <div className="shop-card__image">
              <img src={product.mainImage || product.image} alt={product.name} />
              {product.tag && (
                <span
                  className="shop-card__tag"
                  style={{ background: product.tagColor, color: product.tagTextColor }}
                >
                  {product.tag}
                </span>
              )}
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

export default Shop
