import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo">
          TryToStaySane <span className="footer__heart">♡</span>
        </div>
        <div className="footer__links">
          <Link to="/browse">Browse</Link>
          <Link to="/our-story">Our Story</Link>
          <Link to="/reach-out">Reach Out</Link>
          <span>FAQ</span>
        </div>
        <div className="footer__social">
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
          <a href="#">TikTok</a>
        </div>
        <div className="footer__copy">
          © 2026 TryToStaySane. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
