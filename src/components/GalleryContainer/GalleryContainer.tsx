import { ChangeEvent, useState } from "react";
import PhotoGrid from "../PhotosGrid/PhotoGrid";
import SearchBar from "../SearchBar/SearchBar";
import { Photo } from "../../types/photo";
import ShowMoreButton from "../ShowMoreButton/ShowMoreButton";
import styles from './GalleryContainer.module.css';

/**
 * The GalleryContainer component is responsible for displaying a list of photos in a grid format.
 * It receives an array of photos as a prop and renders a PhotoGrid component with these photos.
 * It shows 20 photos at a time and allows users to load more photos by clicking a ShowMoreButton.
 * It renders a SearchBar component that allows users to search for photos by title, album or author.
 */
export default function GalleryContainer({ initialPhotos }: { initialPhotos: Photo[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [photos, setPhotos] = useState(initialPhotos);

    const photosPerPage = 20;
    const indexOfLastPhoto = currentPage * photosPerPage;
                
    const filteredPhotos = searchTerm != null 
        ? filterPhotos(photos,  searchTerm.toLowerCase()) 
        : initialPhotos;

    const currentPhotos = filteredPhotos.slice(0, indexOfLastPhoto);

    return (
        <>
            <SearchBar 
                data-testid="search-bar"
                onSearchChange ={(event: ChangeEvent<HTMLInputElement>) => {
                    setSearchTerm(event.target.value);
                }}
            />
            <PhotoGrid  
                data-testid="photo-grid"               
                photos={currentPhotos} 
                onSave={(updatedPhoto: Photo) => {
                    setPhotos(prevPhotos => prevPhotos.map(photo => 
                        photo.id === updatedPhoto.id ? updatedPhoto : photo
                    ));
                }}
            />            
            {               
            filteredPhotos.length > currentPhotos.length && 
                <ShowMoreButton 
                    data-testid="show-more-button"
                    onClick={() => setCurrentPage(prevPageNumber => prevPageNumber + 1)}
                    currentLength={currentPhotos.length}
                    filteredLength={filteredPhotos.length} 
                />               
            }
            
        </>
    );
}

function filterPhotos(photos: Photo[], searchTerm: string): Photo[] {
   return photos.filter((photo: Photo) => {
        return (
            photo.title.toLowerCase().includes(searchTerm) ||
            photo.albumTitle.toLowerCase().includes(searchTerm) ||
            photo.author.toLowerCase().includes(searchTerm)
        );
    })    
}