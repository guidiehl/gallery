import { useEffect } from "react";
import './AutoSizeTextArea.css';

/**
 * The AutoSizeTextArea component is a text area that automatically adjusts its size based on the content.
 * It receives the initial value and a callback function for handling changes as props.
 * The AutoSizeTextArea component uses a local state to keep track of the current value of the text area.
 * When the value changes, the component adjusts the size of the text area to fit the new content and calls the change handler with the new value.
 */

type AutoSizeTextAreaProps = {
    textAreaRef: React.RefObject<HTMLTextAreaElement>,
    title: string,
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
    isReadOnly?: boolean
}

export default function useAutoSizeTextArea({ textAreaRef, title, onChange, isReadOnly }: AutoSizeTextAreaProps) {
    
    // This useEffect hook is used to automatically adjust the height of a text area to fit its content.
    // it sets the height of the text area to the scrollHeight, 
    // effectively resizing the text area to fit its content.
    // If the scrollHeight is 0 it defaults to 36.    
    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "0px";

            const scrollHeight = textAreaRef.current.scrollHeight === 0 
                ? 36 
                : textAreaRef.current.scrollHeight;
    
            textAreaRef.current.style.height = scrollHeight + "px";
        } 
    }, [textAreaRef, title]);
      
    return <textarea 
        className="auto-size-text-area" 
        value={title} 
        onChange={onChange}
        rows={1}
        ref={textAreaRef}
        readOnly={isReadOnly}
    />
}