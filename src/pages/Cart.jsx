import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import './Cart.css';

function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <p className="eyebrow">Your Bag</p>
        <h1 className="cart-empty__title">
          Your Bag Is <em className="cart-empty__em">Empty</em>
        </h1>
        <p className="cart-empty__desc">
          Looks like you haven't added any scents yet. Let's fix that.
        </p>
        <Link to="/browse">
          <Button variant="primary">Browse Scents</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <p className="eyebrow">Your Bag</p>
        <h1 className="cart-title">Shopping Bag</h1>
        <p className="cart-subtitle">
          {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your bag
        </p>
      </div>

      <div className="cart-container">
        {/* Items Section */}
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={`${item.id}-${item.size}`} className="cart-item">
              {/* Product Image */}
              <div className="cart-item__image">
                <img
                  src={item.mainImage || item.image}
                  alt={item.name}
                />
              </div>

              {/* Product Info */}
              <div className="cart-item__info">
                <h3 className="cart-item__name">{item.name}</h3>
                <p className="cart-item__brand">{item.brand}</p>
                <p className="cart-item__size">Size: {item.size} oz</p>
              </div>

              {/* Quantity */}
              <div className="cart-item__quantity">
                <button
                  onClick={() =>
                    updateQuantity(item.id, item.size, item.quantity - 1)
                  }
                  className="qty-btn"
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(
                      item.id,
                      item.size,
                      parseInt(e.target.value) || 1
                    )
                  }
                  className="qty-input"
                />
                <button
                  onClick={() =>
                    updateQuantity(item.id, item.size, item.quantity + 1)
                  }
                  className="qty-btn"
                >
                  +
                </button>
              </div>

              {/* Price */}
              <div className="cart-item__price">
                ${(
                  (item.sizes?.find((s) => s.oz === item.size)?.price || 0) *
                  item.quantity
                ).toFixed(2)}
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item.id, item.size)}
                className="cart-item__remove"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="cart-summary">
          <h2 className="summary-title">Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>

          <div className="summary-row summary-total">
            <span>Total:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>

          <button className="btn-checkout" onClick={handleCheckout}>Proceed to Checkout</button>

          <Link to="/browse" className="btn-continue">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
