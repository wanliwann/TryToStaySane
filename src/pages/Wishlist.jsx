import { Link } from 'react-router-dom'
import Button from '../components/Button'

function Wishlist({ wishlistItems = [] }) {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '72px 24px', textAlign: 'center' }}>
      {wishlistItems.length === 0 ? (
        <>
          {/* Empty wishlist - heart icon */}
          <div style={{ margin: '0 auto 24px' }}>
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#E8D8B8" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
            </svg>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '42px',
            fontWeight: 300,
            margin: '0 0 16px',
          }}>
            Your wishlist is currently <em style={{ color: 'var(--terra)' }}>empty</em>
          </h1>

          <p style={{
            fontSize: '14px',
            color: 'var(--faint)',
            marginBottom: '32px',
            lineHeight: 1.7,
            maxWidth: '400px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            You don't have any products in the list yet. You will find a lot of interesting products on our shop page.
          </p>

          <Link to="/browse">
            <Button variant="primary">Return to Shop</Button>
          </Link>
        </>
      ) : (
        <>
          <p className="eyebrow" style={{ textAlign: 'center' }}>Your Favorites</p>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '42px',
            fontWeight: 300,
            margin: '16px 0 32px',
          }}>
            Wishlist <em style={{ color: 'var(--terra)' }}>({wishlistItems.length})</em>
          </h1>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '20px',
            textAlign: 'left',
          }}>
            {wishlistItems.map((item) => (
              <div key={item.id} style={{
                background: 'var(--bg)',
                borderRadius: '10px',
                overflow: 'hidden',
                border: '1px solid var(--border)',
              }}>
                <div style={{
                  height: '180px',
                  background: 'var(--surface)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  color: 'var(--border)',
                  fontStyle: 'italic',
                }}>
                  {item.image ? <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : 'product photo'}
                </div>
                <div style={{ padding: '16px' }}>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', marginBottom: '4px' }}>{item.name}</h4>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--terra)' }}>${item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Wishlist
