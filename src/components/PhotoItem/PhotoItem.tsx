import { Photo } from "../../types/photo";
import './PhotoItem.css';

export default function PhotoItem({ photo }: { photo: Photo }) {

    return <div key={photo.id}>
        <img className="photo-item-image" src={photo.thumbnailUrl} alt={photo.title} />                             
    </div>
}