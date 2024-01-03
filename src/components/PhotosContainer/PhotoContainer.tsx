import Card from "../../basicComponents/Card/Card";
import { Photo } from "../../types/photo";

export default function PhotoContainer({ photos }: { photos: Photo[] }) {

    return <div className="photos-container"> {   
        photos.map((photo: Photo) => {
            return <Card>
                <div key={photo.id}>
                    <p>{photo.title}</p>
                    <p>{photo.albumTitle}</p>
                    <img src={photo.thumbnailUrl} alt={photo.title} />
                    <p>by {photo.username}</p>                            
                </div>
            </Card>;
        })
    }</div>
}