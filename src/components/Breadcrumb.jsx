import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Breadcrumb.css';

function Breadcrumb({ productName, category }) {
  const location = useLocation();
  const pathname = location.pathname;

  let breadcrumbs = [{ label: 'Home', path: '/' }];

  if (pathname.includes('/browse')) {
    breadcrumbs.push({ label: 'Shop', path: '/browse' });
  } else if (pathname.includes('/product')) {
    breadcrumbs.push({ label: 'Shop', path: '/browse' });
    if (productName) {
      breadcrumbs.push({ label: productName, path: null, active: true });
    }
  } else if (pathname.includes('/wishlist')) {
    breadcrumbs.push({ label: 'Wishlist', path: '/wishlist', active: true });
  } else if (pathname.includes('/bag')) {
    breadcrumbs.push({ label: 'Cart', path: '/bag', active: true });
  } else if (pathname.includes('/account')) {
    breadcrumbs.push({ label: 'Account', path: '/account', active: true });
  } else if (pathname.includes('/our-story')) {
    breadcrumbs.push({ label: 'Our Story', path: '/our-story', active: true });
  } else if (pathname.includes('/reach-out')) {
    breadcrumbs.push({ label: 'Contact', path: '/reach-out', active: true });
  }

  return (
    <nav className="breadcrumb-nav">
      <div className="breadcrumb-container">
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="breadcrumb-item">
            {crumb.path && !crumb.active ? (
              <>
                <Link to={crumb.path} className="breadcrumb-link">
                  {crumb.label}
                </Link>
                {index < breadcrumbs.length - 1 && (
                  <span className="breadcrumb-separator">»</span>
                )}
              </>
            ) : (
              <>
                <span className={`breadcrumb-text ${crumb.active ? 'active' : ''}`}>
                  {crumb.label}
                </span>
                {index < breadcrumbs.length - 1 && (
                  <span className="breadcrumb-separator">»</span>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}

export default Breadcrumb;
