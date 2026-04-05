import { useState } from 'react'
import Button from '../components/Button'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Thanks ${formData.name}! We received your message.`)
    setFormData({ name: '', email: '', subject: '', message: '' })
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
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: '72px 24px' }}>
      <p className="eyebrow" style={{ textAlign: 'center' }}>Get In Touch</p>
      <h1 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '42px',
        fontWeight: 300,
        textAlign: 'center',
        margin: '16px 0 12px',
      }}>
        Reach <em style={{ color: 'var(--terra)' }}>Out</em>
      </h1>
      <p style={{
        fontSize: '14px',
        color: 'var(--faint)',
        textAlign: 'center',
        marginBottom: '40px',
        lineHeight: 1.7,
      }}>
        Have a question, feedback, or just want to say hi? We'd love to hear from you.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          style={inputStyle}
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          style={inputStyle}
          type="email"
          name="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          style={inputStyle}
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />
        <textarea
          style={{ ...inputStyle, minHeight: '140px', resize: 'vertical' }}
          name="message"
          placeholder="Your message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <Button variant="primary" style={{ width: '100%', textAlign: 'center' }}>
          Send Message
        </Button>
      </form>
    </div>
  )
}

export default Contact
