import { useState } from 'react'
import Button from './Button'
import './Newsletter.css'

function Newsletter() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      alert(`Thanks for subscribing, ${email}!`)
      setEmail('')
    }
  }

  return (
    <section className="newsletter">
      <p className="eyebrow" style={{ textAlign: 'center' }}>Stay Connected</p>
      <h3 className="newsletter__title">Golden Updates</h3>
      <p className="newsletter__desc">
        Warm launches, seasonal picks, and exclusive deals — right to your inbox.
      </p>
      <form className="newsletter__form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button variant="primary" type="submit">Join Us</Button>
      </form>
    </section>
  )
}

export default Newsletter
