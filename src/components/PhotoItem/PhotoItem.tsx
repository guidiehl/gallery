import { useState } from "react";
import { Photo } from "../../types/photo";
import PhotoModal from "../PhotoModal/PhotoModal";
import styles from './PhotoItem.module.css';

/**
 * The PhotoItem component is responsible for displaying a single photo.
 * It receives a photo object as a prop and renders the photo's thumbnail, title, and author.
 * The PhotoItem component also manages a modal that can be opened by clicking on the photo.
 */

interface PhotoItemProps {
    photo: Photo;
    onSave: (data: Photo) => void;
}

export default function PhotoItem({ photo, onSave }: PhotoItemProps) {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <>
            <div 
                data-testid="photo-item"
                className={styles["photo-item-container"]}
                onClick={() => { 
                    console.log('PhotoItem onClick')
                    setIsOpen(true); 
                }}
            >
                <img className={styles["photo-item-image"]}
                 src={photo.thumbnailUrl} alt={photo.title} />
                <div>
                    <div className={styles["photo-item-title"]}>{photo.title}</div>
                    <div className={styles["photo-item-subtitle"]}>
                        da <span className={styles["data"]}>{photo.author}</span>, 
                        album <span className={styles["data"]}>{photo.albumTitle}</span>
                    </div>
                </div>
            </div>

            {
            isOpen && <PhotoModal
                photo={photo}
                setIsOpen={setIsOpen}
                onSave={(data: Photo): void => { 
                    onSave(data); 
                    setIsOpen(false);
                }}
            />
            }
        </>
    )
    
    
}