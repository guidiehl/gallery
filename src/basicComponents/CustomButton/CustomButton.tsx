import styles from './CustomButton.module.css';
/**
 * The Button component is a reusable button component that can be used throughout the application.
 * It receives a label, a click handler, and optionally additional styles as props.
 * The Button component renders a button element with the provided label.
 * When the button is clicked, it calls the click handler.
 * If additional styles are provided, they are applied to the button element.
 */
interface ButtonProps {
    onClick: () => void;
    text: string;
    style?: React.CSSProperties;
}

export default function Button({ onClick, text, style }: ButtonProps) {
    return (
      <button 
        className={styles["custom-button"]}
        onClick={onClick}
        style={style}
      >
        {text}
      </button>
    );
  }