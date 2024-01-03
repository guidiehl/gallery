import { useQuery } from "@tanstack/react-query";
import { Photo } from "../../types/photo";
import { Album } from "../../types/album";
import { User } from "../../types/user";
import './Gallery.css';
import PhotoContainer from "../PhotosContainer/PhotoContainer";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";

/* Gallery Component, shows list of photo item cards filtered through top search bar */
export default function Gallery() {
    
    let photos: Photo[] = [];
    let albums: Album[] = [];
    let users: User[] = [];

    const [filteredPhotos, setFilteredPhotos] = useState(photos);

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
        queryKey: ['albums'], 
        queryFn: async (): Promise<Album[]> => {
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/albums');
    
                const data: Album[] = await res.json();
                
                return data;
            } catch (error) {
                console.log(error);
    
                throw new Error('Error fetching albums');
            }
    
        } 
    })

    const usersResponse = useQuery<User[] | null>({ 
        queryKey: ['users'], 
        queryFn: async (): Promise<User[]> => {
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/users');
    
                const data: User[] = await res.json();
                
                return data;
            } catch (error) {
                console.log(error);
    
                throw new Error('Error fetching users');
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

            if (albumsResponse.data != null) {
                albums = albumsResponse.data;
            }

            if (usersResponse.data != null) {
                users = usersResponse.data;
            }

            photos = photos.map((photo: Photo) => {

                const album = albums.find((album: Album) => album.id === photo.albumId);
                const user = users.find((user: User) => user.id === album?.userId);
            
                return {
                    ...photo,
                    albumTitle: album?.title ?? 'Album non trovato',
                    username: user?.username ?? 'Utente non trovato'
                }

            });

            content = (
                <>             
                    <SearchBar 
                        onSearch={(searchTerm: string) => {
                            const lowercasedSearchTerm = searchTerm.toLowerCase();
                          
                            const newFilteredPhotos = searchTerm != null ? photos.filter((photo: Photo) => {
                              return (
                                photo.title.toLowerCase().includes(lowercasedSearchTerm) ||
                                photo.albumTitle.toLowerCase().includes(lowercasedSearchTerm) ||
                                photo.username.toLowerCase().includes(lowercasedSearchTerm)
                              );
                            }) : photos;

                            setFilteredPhotos(newFilteredPhotos);
                        }}
                    />
                    <PhotoContainer photos={filteredPhotos}/>
                </>
            ) 
            
            break;
        default:
            content = <div>Loading...</div>
            break;
    }
      
    return (
      <div className="gallery-container">        
        <p className='gallery-title'>La Galeria</p>        
        {content}
      </div>
    );
}
