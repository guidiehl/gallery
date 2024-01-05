import { Photo } from "../../types/photo";
import PhotoItem from "../PhotoItem/PhotoItem";
import './PhotoContainer.css';

interface PhotoContainerProps {
    photos: Photo[];
    onSave: (data: Photo) => void;
}


export default function PhotoContainer({ photos, onSave }: PhotoContainerProps) {
    return <div className="photos-container"> {   
        photos.map((photo: Photo) => {
            return <PhotoItem 
                key={photo.id} 
                photo={photo} 
                onSave={onSave}
            />
        })
    }</div>
}