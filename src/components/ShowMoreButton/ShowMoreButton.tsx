import styles from './ShowMoreButton.module.css';

/**
 * The ShowMoreButton component is responsible for providing a user interface to load more photos.
 * It renders a button that, when clicked, triggers a callback function received as a prop.
 */

interface ShowMoreButtonProps {
  onClick: () => void;
  currentLength: number;
  filteredLength: number;
}

export default function ShowMoreButton ({ onClick, currentLength, filteredLength }: ShowMoreButtonProps) {
  return (
    <>   
      <p className={styles["show-more-text"]}>{currentLength} di {filteredLength}</p>
      <button data-testid="show-more-button" onClick={onClick} className={styles["show-more-button"]}>
        Vedere di più
      </button>
    </>
  );
};
