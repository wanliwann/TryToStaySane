import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";
import "./ProductCard.css";

export default function ProductCard({ product, showHoverActions = true }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0) {
      addToCart(product, product.sizes[0].oz, 1);
    }
  };

  const mainImage = product.mainImage || product.image || "https://via.placeholder.com/250x350?text=Perfume";
  const caption = product.caption || "Exceptional fragrance for discerning taste.";
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="product-card">
      {/* Image Container with Lazy Loading */}
      <div className="product-card__image-container">
        {/* Clickable Image */}
        <Link to={`/product/${product.id}`} style={{ display: 'block', width: '100%' }}>
          <img
            src={mainImage}
            alt={product.name}
            className="product-card__image"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/250x350?text=Perfume";
            }}
          />
        </Link>
        
        {/* Tag Badge */}
        {product.tag && (
          <div
            className="product-card__tag"
            style={{
              backgroundColor: product.tagColor,
              color: product.tagTextColor,
            }}
          >
            {product.tag}
          </div>
        )}

        {/* Hover Actions */}
        {showHoverActions && (
          <div className="product-card__hover-actions">
            <button
              onClick={handleAddToCart}
              className="product-card__action-btn product-card__action-btn--cart"
              title="Add to cart"
            >
               ADD TO CART
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className={`product-card__action-btn product-card__action-btn--wishlist ${
                inWishlist ? "active" : ""
              }`}
              title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              ♡ {inWishlist ? "LIKED" : "WISHLIST"}
            </button>
            <Link to={`/product/${product.id}`} style={{ display: 'block', width: '100%' }}>
              <button className="product-card__action-btn product-card__action-btn--view" style={{ width: '100%' }}>
                 VIEW DETAILS
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="product-card__info">
        <p className="product-card__brand">{product.brand}</p>
        
        {/* Clickable Name */}
        <Link to={`/product/${product.id}`} style={{ display: 'block', textDecoration: 'none' }}>
          <h3 className="product-card__name">{product.name}</h3>
        </Link>

        {/* Product Caption */}
        <p className="product-card__caption">{caption}</p>

        {/* Rating */}
        <div className="product-card__rating">
          <span className="product-card__stars">★★★★★</span>
          <span className="product-card__rating-number">{product.rating}</span>
          <span className="product-card__review-count">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <p className="product-card__price">
          From ${Math.min(...product.sizes.map((s) => s.price))}
        </p>

        {/* Sizes available */}
        <p className="product-card__availability">
          {product.sizes.length} sizes available
        </p>
      </div>
    </div>
  );
}
