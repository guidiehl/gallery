import { Photo } from "../../types/photo";
import PhotoItem from "../PhotoItem/PhotoItem";
import './PhotoGrid.css';

interface PhotoGridProps {
    photos: Photo[];
    onSave: (data: Photo) => void;
}


export default function PhotoGrid({ photos, onSave }: PhotoGridProps) {
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