import { Photo } from "../../types/photo";
import Modal from "../../basicComponents/Modal/Modal";
import StarRating from "../StarRating/StartRating";
import {  useRef, useState } from "react";
import './PhotoModal.css';
import AutoSizeTextArea from "../../basicComponents/AutoSizeTextArea/AutoSizeTextArea";
import CustomButton from "../../basicComponents/CustomButton/CustomButton";

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
    const [isReadOnly, setIsReadOnly] = useState(false);

    const handleSave = () => {
        onSave({ ...photo, title, rating });
    };

    const toggleReadOnly = () => {
        setIsReadOnly(!isReadOnly);
    };
    
    return (
        <Modal hasCloseBtn={true} isOpen={isOpen} onClose={onClose} style={customModalStyle}>
            <div className="photo-modal-container">
                <img className="photo-modal-image" src={photo.url} alt={photo.title} />
                <div className="photo-modal-data-container">
                    <div className="photo-modal-top-row">
                        <div style={{ flex: 1 }}>
                            <span className="photo-modal-user">by {photo.username}</span>
                            <span className="photo-modal-email">{photo.userEmail}</span>
                        </div>
                        <StarRating rating={rating} onRatingChange={setRating} />
                    </div>
              
                    <span className="photo-modal-title">Titolo</span>
             
                    <AutoSizeTextArea 
                        title={title} 
                        textAreaRef={textAreaRef}
                        isReadOnly={isReadOnly}
                        onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
                            const val = evt.target?.value;
                    
                            setTitle(val);
                        }}
                    />
                    <span className="photo-modal-title">Album</span>  
                    <span className="edit"><a href="#non">Edit</a></span>
                    <span className="photo-modal-album">{photo.albumTitle}</span>
                    <div className="photo-modal-buttons-container">
                        <CustomButton style={{ marginRight: 8 }} onClick={toggleReadOnly} text="Modifica Titolo" />
                        <CustomButton  onClick={handleSave} text="Salva"/>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

