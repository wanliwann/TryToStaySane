import { useState } from 'react'
import Button from '../components/Button'

function Account() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isLogin) {
      alert(`Welcome back! Logging in as ${formData.email}`)
    } else {
      alert(`Account created for ${formData.name}!`)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '14px 18px',
    border: '1.5px solid var(--border)',
    borderRadius: '3px',
    fontSize: '14px',
    fontFamily: 'var(--font-body)',
    background: 'transparent',
    color: 'var(--text)',
    outline: 'none',
    marginBottom: '16px',
  }

  return (
    <div style={{ maxWidth: '440px', margin: '0 auto', padding: '72px 24px' }}>
      <p className="eyebrow" style={{ textAlign: 'center' }}>
        {isLogin ? 'Welcome Back' : 'Join Us'}
      </p>
      <h1 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '42px',
        fontWeight: 300,
        textAlign: 'center',
        margin: '16px 0 12px',
      }}>
        {isLogin ? (
          <>Sign <em style={{ color: 'var(--terra)' }}>In</em></>
        ) : (
          <>Create <em style={{ color: 'var(--terra)' }}>Account</em></>
        )}
      </h1>
      <p style={{
        fontSize: '14px',
        color: 'var(--faint)',
        textAlign: 'center',
        marginBottom: '40px',
        lineHeight: 1.7,
      }}>
        {isLogin
          ? 'Sign in to manage your orders and wishlist.'
          : 'Create an account to start your scent journey.'}
      </p>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            style={inputStyle}
            type="text"
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}
        <input
          style={inputStyle}
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          style={inputStyle}
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button variant="primary" style={{ width: '100%', textAlign: 'center' }}>
          {isLogin ? 'Sign In' : 'Create Account'}
        </Button>
      </form>

      <p style={{
        textAlign: 'center',
        marginTop: '24px',
        fontSize: '13px',
        color: 'var(--faint)',
      }}>
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <span
          onClick={() => setIsLogin(!isLogin)}
          style={{
            color: 'var(--terra)',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {isLogin ? 'Create one' : 'Sign in'}
        </span>
      </p>
    </div>
  )
}

export default Account
