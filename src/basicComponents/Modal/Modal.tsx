import { useEffect, useRef, useState } from "react";
import styles from './Modal.module.css';

/**
 * The Modal receives the content to be displayed, a boolean indicating whether the modal is open, 
 * and a callback function for closing the modal as props.
 * The Modal component renders a modal window with the provided content when the modal is open.
 * The modal window includes a close button. When the close button is clicked, it calls the close callback function.
 */

interface ModalProps {
    setIsOpen: (isOpen: boolean) => void;
    children: React.ReactNode;
    style: React.CSSProperties;
};
  
export default function Modal ({ setIsOpen, children, style} : ModalProps) {
    return (
        <>
            <div className={styles['dark-background']} onClick={() => setIsOpen(false)} />
            <div className={styles['centered']}>
                    <div className={styles['modal']} style={style}>   
                        <span className={styles['modal-close']} onClick={() => setIsOpen(false)}/>            
                        {children}
                    </div>
            </div>                      
        </>
    );
  };