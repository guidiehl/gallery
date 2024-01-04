import './ShowMoreButton.css';

interface ShowMoreButtonProps {
  onClick: () => void;
}

export default function ShowMoreButton ({ onClick }: ShowMoreButtonProps) {
  return (
    <button onClick={onClick} className="show-more-button">
      Vedere di più
    </button>
  );
};
