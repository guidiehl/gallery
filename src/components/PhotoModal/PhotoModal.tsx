import { Photo } from "../../types/photo";
import Modal from "../../basicComponents/Modal/Modal";
import StarRating from "../StarRating/StartRating";
import {  useRef, useState } from "react";
import './PhotoModal.css';
import AutoSizeTextArea from "../../basicComponents/AutoSizeTextArea/AutoSizeTextArea";

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

    const handleSave = () => {
        onSave({ ...photo, title, rating });
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
                        onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
                            const val = evt.target?.value;
                    
                            setTitle(val);
                        }}
                    />
                    <span className="photo-modal-title">Album</span>
                    <span className="photo-modal-album">{photo.albumTitle}</span>
                </div>
            </div>
        </Modal>
    );
};

