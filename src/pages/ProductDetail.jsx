import { useParams } from 'react-router-dom'
import { menProducts, womenProducts } from '../data/products'
import './ProductDetail.css'

function ProductDetail() {
  const { id } = useParams()
  
  // Find product in BOTH arrays
  let product = menProducts.find(p => p.id === id)
  if (!product) {
    product = womenProducts.find(p => p.id === id)
  }

  if (!product) {
    return <div className="product-detail error">Product not found</div>
  }

  return (
    <div className="product-detail">
      <div className="product-container">
        {/* Image Section */}
        <div className="product-images">
          <div className="main-image-container">
            <img
              src={product.mainImage || product.image}
              alt={product.name}
              className="main-image"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <div className="product-header">
            <span className="brand">{product.brand}</span>
            <h1 className="product-name">{product.name}</h1>
          </div>

          <p className="product-description">{product.description}</p>

          {/* Rating */}
          <div className="rating-simple">
            <div className="rating-row">
              <span className="rating-stars">
                {'★ '.repeat(Math.floor(product.rating))}
                {'☆ '.repeat(5 - Math.floor(product.rating))}
              </span>
              <span className="rating-value">{product.rating}</span>
              <span className="review-text">
                {product.reviewCount || product.reviews} reviews
              </span>
            </div>
          </div>

          {/* Size Selector */}
          <div className="size-selector">
            <label>Select Size</label>
            <div className="size-options">
              {product.sizes.map((size, idx) => (
                <button key={idx} className="size-button active">
                  {size.oz}
                </button>
              ))}
            </div>
          </div>

          {/* Price Section */}
          <div className="price-section">
            <div className="price-display">
              <span className="currency">$</span>
              <span className="amount">{product.sizes[0].price}</span>
            </div>
            <p className="size-info">{product.sizes[0].oz}</p>
          </div>

          {/* Quantity & Action Buttons */}
          <div className="quantity-selector">
            <label>Quantity</label>
            <div className="quantity-controls">
              <button className="qty-button">−</button>
              <input type="number" className="qty-input" value="1" />
              <button className="qty-button">+</button>
            </div>
          </div>

          {/* Total Price */}
          <div className="total-price-section">
            <span className="total-label">Total:</span>
            <span className="total-amount">${product.sizes[0].price}</span>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons-primary">
            <button className="add-to-cart">Add to Cart</button>
            <button className="purchase-button">Purchase</button>
            <button className="add-to-wishlist">♡</button>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="product-info-compact">
        <div className="info-container">
          <h2 className="info-title">Product Details</h2>
          
          <div className="specs-compact">
            <div className="spec-item">
              <span className="spec-label">Type</span>
              <span className="spec-value">Eau de Parfum</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Rating</span>
              <span className="spec-value">{product.rating} ⭐</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Brand</span>
              <span className="spec-value">{product.brand}</span>
            </div>
          </div>

          {/* Accords */}
          {product.accords && (
            <div>
              <h3 style={{ fontSize: '1rem', marginTop: '1.5rem' }}>Accords</h3>
              <p>{product.accords.join(', ')}</p>
            </div>
          )}

          {/* Notes */}
          {(product.top || product.heart || product.base) && (
            <div>
              <h3 style={{ fontSize: '1rem', marginTop: '1.5rem' }}>Notes</h3>
              {product.top && <p><strong>Top:</strong> {product.top.join(', ')}</p>}
              {product.heart && <p><strong>Heart:</strong> {product.heart.join(', ')}</p>}
              {product.base && <p><strong>Base:</strong> {product.base.join(', ')}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
