import { menProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import './BestsellersMen.css';

const BestsellersMen = () => {
  // Select 6 men's bestsellers
  const bestsellerIds = ['m10', 'm11', 'm13', 'm14', 'm15', 'm1'];
  const bestsellers = menProducts.filter((p) => bestsellerIds.includes(p.id));

  return (
    <div className="bestsellers-men-page">
      {/* Hero Section */}
      <div className="bestsellers-hero">
        <h1 className="bestsellers-title">Men's Bestsellers</h1>
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

export default BestsellersMen;
