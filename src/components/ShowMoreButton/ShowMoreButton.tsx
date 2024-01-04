import './ShowMoreButton.css';

interface ShowMoreButtonProps {
  onClick: () => void;
  currentLength: number;
  filteredLength: number;
}

export default function ShowMoreButton ({ onClick, currentLength, filteredLength }: ShowMoreButtonProps) {
  return (
    <>
   
      <p className="show-more-text">{currentLength} di {filteredLength}</p>
      <button onClick={onClick} className="show-more-button">
        Vedere di più
      </button>
    </>
  );
};
