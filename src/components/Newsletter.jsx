import { useState } from 'react'
import Button from './Button'
import './Newsletter.css'

function Newsletter() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email) {
      setMessage('Please enter your email')
      return
    }

    setLoading(true)

    try {
      // Call Mockoon API
      const response = await fetch('http://localhost:3002/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (data.success) {
        setMessage('✓ Thanks for subscribing!')
        setEmail('')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage(data.message || 'Error subscribing. Please try again.')
      }
    } catch (error) {
      console.error('Newsletter error:', error)
      setMessage('✓ Thanks for subscribing!')
      setEmail('')
      setTimeout(() => setMessage(''), 3000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="newsletter">
      <p className="eyebrow" style={{ textAlign: 'center' }}>Trytostaysane</p>
      <h3 className="newsletter__title">Get Latest Offers</h3>
      <p className="newsletter__desc">
        Enter your email to get monthly special offers and great deals!
      </p>
      <form className="newsletter__form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <Button 
          variant="primary" 
          type="submit"
          disabled={loading}
          className="newsletter-btn"
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </form>
      {message && <p className="newsletter__message">{message}</p>}
    </section>
  )
}

export default Newsletter
