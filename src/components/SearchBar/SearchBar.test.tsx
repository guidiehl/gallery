import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  const mockOnSearchChange = jest.fn();

  it('renders the search bar', () => {
    const { getByTestId } = render(<SearchBar onSearchChange={mockOnSearchChange} />);
    const searchBar = getByTestId('search-bar');
    expect(searchBar).toBeInTheDocument();
  });

  it('calls the onSearchChange callback when the input value changes', () => {
    const { getByTestId } = render(<SearchBar onSearchChange={mockOnSearchChange} />);
    const searchBar = getByTestId('search-bar');

    fireEvent.change(searchBar, { target: { value: 'Test' } });
    expect(mockOnSearchChange).toHaveBeenCalled();
  });

  it('passes the correct value to the onSearchChange callback', () => {
    let inputValue = '';
    const onSearchChange = (event: { target: { value: string; }; }) => { inputValue = event.target.value; };
    const { getByTestId } = render(<SearchBar onSearchChange={onSearchChange} />);

    const searchBar = getByTestId('search-bar');
    
    fireEvent.change(searchBar, { target: { value: 'Test' } });

    expect(inputValue).toBe('Test');
  });
});