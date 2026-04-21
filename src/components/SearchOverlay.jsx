import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { menProducts, womenProducts } from '../data/products'
import './SearchOverlay.css'

const defaultTrendingSearches = ['For Him', 'For Her', 'Dior', 'Chanel', 'Bleu de Chanel']

function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [searchHistory, setSearchHistory] = useState([])
  const navigate = useNavigate()

  // Load search history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('searchHistory')
    if (saved) {
      setSearchHistory(JSON.parse(saved))
    }
  }, [])

  // Search through all products
  const allProducts = [...menProducts, ...womenProducts]
  const searchResults = query.trim().length > 0
    ? allProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : []

  // Save search to history
  const saveToHistory = (searchTerm) => {
    if (!searchTerm.trim()) return

    const updated = [searchTerm, ...searchHistory.filter(item => item !== searchTerm)].slice(0, 10)
    setSearchHistory(updated)
    localStorage.setItem('searchHistory', JSON.stringify(updated))
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      saveToHistory(query.trim())
      onClose()
      navigate(`/browse?search=${encodeURIComponent(query.trim())}`)
      setQuery('')
    }
  }

  const handleSearchClick = (term) => {
    saveToHistory(term)
    onClose()
    navigate(`/browse?search=${encodeURIComponent(term)}`)
    setQuery('')
  }

  // Go to product detail page
  const handleProductClick = (productId) => {
    onClose()
    setQuery('')
    navigate(`/product/${productId}`)
  }

  // Clear search history
  const handleClearHistory = () => {
    setSearchHistory([])
    localStorage.removeItem('searchHistory')
  }

  // Combine search history with trending searches (no duplicates)
  const allSearchSuggestions = [
    ...searchHistory,
    ...defaultTrendingSearches.filter(trend => !searchHistory.includes(trend))
  ]

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

        {/* SEARCH RESULTS */}
        {searchResults.length > 0 && (
          <div className="search-results">
            <p className="search-results__label">Results ({searchResults.length})</p>
            <div className="search-results__grid">
              {searchResults.map((product) => (
                <button
                  key={product.id}
                  className="search-result-card"
                  onClick={() => handleProductClick(product.id)}
                  type="button"
                >
                  <div className="search-result-card__image">
                    <img 
                      src={product.mainImage || product.image} 
                      alt={product.name}
                    />
                  </div>
                  <div className="search-result-card__info">
                    <p className="search-result-card__brand">{product.brand}</p>
                    <h4 className="search-result-card__name">{product.name}</h4>
                    <p className="search-result-card__price">
                      From ${Math.min(...product.sizes.map(s => s.price))}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TRENDING + HISTORY SEARCHES - Only show when no query */}
        {query.trim().length === 0 && (
          <div className="search-overlay__trending">
            <div className="search-overlay__trending-header">
              <p className="search-overlay__trending-label">
                {searchHistory.length > 0 ? 'Search History & Trending:' : 'Trending searches:'}
              </p>
              {searchHistory.length > 0 && (
                <button 
                  className="search-overlay__clear-btn"
                  onClick={handleClearHistory}
                  type="button"
                  title="Clear search history"
                >
                  Clear All
                </button>
              )}
            </div>
            <div className="search-overlay__tags">
              {allSearchSuggestions.map((term) => (
                <button
                  key={term}
                  className={`search-overlay__tag ${searchHistory.includes(term) ? 'is-history' : ''}`}
                  onClick={() => handleSearchClick(term)}
                  type="button"
                  title={searchHistory.includes(term) ? 'From your history' : 'Trending'}
                >
                  {searchHistory.includes(term) && <span className="history-icon">⏱</span>}
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchOverlay
