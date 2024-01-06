
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

function Star({ filled, testId, id }: { filled: boolean, testId?: string, id?: string }) {
  return <span id={id} data-testid={testId} style={{ fontSize: '24px' }}>{filled ? '★' : '☆'}</span>;
}

export default function StarRating({ rating, onRatingChange }: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5];

  const handleStarClick = (star: number, isHalf: boolean) => {
    onRatingChange(isHalf ? star - 0.5 : star);
  };
  
  return (
      <div>{
          stars.map((star) => {
            // The first child div represents the top star, 
            // it shows up when you click at the left half and shows a half filled star.
            // The second child div represents the bottom star, it can be filled or empty, depending on the rating.
            // The 'filled' prop is determined by comparing the current rating with the star number.
            // This allows for half-star ratings.
            return (
                <div key={star} style={{ display: 'inline-block', position: 'relative', cursor: 'pointer' }}>          
                    <div
                        style={{ position: 'absolute', width: '50%', overflow: 'hidden' }}
                        onClick={() => handleStarClick(star, true)}
                    >
                        <Star id={"star-top" + star} testId="top" filled={rating >= star - 0.5} />
                    </div>
                    <div onClick={() => handleStarClick(star, false)}>
                        <Star id={"star-bottom" + star} testId="bottom" filled={rating >= star} />
                    </div>
                </div>
            );
          })
      }</div>
  );
}

