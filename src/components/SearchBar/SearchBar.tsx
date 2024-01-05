import { ChangeEvent } from 'react';
import './SearchBar.css';

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
