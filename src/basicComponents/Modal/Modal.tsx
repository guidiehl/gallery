import { useEffect, useRef, useState } from "react";
import './Modal.css';

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