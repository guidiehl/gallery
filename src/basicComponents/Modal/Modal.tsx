import { useEffect, useRef, useState } from "react";
import './Modal.css';

/**
 * The Modal receives the content to be displayed, a boolean indicating whether the modal is open, 
 * and a callback function for closing the modal as props.
 * The Modal component renders a modal window with the provided content when the modal is open.
 * The modal window includes a close button. When the close button is clicked, it calls the close callback function.
 */

interface ModalProps {
    isOpen: boolean;
    hasCloseBtn?: boolean;
    onClose?: () => void;
    children: React.ReactNode;
    style?: React.CSSProperties;
};
  
export default function Modal ({ isOpen, hasCloseBtn = true, onClose, style, children} : ModalProps) {
    const [isModalOpen, setModalOpen] = useState(isOpen);
    
    const modalRef = useRef<HTMLDialogElement | null>(null);
  
    const handleCloseModal = () => {
        if (onClose) {
          onClose();
        }
        setModalOpen(false);
    };
    
    useEffect(() => {
        setModalOpen(isOpen);
    }, [isOpen]);
  
    useEffect(() => {
        const modalElement = modalRef.current;
  
        if (modalElement) {
            if (isModalOpen) {
              modalElement.showModal();
            } else {
              modalElement.close();
            }
        }
    }, [isModalOpen]);
  

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
        if (event.key === "Escape") {
            handleCloseModal();
        }
    };

    return (
        <dialog ref={modalRef} onKeyDown={handleKeyDown} className="modal" style={style}>
            { hasCloseBtn && (<span className="modal-close" onClick={handleCloseModal}/>)}
            {children}
        </dialog>
    );
  };