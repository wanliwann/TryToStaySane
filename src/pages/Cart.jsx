import { Link } from 'react-router-dom'
import Button from '../components/Button'

function Cart() {
  return (
    <div style={{
      maxWidth: '640px',
      margin: '0 auto',
      padding: '72px 24px',
      textAlign: 'center',
    }}>
      <p className="eyebrow">Your Bag</p>
      <h1 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '42px',
        fontWeight: 300,
        margin: '16px 0 16px',
      }}>
        Your Bag Is <em style={{ color: 'var(--terra)' }}>Empty</em>
      </h1>
      <p style={{
        fontSize: '14px',
        color: 'var(--faint)',
        marginBottom: '32px',
        lineHeight: 1.7,
      }}>
        Looks like you haven't added any scents yet. Let's fix that.
      </p>
      <Link to="/browse">
        <Button variant="primary">Browse Scents</Button>
      </Link>
    </div>
  )
}

export default Cart
