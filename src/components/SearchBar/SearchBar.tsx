import { ChangeEvent } from 'react';
import './SearchBar.css';

/**
 * The SearchBar component is responsible for providing a user interface for searching photos.
 * It renders an input field where users can type their search queries.
 * As the user types in the input field, the component's state is updated with the current value of the input field.
 * The results of the search are then passed to a callback function received as a prop.
 */

interface SearchBarProps {
    onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar ({ onSearchChange }: SearchBarProps) {
    return (
      <div className='search-bar'>
        <input
          className='search-bar-input'
          placeholder="Cerca per nome della foto, album o autore" 
          type="search"
          onChange={onSearchChange} 
        />
      </div>
    );
};
