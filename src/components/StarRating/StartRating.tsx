
/**
 * The StarRating component is responsible for displaying and updating a star rating.
 * It receives the current rating and a callback function for updating the rating as props.
 * The StarRating component renders a series of star icons. The number of filled stars corresponds to the current rating.
 * Users can click on the stars to update the rating. When a star is clicked, the callback function is called with the new rating.
 */
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
        // The first child div represents the left half of the star, 
        // it has a click handler that calls handleStarClick with the current star number and a flag indicating it's the left half.
        // The second child div represents the right half of the star and has a similar click handler but with the flag indicating it's the right half.
        // The 'filled' prop is determined by comparing the current rating with the star number (or star number - 0.5 for the left half).
        // This allows for half-star ratings.
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

