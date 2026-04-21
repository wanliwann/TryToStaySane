import { Link } from 'react-router-dom';
import forHimImg from '/for-him.jpg';
import forHerImg from '/for-her.jpg';
import './Categories.css';

const Categories = () => {
  return (
    <section className="categories-section">
      <div className="categories-container">
        {/* Section Header */}
        <div className="categories-header">
          <h2 className="categories-title">Shop By Mood</h2>
          <p className="categories-subtitle">
            Whether bold or gentle — we've got your vibe covered.
          </p>
        </div>

        {/* Category Cards */}
        <div className="categories-grid">
          {/* FOR HIM */}
          <Link 
            to="/browse?gender=men" 
            className="category-card for-him"
            style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${forHimImg})` }}
          >
            <div className="category-content">
              <h3 className="category-name">For Him</h3>
              <p className="category-desc">Timeless, refined, iconic</p>
              <span className="category-cta">EXPLORE →</span>
            </div>
          </Link>

          {/* FOR HER */}
          <Link 
            to="/browse?gender=women" 
            className="category-card for-her"
            style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${forHerImg})` }}
          >
            <div className="category-content">
              <h3 className="category-name">For Her</h3>
              <p className="category-desc">Flowers, woods, exotic</p>
              <span className="category-cta">EXPLORE →</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories;
