import { Photo } from "../../types/photo";
import PhotoItem from "../PhotoItem/PhotoItem";
import './PhotoContainer.css';

export default function PhotoContainer({ photos }: { photos: Photo[] }) {
    return <div className="photos-container"> {   
        photos.map((photo: Photo) => {
            return <PhotoItem key={photo.id} photo={photo}/>
        })
    }</div>
}