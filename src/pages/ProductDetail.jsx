import { useParams, useNavigate } from "react-router-dom";
import { menProducts, womenProducts } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";
import Breadcrumb from "../components/Breadcrumb.jsx";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const allProducts = [...menProducts, ...womenProducts];
  const product = allProducts.find((p) => p.id === id);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [wishlistAdded, setWishlistAdded] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  useEffect(() => {
    if (product?.sizes && product.sizes.length > 0) {
      const firstSize = product.sizes[0];
      setSelectedSize(firstSize.oz);
      setSelectedImage(firstSize.image);
      setCurrentPrice(firstSize.price);
    }
    setAddedToCart(false);
    setWishlistAdded(false);
    
    // ===== SCROLL TO TOP =====
    window.scrollTo(0, 0);
  }, [product, id]);

  const handleSizeChange = (oz) => {
    setSelectedSize(oz);
    const selectedSizeObj = product.sizes.find((s) => s.oz === oz);
    if (selectedSizeObj) {
      setSelectedImage(selectedSizeObj.image);
      setCurrentPrice(selectedSizeObj.price);
    }
  };

  const handleAddToCart = () => {
    setCartLoading(true);
    setTimeout(() => {
      addToCart(product, selectedSize, quantity);
      setAddedToCart(true);
      setCartLoading(false);
      setTimeout(() => setAddedToCart(false), 2000);
    }, 300);
  };

  const handleWishlist = () => {
    setWishlistLoading(true);
    setTimeout(() => {
      toggleWishlist(product);
      setWishlistAdded(true);
      setWishlistLoading(false);
      setTimeout(() => setWishlistAdded(false), 2000);
    }, 300);
  };

  const handlePurchaseNow = () => {
    navigate("/checkout");
  };

  if (!product) {
    return <div className="product-not-found">Product not found</div>;
  }

  const menRecommendations = menProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);
  const womenRecommendations = womenProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="product-detail-page">
      <Breadcrumb />

      <div className="product-detail-wrapper">
        <div className="product-image-large">
          <img
            src={
              selectedImage ||
              "https://via.placeholder.com/500x600?text=Perfume"
            }
            alt={product.name}
            loading="lazy"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/500x600?text=Perfume";
            }}
          />

          {product.sizes && product.sizes.length > 0 && (
            <div className="product-thumbnails">
              {product.sizes.map((size) => (
                <button
                  key={size.oz}
                  className={`thumbnail ${
                    selectedSize === size.oz ? "active" : ""
                  }`}
                  onClick={() => handleSizeChange(size.oz)}
                  title={`${size.oz} oz - $${size.price}`}
                >
                  <img
                    src={
                      size.image ||
                      "https://via.placeholder.com/100x120?text=Perfume"
                    }
                    alt={`${size.oz} oz`}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/100x120?text=Perfume";
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-info-section">
          <div className="product-header">
            <span className="product-brand">{product.brand}</span>
            <h1>{product.name}</h1>
            <p className="product-description">{product.description}</p>
          </div>

          <div className="rating-box">
            <span className="rating-stars">★★★★★</span>
            <span className="rating-number">{product.rating}</span>
            <span className="rating-reviews">({product.reviewCount})</span>
          </div>

          {product.scentProfile && (
            <div className="fragrance-profile">
              <h3>✦ FRAGRANCE PROFILE</h3>
              <div className="profile-grid">
                <div className="profile-item">
                  <span className="profile-label">Scent Type</span>
                  <span className="profile-value">{product.scentProfile}</span>
                </div>
                <div className="profile-item">
                  <span className="profile-label">Longevity</span>
                  <span className="profile-value">{product.longevity}</span>
                </div>
                <div className="profile-item">
                  <span className="profile-label">Projection</span>
                  <span className="profile-value">{product.projection}</span>
                </div>
              </div>
              <div className="profile-item full-width">
                <span className="profile-label">Best For</span>
                <span className="profile-value">{product.bestFor}</span>
              </div>
              <div className="profile-item full-width">
                <span className="profile-label">Signature Notes</span>
                <span className="profile-value">
                  {product.signatureNotes}
                </span>
              </div>
            </div>
          )}

          <div className="size-picker">
            <label>SELECT SIZE:</label>
            <div className="size-buttons">
              {product.sizes.map((size) => (
                <button
                  key={size.oz}
                  className={`size-btn ${
                    selectedSize === size.oz ? "active" : ""
                  }`}
                  onClick={() => handleSizeChange(size.oz)}
                >
                  {size.oz}
                </button>
              ))}
            </div>
          </div>

          <div className="price-quantity">
            <div className="price">${currentPrice}</div>
            <div className="quantity-box">
              <label>QUANTITY:</label>
              <div className="qty-controls">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  −
                </button>
                <input type="number" value={quantity} readOnly />
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button
              className={`btn-cart ${addedToCart ? "success" : ""}`}
              onClick={handleAddToCart}
              disabled={cartLoading}
            >
              {addedToCart ? "✓ ADDED TO CART" : "ADD TO CART"}
            </button>
            <button className="btn-purchase" onClick={handlePurchaseNow}>
              PURCHASE NOW
            </button>
            <button
              className={`btn-heart ${
                isInWishlist(product.id) ? "active" : ""
              }`}
              onClick={handleWishlist}
              title={
                isInWishlist(product.id)
                  ? "Remove from Wishlist"
                  : "Add to Wishlist"
              }
            >
              ♡
            </button>
          </div>
        </div>
      </div>

      <div className="sizes-prices-table">
        <h2>AVAILABLE SIZES & PRICES</h2>
        <table>
          <thead>
            <tr>
              <th>SIZE (OZ)</th>
              <th>PRICE</th>
              <th>STOCK STATUS</th>
            </tr>
          </thead>
          <tbody>
            {product.sizes?.map((size) => (
              <tr key={size.oz}>
                <td>{size.oz}</td>
                <td>${size.price}</td>
                <td>In Stock</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(menRecommendations.length > 0 ||
        womenRecommendations.length > 0) && (
        <div className="may-like-container">
          <h2>YOU MAY ALSO LIKE</h2>

          {menRecommendations.length > 0 && (
            <div className="may-like-section">
              <h3>YOU MAY LIKE - MEN'S</h3>
              <div className="may-like-grid">
                {menRecommendations.map((rec) => (
                  <ProductCard
                    key={rec.id}
                    product={rec}
                    showHoverActions={false}
                  />
                ))}
              </div>
            </div>
          )}

          {womenRecommendations.length > 0 && (
            <div className="may-like-section">
              <h3>YOU MAY LIKE - WOMEN'S</h3>
              <div className="may-like-grid">
                {womenRecommendations.map((rec) => (
                  <ProductCard
                    key={rec.id}
                    product={rec}
                    showHoverActions={false}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
