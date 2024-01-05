
import GalleryContainer from "../GalleryContainer/GalleryContainer";
import Spinner from "../../basicComponents/Spinner/Spinner";
import ErrorText from "../../basicComponents/ErrorText/ErrorText";
import './Gallery.css';
import { useCustomQuery } from "../../utils";
import { Photo } from "../../types/photo";
import { Album } from "../../types/album";
import { User } from "../../types/user";

/**
 * The Gallery component is responsible for fetching and displaying a list of photos.
 * It fetches data from three different endpoints: photos, albums, and users.
 * It uses the custom hook `useCustomQuery` to fetch the data from these endpoints.
 * The fetched data is then passed to the `GalleryContainer` component for display.
 * If any of the requests result in an error, the `ErrorText` component is rendered with the error message.
 * If any of the requests are still pending, the `Spinner` component is rendered to indicate loading state.
 * If all the requests are successful, the `GalleryContainer` component is rendered with the photos data.
 */
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
                // added random sort to make the gallery more interesting
                }).sort(() => Math.random() - 0.5) ?? []} 
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
