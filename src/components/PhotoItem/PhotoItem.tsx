import { useState } from "react";
import { Photo } from "../../types/photo";
import PhotoModal from "../PhotoModal/PhotoModal";
import './PhotoItem.css';

export default function PhotoItem({ photo }: { photo: Photo }) {
    const [isPhotoModalOpen, setPhotoModalOpen] = useState<boolean>(false);
    
    return (
        <>
            <div key={photo.id} onClick={() => { setPhotoModalOpen(true); }}>
                <img className="photo-item-image" src={photo.thumbnailUrl} alt={photo.title} />                            
            </div>

            <PhotoModal
                photo={photo}
                isOpen={isPhotoModalOpen}
                onSave={(data: Photo): void => { setPhotoModalOpen(false); }}
                onClose={() => { setPhotoModalOpen(false); }} 
            />
        </>
    )
    
    
}