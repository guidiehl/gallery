import { ChangeEvent, useState } from "react";
import PhotoGrid from "../PhotosGrid/PhotoGrid";
import SearchBar from "../SearchBar/SearchBar";
import { Photo } from "../../types/photo";
import ShowMoreButton from "../ShowMoreButton/ShowMoreButton";
import './GalleryContainer.css';

export default function GalleryContainer({ initialPhotos }: { initialPhotos: Photo[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [photos, setPhotos] = useState(initialPhotos);

    const photosPerPage = 20;
    const indexOfLastPhoto = currentPage * photosPerPage;

    const lowercasedSearchTerm = searchTerm.toLowerCase();
                
    const filteredPhotos = searchTerm != null ? photos.filter((photo: Photo) => {
        return (
        photo.title.toLowerCase().includes(lowercasedSearchTerm) ||
        photo.albumTitle.toLowerCase().includes(lowercasedSearchTerm) ||
        photo.author.toLowerCase().includes(lowercasedSearchTerm)
        );
    }) : initialPhotos;

    
    const currentPhotos = filteredPhotos.slice(0, indexOfLastPhoto);

    return (
        <>
            <SearchBar 
                onSearchChange ={(event: ChangeEvent<HTMLInputElement>) => {
                    setSearchTerm(event.target.value);
                }}
            />
            <PhotoGrid 
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
                    onClick={() => setCurrentPage(prevPageNumber => prevPageNumber + 1)}
                    currentLength={currentPhotos.length}
                    filteredLength={filteredPhotos.length} 
                />               
            }
            
        </>
    );
}