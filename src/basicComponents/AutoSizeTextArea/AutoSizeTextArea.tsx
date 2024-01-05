import { useEffect } from "react";
import './AutoSizeTextArea.css';

type AutoSizeTextAreaProps = {
    textAreaRef: React.RefObject<HTMLTextAreaElement>,
    title: string,
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
    isReadOnly?: boolean
}

export default function useAutoSizeTextArea({ textAreaRef, title, onChange, isReadOnly }: AutoSizeTextAreaProps) {
    
    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "0px";

            const scrollHeight = textAreaRef.current.scrollHeight === 0 ? 36 : textAreaRef.current.scrollHeight;
    
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