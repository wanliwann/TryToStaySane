import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Contact.css'

function Contact() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const subjectOptions = [
    { value: '', label: 'Select a subject' },
    { value: 'ask-questions', label: 'Ask Questions' },
    { value: 'report-issues', label: 'Report Issues' },
    { value: 'general-feedback', label: 'General Feedback/Inquiries' },
    { value: 'product-review', label: 'Product Reviews' },
  ]

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill in all fields')
      return
    }

    setLoading(true)

    try {
      const selectedOption = subjectOptions.find(opt => opt.value === formData.subject)
      const subjectLabel = selectedOption ? selectedOption.label : formData.subject

      // Call Mockoon API
      const response = await fetch('http://localhost:3002/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: subjectLabel,
          message: formData.message,
        }),
      })

      const data = await response.json()

      if (data.success || response.ok) {
        // Save to localStorage with correct category
        const newItem = {
          id: data.messageId || Date.now(),
          name: formData.name,
          email: formData.email,
          subject: subjectLabel,
          message: formData.message,
          timestamp: new Date().toISOString(),
        }

        // Determine if feedback or message
        if (formData.subject === 'general-feedback') {
          // Save to FEEDBACK
          const userFeedback = JSON.parse(localStorage.getItem('userFeedback') || '[]')
          userFeedback.push(newItem)
          localStorage.setItem('userFeedback', JSON.stringify(userFeedback))
          console.log('✓ Feedback saved:', newItem)
        } else {
          // Save to MESSAGES (for questions, issues, reviews)
          const userMessages = JSON.parse(localStorage.getItem('userMessages') || '[]')
          userMessages.push(newItem)
          localStorage.setItem('userMessages', JSON.stringify(userMessages))
          console.log('✓ Message saved:', newItem)
        }

        setFormData({ name: '', email: '', subject: '', message: '' })
        navigate('/contact-confirmation')
      } else {
        alert(data.message || 'Error sending message')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      
      // Fallback to localStorage
      const newItem = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        subject: subjectOptions.find(opt => opt.value === formData.subject)?.label || formData.subject,
        message: formData.message,
        timestamp: new Date().toISOString(),
      }

      if (formData.subject === 'general-feedback') {
        const userFeedback = JSON.parse(localStorage.getItem('userFeedback') || '[]')
        userFeedback.push(newItem)
        localStorage.setItem('userFeedback', JSON.stringify(userFeedback))
      } else {
        const userMessages = JSON.parse(localStorage.getItem('userMessages') || '[]')
        userMessages.push(newItem)
        localStorage.setItem('userMessages', JSON.stringify(userMessages))
      }
      
      setFormData({ name: '', email: '', subject: '', message: '' })
      navigate('/contact-confirmation')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="contact-page">
      {/* Form Section */}
      <div className="contact-form-section">
        <div className="contact-form-container">
          <p className="contact-form__eyebrow">Get In Touch</p>
          <h2 className="contact-form__title">
            Reach <em>Out</em>
          </h2>
          <p className="contact-form__desc">
            Have a question, feedback, or just want to help from you. We'd love to hear from you.
          </p>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="contact-form__row">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              disabled={loading}
            >
              {subjectOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <textarea
              name="message"
              placeholder="Your message"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={loading}
            />

            <button type="submit" className="contact-form__button" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
