import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        {/* LEFT */}
        <div className="navbar__left">
          <Link to="/" className="navbar__logo">
            TryToStaySane <span className="navbar__heart">♡</span>
          </Link>
        </div>

        {/* CENTER */}
        <div className="navbar__center">
          <div className="navbar__links">
            <Link to="/">HOME</Link>
            
            {/* SHOP Dropdown */}
            <div className="navbar__dropdown-wrapper">
              <button className="navbar__dropdown-trigger">
                SHOP <span className="navbar__arrow">▼</span>
              </button>
              
              <div className="navbar__mega-menu">
                <div className="navbar__mega-inner">
                  {/* FOR WOMEN */}
                  <div>
                    <h4 className="navbar__mega-heading">For Women</h4>
                    <Link to="/browse/women" className="navbar__mega-link">Shop All Women's</Link>
                    <Link to="/bestsellers/women" className="navbar__mega-link">Bestsellers</Link>
                    <Link to="/luxury/women" className="navbar__mega-link">Luxury Scents</Link>
                    <Link to="/scent-of-month/women" className="navbar__mega-link">Scent of the Month</Link>
                  </div>

                  {/* FOR MEN */}
                  <div>
                    <h4 className="navbar__mega-heading">For Men</h4>
                    <Link to="/browse/men" className="navbar__mega-link">Shop All Men's</Link>
                    <Link to="/bestsellers/men" className="navbar__mega-link">Bestsellers</Link>
                    <Link to="/luxury/men" className="navbar__mega-link">Luxury Scents</Link>
                    <Link to="/scent-of-month/men" className="navbar__mega-link">Scent of the Month</Link>
                  </div>

                  {/* GIFTS */}
                  <div>
                    <h4 className="navbar__mega-heading">Gifts</h4>
                    <Link to="/browse/women" className="navbar__mega-link">For Her</Link>
                    <Link to="/browse/men" className="navbar__mega-link">For Him</Link>
                  </div>

                  {/* FEATURED */}
                  <div className="navbar__mega-feature">
                    <div className="navbar__mega-feature-img">Featured</div>
                  </div>
                </div>
              </div>
            </div>

            <Link to="/our-story">OUR STORY</Link>
            <Link to="/reach-out">REACH OUT</Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="navbar__right">
          <button className="navbar__icon-btn" title="Search">🔍</button>
          <Link to="/wishlist" className="navbar__icon-btn" title="Wishlist">♡</Link>
          <Link to="/bag" className="navbar__cart-btn">CART</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
