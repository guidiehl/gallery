import { useQuery } from "@tanstack/react-query";
import { Photo } from "../../types/photo";
import { Album } from "../../types/album";
import { User } from "../../types/user";
import './Gallery.css';

/* Gallery Component, shows list of photo item cards filtered through top search bar */
export default function Gallery() {
    let photos: Photo[] = [];
    let albums: Album[] = [];
    let users: User[] = [];

    const photoResponse = useQuery<Photo[] | null>({ 
        queryKey: ['photos'], 
        queryFn: async (): Promise<Photo[]> => {
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/photos');
    
                const data: Photo[] = await res.json();
                
                return data;
            } catch (error) {
                console.log(error);
    
                throw new Error('Error fetching photos');
            }
    
        } 
    })

    const albumsResponse = useQuery<Album[] | null>({ 
        queryKey: ['photos'], 
        queryFn: async (): Promise<Album[]> => {
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/photos');
    
                const data: Album[] = await res.json();
                
                return data;
            } catch (error) {
                console.log(error);
    
                throw new Error('Error fetching photos');
            }
    
        } 
    })

    const usersResponse = useQuery<User[] | null>({ 
        queryKey: ['photos'], 
        queryFn: async (): Promise<User[]> => {
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/photos');
    
                const data: User[] = await res.json();
                
                return data;
            } catch (error) {
                console.log(error);
    
                throw new Error('Error fetching photos');
            }
    
        } 
    })

    const isPending = photoResponse.isPending || photoResponse.isPending || photoResponse.isPending;
    const isError = albumsResponse.isError || albumsResponse.isError || albumsResponse.isError;
    const isSuccess = usersResponse.isSuccess && usersResponse.isSuccess && usersResponse.isSuccess;

    let content: JSX.Element | null = null;

    switch (true) {
        case isPending:
            photos = [];
            content = <div>Loading...</div>;
            break;
        case isError:
            photos = [];
            content = <div>Error fetching data</div>
            break;
        case isSuccess:
            if(photoResponse.data != null) {
                photos = photoResponse.data;                
            }

            content = <div className="gallery">
                {
                    photos.map((photo: Photo) => (
                        <div key={photo.id}>
                            <p>{photo.title}</p>
                            <p>album</p>
                            <img src={photo.thumbnailUrl} alt={photo.title} />
                            <p>user</p>
                            
                        </div>
                    ))
                }
            </div>
            
              break;
        default:
            content = <div>Loading...</div>
            break;
    }

    
  
    return (
      <div>
        <h1>Gallery</h1>
        <div>{content}</div>
      </div>
    );
}