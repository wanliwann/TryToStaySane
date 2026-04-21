import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import Breadcrumb from '../components/Breadcrumb';
import './Wishlist.css';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState(new Set());

  const handleAddToCart = (item) => {
    if (item.sizes && item.sizes.length > 0) {
      // Silently add to cart - no alert
      addToCart(item, item.sizes[0].oz, 1);
      
      // Show brief visual feedback
      setAddedItems(prev => new Set(prev).add(item.id));
      setTimeout(() => {
        setAddedItems(prev => {
          const updated = new Set(prev);
          updated.delete(item.id);
          return updated;
        });
      }, 2000);
    }
  };

  const handleRemove = (productId) => {
    removeFromWishlist(productId);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page">
        <Breadcrumb />
        <div className="wishlist-container">
          <h1>My Wishlist</h1>
          <div className="wishlist-empty">
            <div className="empty-icon">♡</div>
            <h2>Your Wishlist is Empty</h2>
            <p>Start adding your favorite perfumes to your wishlist!</p>
            <Link to="/browse" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <Breadcrumb />
      
      <div className="wishlist-container">
        <div className="wishlist-header">
          <div>
            <h1>My Wishlist</h1>
            <p className="wishlist-count">{wishlistItems.length} item(s) saved</p>
          </div>
          {wishlistItems.length > 0 && (
            <button className="btn-clear-wishlist" onClick={clearWishlist}>
              Clear All
            </button>
          )}
        </div>

        <div className="wishlist-grid">
          {wishlistItems.map(item => (
            <div key={item.id} className="wishlist-card">
              <div className="wishlist-card__image-section">
                <Link to={`/product/${item.id}`} className="wishlist-card__image-link">
                  <img
                    src={item.mainImage || item.image}
                    alt={item.name}
                    className="wishlist-card__image"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/250x350?text=Perfume';
                    }}
                  />
                </Link>
                <button
                  className="wishlist-card__remove"
                  onClick={() => handleRemove(item.id)}
                  title="Remove from wishlist"
                  aria-label="Remove from wishlist"
                >
                  ✕
                </button>
              </div>

              <div className="wishlist-card__info">
                <p className="wishlist-card__brand">{item.brand}</p>
                <Link to={`/product/${item.id}`} className="wishlist-card__name-link">
                  <h3 className="wishlist-card__name">{item.name}</h3>
                </Link>

                <div className="wishlist-card__price">
                  {item.price && <p className="price-value">${item.price}</p>}
                  {item.sizes && item.sizes.length > 0 && (
                    <p className="sizes-available">{item.sizes.length} sizes</p>
                  )}
                </div>

                <div className="wishlist-card__actions">
                  <button
                    className={`btn-add-to-cart ${addedItems.has(item.id) ? 'added' : ''}`}
                    onClick={() => handleAddToCart(item)}
                  >
                    {addedItems.has(item.id) ? '✓ Added' : 'Add to Cart'}
                  </button>
                  <Link to={`/product/${item.id}`} className="btn-view-details">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}