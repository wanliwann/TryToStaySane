import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { menProducts, womenProducts } from '../data/products';
import './Browse.css';

const Browse = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('men');
  const [displayProducts, setDisplayProducts] = useState([]);

  // Read gender from URL parameter
  useEffect(() => {
    const genderParam = searchParams.get('gender');
    if (genderParam === 'women') {
      setActiveTab('women');
    } else if (genderParam === 'men') {
      setActiveTab('men');
    } else {
      // Default to men if no parameter
      setActiveTab('men');
    }
  }, [searchParams]);

  // Update displayed products when tab changes
  useEffect(() => {
    let products = [];
    if (activeTab === 'men') {
      products = menProducts || [];
    } else if (activeTab === 'women') {
      products = womenProducts || [];
    }
    setDisplayProducts(products);
  }, [activeTab]);

  const tabTitle = activeTab === 'men' ? "Men's Fragrances" : "Women's Fragrances";
  
  const tabCaption = activeTab === 'men' 
    ? "Men's perfumes often feature bold, distinctive scent notes. Many compositions rely on freshness, spicy accords, or warm woody depths. Common olfactory features include: Fresh & Green: Citrus, aromatic herbs, and aquatic notes add energy and dynamism."
    : "Women's perfumes feature diverse scent profiles ranging from fresh florals and crisp citrus to warm amber and sweet gourmand notes. Popular options include romantic roses, powdery feminine scents, earthy woods (sandalwood, cedar), and long-lasting musk.";

  return (
    <div className="browse-page">
      {/* Hero Section */}
      <div className="browse-hero">
        <h1 className="browse-title">Shop Fragrances</h1>
        <p className="browse-subtitle">Discover your signature scent</p>
      </div>

      {/* Tab Navigation */}
      <div className="browse-tabs">
        <button
          className={`tab-button ${activeTab === 'men' ? 'active' : ''}`}
          onClick={() => setActiveTab('men')}
        >
          For Men
        </button>
        <button
          className={`tab-button ${activeTab === 'women' ? 'active' : ''}`}
          onClick={() => setActiveTab('women')}
        >
          For Women
        </button>
      </div>

      {/* Products Section */}
      <div className="browse-container">
        <h2 className="section-title">{tabTitle}</h2>
        <p className="section-caption">{tabCaption}</p>
        
        {displayProducts && displayProducts.length > 0 ? (
          <div className="products-grid">
            {displayProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showHoverActions={true}
              />
            ))}
          </div>
        ) : (
          <div className="no-products">
            <p>No products found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
