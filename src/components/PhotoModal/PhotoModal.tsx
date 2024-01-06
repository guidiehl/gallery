import { Photo } from "../../types/photo";
import Modal from "../../basicComponents/Modal/Modal";
import StarRating from "../StarRating/StartRating";
import {  useEffect, useRef, useState } from "react";
import AutoSizeTextArea from "../../basicComponents/AutoSizeTextArea/AutoSizeTextArea";
import CustomButton from "../../basicComponents/CustomButton/CustomButton";
import styles from './PhotoModal.module.css';

/**
 * The PhotoModal component is responsible for displaying a larger version of a photo in a modal.
 * It receives a photo object and a boolean indicating whether the modal is open as props.
 * The modal can be closed by clicking on a close button. When the modal is closed, it resets the title and rating to their initial values.
 * The PhotoModal component renders the photo's image, author, author's email, and a star rating.
 * The star rating can be updated by clicking on the stars. The new rating is stored in the component's state.
 */
interface PhotoModalProps {
    photo: Photo;
    isOpen: boolean;
    onSave: (data: Photo) => void;
    onClose: () => void;
}

const customModalStyle: React.CSSProperties = {
    padding: 0,
    maxWidth: 448,
}

export default function PhotoModal({ onSave, onClose, photo, isOpen } : PhotoModalProps)  {

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const [title, setTitle] = useState(photo.title);
    const [rating, setRating] = useState(photo.rating);
    const [isReadOnly, setIsReadOnly] = useState(true);


   
    useEffect(() => {
        // This useEffect hook is used to manage the focus and content of a text area when it becomes editable.
        // It runs every time the isReadOnly or title changes.
        // If the text area is not read-only and the textAreaRef is currently pointing to an element,
        // it first focuses the text area.
        // Then, it clears the content of the text area and sets it to the current title.
        
        if (!isReadOnly && textAreaRef.current) {
            const textarea = textAreaRef.current;
            textarea.focus();
            textarea.value = '';
            textarea.value = title;
        }
      }, [isReadOnly, title]);
    
    return (
        <Modal 
            hasCloseBtn={true} 
            isOpen={isOpen} 
            onClose={() => {
                setIsReadOnly(false);   
                setTitle(photo.title);
                setRating(photo.rating);
                onClose();                
            }} 
            style={customModalStyle}
            >
            <div className={styles["photo-modal-container"]}>
                <img className={styles["photo-modal-image"]} src={photo.url} alt={photo.title} />
                <div className={styles["photo-modal-data-container"]}>
                    <div className={styles["photo-modal-top-row"]}>
                        <div style={{ flex: 1 }}>
                            <span className={styles["photo-modal-user"]}>da {photo.author}</span>
                            <span className={styles["photo-modal-email"]}>{photo.authorEmail}</span>
                        </div>
                        <StarRating rating={rating} onRatingChange={setRating} />
                    </div>
              
                    <span className={styles["photo-modal-title"]}>Titolo</span>
             
                    <AutoSizeTextArea 
                        title={title} 
                        textAreaRef={textAreaRef}
                        isReadOnly={isReadOnly}
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {                                    
                            setTitle(event.target?.value);
                        }}
                    />
                    <span className={styles["photo-modal-title"]}>Album</span>  
                    <span className={styles["photo-modal-album"]}>{photo.albumTitle}</span>
                    <div className={styles["photo-modal-buttons-container"]}>
                        <CustomButton 
                            data-testid="edit-button"
                            style={{ marginRight: 8, backgroundColor: '#505050',  }} 
                            onClick={() => { setIsReadOnly(!isReadOnly); }} 
                            text="Modifica Titolo" 
                        />
                        <CustomButton  
                            data-testid="save-button"
                            onClick={() => {                             
                                setIsReadOnly(false);                                                           
                                onSave({ ...photo, title, rating });
                                onClose();
                            }} 
                            text="Salva"
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
};

 
