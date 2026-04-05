import React, { useState } from 'react';
import './RatingsDistribution.css';

function RatingsDistribution({ rating, reviewCount, ratingDistribution }) {
  const [isOpen, setIsOpen] = useState(false);

  const renderStars = (value) => {
    const stars = [];
    const fullStars = Math.floor(value);
    const hasHalfStar = value % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className="star full">
            ★
          </span>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} className="star half">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="star empty">
            ★
          </span>
        );
      }
    }
    return stars;
  };

  const getPercentage = (count) => {
    return reviewCount > 0 ? (count / reviewCount) * 100 : 0;
  };

  const totalReviews = reviewCount || 0;

  return (
    <div className="ratings-distribution">
      {/* Main Rating Display */}
      <div
        className="ratings-header"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
      >
        <div className="rating-main">
          <div className="rating-number">{rating.toFixed(1)}</div>
          <div className="rating-stars">{renderStars(rating)}</div>
          <div className="review-count">{totalReviews.toLocaleString()} Reviews</div>
        </div>
        <span className={`toggle-icon ${isOpen ? 'open' : ''}`}>▼</span>
      </div>

      {/* Expanded Ratings Breakdown */}
      {isOpen && (
        <div className="ratings-breakdown">
          <h3>RATINGS DISTRIBUTION</h3>
          <div className="breakdown-container">
            {[5, 4, 3, 2, 1].map((starCount) => {
              const count = ratingDistribution[starCount] || 0;
              const percentage = getPercentage(count);

              return (
                <div key={starCount} className="breakdown-row">
                  <div className="star-label">
                    {starCount} Star{starCount !== 1 ? 's' : ''}
                  </div>
                  <div className="bar-container">
                    <div className="bar-background">
                      <div
                        className="bar-fill"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="count-label">{count.toLocaleString()}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default RatingsDistribution;
