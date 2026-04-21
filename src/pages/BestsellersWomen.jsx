import { womenProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import './BestsellersMen.css';

const BestsellersWomen = () => {
  // Select 6 women's bestsellers
  const bestsellerIds = ['w16', 'w18', 'w23', 'w20', 'w26', 'w17'];
  const bestsellers = womenProducts.filter((p) => bestsellerIds.includes(p.id));

  return (
    <div className="bestsellers-men-page">
      {/* Hero Section */}
      <div className="bestsellers-hero">
        <h1 className="bestsellers-title">Women's Bestsellers</h1>
        <p className="bestsellers-subtitle">The most loved fragrances</p>
      </div>

      {/* Products Section */}
      <div className="bestsellers-container">
        <div className="products-grid">
          {bestsellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showHoverActions={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestsellersWomen;
