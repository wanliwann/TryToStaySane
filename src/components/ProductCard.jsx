import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);
  const minPrice = Math.min(...product.sizes.map((size) => size.price));
  const maxPrice = Math.max(...product.sizes.map((size) => size.price));

  const handleAddToCart = (e) => {
    e.preventDefault();
    console.log(`Added ${quantity}x ${product.name} to cart`);
    setQuantity(1);
  };

  const handlePurchase = (e) => {
    e.preventDefault();
    console.log(`Purchased ${quantity}x ${product.name} immediately`);
    setQuantity(1);
  };

  const handleQuantityChange = (value) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="card-image-container">
        <img
          src={product.mainImage}
          alt={product.name}
          className="card-image"
        />
        {product.tag && (
          <div
            className="product-tag"
            style={{
              backgroundColor: product.tagColor,
              color: product.tagTextColor,
            }}
          >
            {product.tag}
          </div>
        )}
      </div>

      <div className="card-content">
        <div className="card-header">
          <span className="card-brand">{product.brand}</span>
        </div>

        <h3 className="card-title">{product.name}</h3>

        <div className="card-rating">
          <span className="stars">
            {'★'.repeat(Math.floor(product.rating))}
            {product.rating % 1 >= 0.5 && '★'}
          </span>
          <span className="rating-text">
            {product.rating} ({product.reviewCount} reviews)
          </span>
        </div>

        <div className="card-price">
          {minPrice === maxPrice ? (
            <span className="price-display">From ${minPrice}</span>
          ) : (
            <span className="price-display">
              ${minPrice} - ${maxPrice}
            </span>
          )}
        </div>

        {/* Quantity Selector & Action Buttons */}
        <div className="card-actions" onClick={(e) => e.preventDefault()}>
          {/* Quantity Selector */}
          <div className="quantity-selector-compact">
            <button
              className="qty-btn minus"
              onClick={() => handleQuantityChange(quantity - 1)}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) =>
                handleQuantityChange(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="qty-display"
            />
            <button
              className="qty-btn plus"
              onClick={() => handleQuantityChange(quantity + 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Action Buttons */}
          <div className="button-group">
            <button
              className="btn-add-to-cart"
              onClick={handleAddToCart}
              title="Add to Cart"
            >
              Add to Cart
            </button>
            <button
              className="btn-purchase"
              onClick={handlePurchase}
              title="Purchase Now"
            >
              Purchase
            </button>
            <button
              className="btn-wishlist"
              title="Add to Wishlist"
              onClick={(e) => {
                e.preventDefault();
                console.log(`Added ${product.name} to wishlist`);
              }}
            >
              ♡
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
