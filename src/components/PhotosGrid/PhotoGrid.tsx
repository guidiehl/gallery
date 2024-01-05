import { Photo } from "../../types/photo";
import PhotoItem from "../PhotoItem/PhotoItem";
import './PhotoGrid.css';

/**
 * The PhotoGrid component is responsible for displaying a grid of photos.
 * It receives an array of photos and a callback function for saving a photo as props.
 * The PhotoGrid component maps over the array of photos and renders a PhotoItem component for each photo.
 * Each PhotoItem component receives a photo object and the save callback function as props.
 * The save callback function is called when a user updates the star rating of a photo.
 */

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