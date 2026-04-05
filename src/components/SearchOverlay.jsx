import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SearchOverlay.css'

const trendingSearches = ['perfume', 'honey', 'golden hour', 'gift set', 'vanilla']

function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onClose()
      navigate(`/browse?search=${encodeURIComponent(query.trim())}`)
      setQuery('')
    }
  }

  const handleTrendingClick = (term) => {
    onClose()
    navigate(`/browse?search=${encodeURIComponent(term)}`)
    setQuery('')
  }

  if (!isOpen) return null

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-overlay__content" onClick={(e) => e.stopPropagation()}>
        <button className="search-overlay__close" onClick={onClose}>✕</button>

        <p className="search-overlay__label">Start Typing ...</p>

        <form onSubmit={handleSearch} className="search-overlay__form">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for scents, collections, gifts..."
            autoFocus
          />
          <button type="submit" className="search-overlay__submit">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
        </form>

        <div className="search-overlay__trending">
          <p className="search-overlay__trending-label">Trending searches:</p>
          <div className="search-overlay__tags">
            {trendingSearches.map((term) => (
              <button
                key={term}
                className="search-overlay__tag"
                onClick={() => handleTrendingClick(term)}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchOverlay
