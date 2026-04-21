import { Link } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import SearchOverlay from "./SearchOverlay";

function Navbar() {
  const { cartCount } = useCart();
  const { wishlistItems } = useWishlist();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShopHovered, setIsShopHovered] = useState(false);

  const wishlistCount = wishlistItems.length;

  return (
    <>
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <nav className="navbar">
        <div className="navbar__container">
          {/* LOGO */}
          <Link to="/" className="navbar__logo">
            TryToStaySane <span className="navbar__heart">♡</span>
          </Link>

          {/* CENTER MENU */}
          <div className="navbar__center">
            <ul className="navbar__menu">
              <li>
                <Link to="/" className="navbar__link">
                  HOME
                </Link>
              </li>

              {/* SHOP WITH MEGA MENU - HOVER BASED */}
              <li
                className="navbar__shop-item"
                onMouseEnter={() => setIsShopHovered(true)}
              >
                <button className="navbar__link navbar__shop-btn">
                  SHOP <span className="navbar__arrow">▼</span>
                </button>

                {isShopHovered && (
                  <div
                    className="navbar__mega-menu"
                    onMouseEnter={() => setIsShopHovered(true)}
                    onMouseLeave={() => {
                      setTimeout(() => setIsShopHovered(false), 200);
                    }}
                  >
                    <div className="navbar__mega-container">
                      {/* FOR WOMEN */}
                      <div className="navbar__mega-column">
                        <h3 className="navbar__mega-title">For Women</h3>
                        <Link to="/browse/women" className="navbar__mega-link">
                          Shop All Women's
                        </Link>
                        <Link
                          to="/bestsellers/women"
                          className="navbar__mega-link"
                        >
                          Bestsellers
                        </Link>
                        <Link to="/luxury/women" className="navbar__mega-link">
                          Luxury Scents
                        </Link>
                        <Link
                          to="/scent-of-month/women"
                          className="navbar__mega-link"
                        >
                          Scent of the Month
                        </Link>
                      </div>

                      {/* FOR MEN */}
                      <div className="navbar__mega-column">
                        <h3 className="navbar__mega-title">For Men</h3>
                        <Link to="/browse/men" className="navbar__mega-link">
                          Shop All Men's
                        </Link>
                        <Link
                          to="/bestsellers/men"
                          className="navbar__mega-link"
                        >
                          Bestsellers
                        </Link>
                        <Link to="/luxury/men" className="navbar__mega-link">
                          Luxury Scents
                        </Link>
                        <Link
                          to="/scent-of-month/men"
                          className="navbar__mega-link"
                        >
                          Scent of the Month
                        </Link>
                      </div>

                      {/* GIFTS */}
                      <div className="navbar__mega-column">
                        <h3 className="navbar__mega-title">Gifts</h3>
                        <Link
                          to="/browse?gender=women"
                          className="navbar__mega-link"
                        >
                          For Her
                        </Link>
                        <Link
                          to="/browse?gender=men"
                          className="navbar__mega-link"
                        >
                          For Him
                        </Link>
                      </div>

                      {/* FEATURED */}
                      <div className="navbar__mega-featured"></div>
                    </div>
                  </div>
                )}
              </li>

              <li>
                <Link to="/our-story" className="navbar__link">
                  OUR STORY
                </Link>
              </li>
              <li>
                <Link to="/reach-out" className="navbar__link">
                  REACH OUT
                </Link>
              </li>
              <li>
                <Link to="/account" className="navbar__link">
                  ACCOUNT
                </Link>
              </li>
            </ul>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="navbar__right">
            {/* SEARCH ICON - SVG BUILT-IN */}
            <button
              className="navbar__search-btn"
              onClick={() => setIsSearchOpen(true)}
              title="Search"
              aria-label="Search"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>

            {/* WISHLIST ICON - SVG BUILT-IN */}
            <Link
              to="/wishlist"
              className="navbar__icon-btn"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              {wishlistCount > 0 && (
                <span className="navbar__badge">{wishlistCount}</span>
              )}
            </Link>

            {/* CART BUTTON */}
            <Link to="/bag" className="navbar__cart-btn">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span className="navbar__cart-text">CART</span>
              {cartCount > 0 && (
                <span className="navbar__cart-badge">{cartCount}</span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
