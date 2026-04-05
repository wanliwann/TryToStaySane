import { useSearchParams, Link } from 'react-router-dom'
import { menProducts, womenProducts } from '../data/products'
import './Shop.css'

function SearchResults() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  // Search in BOTH men and women products
  const allProducts = [...menProducts, ...womenProducts]
  
  const results = allProducts.filter(product => {
    const searchLower = query.toLowerCase()
    return (
      product.name.toLowerCase().includes(searchLower) ||
      product.brand.toLowerCase().includes(searchLower) ||
      product.description?.toLowerCase().includes(searchLower)
    )
  })

  // Group results by gender
  const menResults = results.filter(p => p.category === 'men')
  const womenResults = results.filter(p => p.category === 'women')

  return (
    <div className="shop-page">
      <div className="shop-page__header">
        <p className="eyebrow" style={{ textAlign: 'center' }}>Search Results</p>
        <h1 className="shop-page__title">
          {results.length > 0 ? `Found ${results.length} Products` : 'No Products Found'}
        </h1>
        <p className="shop-page__desc">
          {query && `Searching for: "${query}"`}
        </p>
      </div>

      {results.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ fontSize: '1.1rem', color: '#999' }}>
            No products found matching "{query}"
          </p>
          <p style={{ color: '#ccc', marginTop: '1rem' }}>
            Try searching with a brand name (e.g., "Dior") or fragrance type
          </p>
        </div>
      ) : (
        <>
          {/* Men's Results */}
          {menResults.length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{
                fontSize: '1.5rem',
                color: '#302418',
                marginBottom: '1.5rem',
                paddingLeft: '2rem',
                fontFamily: 'Cormorant Garamond, serif'
              }}>
                For Him ({menResults.length})
              </h2>
              <div className="shop-grid">
                {menResults.map((product) => (
                  <Link
                    to={`/product/${product.id}`}
                    key={product.id}
                    className="shop-card"
                  >
                    <div className="shop-card__image">
                      <img src={product.mainImage || product.image} alt={product.name} />
                      {product.tag && (
                        <span
                          className="shop-card__tag"
                          style={{ background: product.tagColor, color: product.tagTextColor }}
                        >
                          {product.tag}
                        </span>
                      )}
                    </div>
                    <div className="shop-card__info">
                      <p className="shop-card__brand">{product.brand}</p>
                      <h3 className="shop-card__name">{product.name}</h3>
                      <div className="shop-card__stars">
                        {'★ '.repeat(Math.floor(product.rating))}{'☆ '.repeat(5 - Math.floor(product.rating))}
                      </div>
                      <p className="shop-card__price">
                        From ${Math.min(...product.sizes.map(s => s.price))}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Women's Results */}
          {womenResults.length > 0 && (
            <div>
              <h2 style={{
                fontSize: '1.5rem',
                color: '#302418',
                marginBottom: '1.5rem',
                paddingLeft: '2rem',
                fontFamily: 'Cormorant Garamond, serif'
              }}>
                For Her ({womenResults.length})
              </h2>
              <div className="shop-grid">
                {womenResults.map((product) => (
                  <Link
                    to={`/product/${product.id}`}
                    key={product.id}
                    className="shop-card"
                  >
                    <div className="shop-card__image">
                      <img src={product.mainImage || product.image} alt={product.name} />
                    </div>
                    <div className="shop-card__info">
                      <p className="shop-card__brand">{product.brand}</p>
                      <h3 className="shop-card__name">{product.name}</h3>
                      <div className="shop-card__stars">
                        {'★ '.repeat(Math.floor(product.rating))}{'☆ '.repeat(5 - Math.floor(product.rating))}
                      </div>
                      <p className="shop-card__price">
                        From ${Math.min(...product.sizes.map(s => s.price))}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default SearchResults
