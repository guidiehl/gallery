import { useState } from "react";
import { Photo } from "../../types/photo";
import PhotoModal from "../PhotoModal/PhotoModal";
import './PhotoItem.css';

interface PhotoItemProps {
    photo: Photo;
    onSave: (data: Photo) => void;
}

export default function PhotoItem({ photo, onSave }: PhotoItemProps) {
    const [isPhotoModalOpen, setPhotoModalOpen] = useState<boolean>(false);
    
    return (
        <>
            <div 
                className="photo-item-container"
                onClick={() => { 
                    console.log('PhotoItem onClick')
                    setPhotoModalOpen(true); 
                }}
            >
                <img className="photo-item-image" src={photo.thumbnailUrl} alt={photo.title} />
                <div>
                    <div className="photo-item-title">{photo.title}</div>
                    <div className="photo-item-subtitle">
                        da <span className="data">{photo.author}</span>, album <span className="data">{photo.albumTitle}</span>
                    </div>
                </div>
            </div>

            <PhotoModal
                photo={photo}
                isOpen={isPhotoModalOpen}
                onSave={(data: Photo): void => { 
                    setPhotoModalOpen(false);
                    onSave(data); 
                }}
                onClose={() => { setPhotoModalOpen(false); }} 
            />
        </>
    )
    
    
}