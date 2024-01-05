
import GalleryContainer from "../GalleryContainer/GalleryContainer";
import Spinner from "../../basicComponents/Spinner/Spinner";
import ErrorText from "../../basicComponents/ErrorText/ErrorText";
import './Gallery.css';
import { useCustomQuery } from "../../utils";
import { Photo } from "../../types/photo";
import { Album } from "../../types/album";
import { User } from "../../types/user";

export default function Gallery() {
    
    const photoResponse = useCustomQuery<Photo>({url: 'https://jsonplaceholder.typicode.com/photos'});
    const albumsResponse = useCustomQuery<Album>({url: 'https://jsonplaceholder.typicode.com/albums'});
    const usersResponse = useCustomQuery<User>({url: 'https://jsonplaceholder.typicode.com/users'});

    let content: JSX.Element | null = null;

    const isError = photoResponse.isError || albumsResponse.isError || usersResponse.isError;
    const isPending = photoResponse.isPending || albumsResponse.isPending || usersResponse.isPending;
    const isSuccess = photoResponse.isSuccess && albumsResponse.isSuccess && usersResponse.isSuccess;

    switch (true) {
        case isError:
            content = <ErrorText error={ photoResponse.error ?? albumsResponse.error ?? usersResponse.error }/>;
            break;
        case isPending:             
            content = <Spinner/>;
            break;
        case isSuccess:
            content = <GalleryContainer 
                initialPhotos={photoResponse.data?.map((photo: Photo) => {

                    const album = albumsResponse.data?.find((album: Album) => album.id === photo.albumId);
                    const user = usersResponse.data?.find((user: User) => user.id === album?.userId);
                
                    return {
                        ...photo,
                        albumTitle: album?.title ?? 'Album non trovato',
                        author: user?.username ?? 'Utente non trovato',
                        authorEmail: user?.email ?? 'Email non trovata',
                        starRating: photo.rating ?? 0
                    }

                }) ?? []} 
            />;            
            break;
        default:
            content = <Spinner/>;
            break;
    }
      
    return (
      <div className="gallery-body">        
        <p className='gallery-title'>La Galeria</p>        
        {content}
      </div>
    );
}
