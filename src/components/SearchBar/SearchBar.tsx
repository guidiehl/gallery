import React, { useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export default function SearchBar ({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
  
        <form className='search-bar' onSubmit={(event: React.FormEvent) => {
                event.preventDefault();
                onSearch(searchTerm);
            }}>
            
            <input
                className='search-bar-input'
                placeholder="Cerca per nome della foto, album o username" 
                type="text" 
                value={searchTerm}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setSearchTerm(event.target.value);
                }} 
            />
        </form>
  
  );
};
