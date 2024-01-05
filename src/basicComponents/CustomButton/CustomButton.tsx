import './CustomButton.css';

interface ButtonProps {
    onClick: () => void;
    text: string;
    style?: React.CSSProperties;
}

export default function Button({ onClick, text, style }: ButtonProps) {
    return (
      <button 
        className="custom-button" 
        onClick={onClick}
        style={style}
      >
        {text}
      </button>
    );
  }