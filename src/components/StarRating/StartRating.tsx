
interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

function Star({ filled }: { filled: boolean }) {
  return <span style={{ fontSize: '24px' }}>{filled ? '★' : '☆'}</span>;
}

export default function StarRating({ rating, onRatingChange }: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5];

  const handleStarClick = (star: number, isHalf: boolean) => {
    onRatingChange(isHalf ? star - 0.5 : star);
  };

  return (
    <div>
      {stars.map(star => (
        <div key={star} className="star-rating-container">
          <div
            className="star-rating-half-star"
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

