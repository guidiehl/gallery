
import React from 'react';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

export default function StarRating({ rating, onRatingChange }: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5];

  const handleStarClick = (star: number, isHalf: boolean) => {
    console.log('star', star, 'isHalf', isHalf );
    onRatingChange(isHalf ? star - 0.5 : star);
  };

  return (
    <div>
      {stars.map(star => (
        <div key={star} style={{ display: 'inline-block', position: 'relative', cursor: 'pointer' }}>
          <div
            style={{ position: 'absolute', width: '50%', overflow: 'hidden' }}
            onClick={() => handleStarClick(star, true)}
          >
            <Star filled={rating >= star - 0.5} />
          </div>
          <div onClick={() => handleStarClick(star, false)}>
            <Star filled={rating >= star} />
          </div>
        </div>
      ))}
    </div>
  );
}

function Star({ filled }: { filled: boolean }) {
  return <span style={{ fontSize: '24px' }}>{filled ? '★' : '☆'}</span>;
}