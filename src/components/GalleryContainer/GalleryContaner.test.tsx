import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import GalleryContainer from './GalleryContainer';
import { Photo } from '../../types/photo';

describe('GalleryContainer', () => {
  const initialPhotos: Photo[] = [
     {
        id: 1,
        title: 'Test Photo',
        url: 'http://test.com/1.jpg',
        author: 'Test Author',
        authorEmail: 'test@test.com',
        rating: 3,
        albumId: 1,
        albumTitle: 'Test Album',
        thumbnailUrl: 'http://test.com/1.jpg'
      },
      {
        id: 2,
        title: 'Test Photo 2',
        url: 'http://test.com/2.jpg',
        author: 'Test Author 2',
        authorEmail: 'test2@test.com',
        rating: 4.5,
        albumId: 2,
        albumTitle: 'Test Album2',
        thumbnailUrl: 'http://test.com/2.jpg'
      },
  ];

  it('renders the gallery container', () => {
    const { getByTestId } = render(<GalleryContainer initialPhotos={initialPhotos} />);
    const galleryContainer = getByTestId('gallery-container');
    expect(galleryContainer).toBeInTheDocument();
  });

  it('renders the search bar', () => {
    const { getByTestId } = render(<GalleryContainer initialPhotos={initialPhotos} />);
    const searchBar = getByTestId('search-bar');
    expect(searchBar).toBeInTheDocument();
  });

  it('filters the photos based on the search term', () => {
    const { getByTestId, getByPlaceholderText } = render(<GalleryContainer initialPhotos={initialPhotos} />);
    const searchBar = getByPlaceholderText('Search');
    fireEvent.change(searchBar, { target: { value: 'Test Photo 2' } });
    const photoItems = getByTestId('photo-grid').children;
    expect(photoItems.length).toBe(1);
    expect(photoItems[0]).toHaveTextContent('Test Photo 2');
  });

  it('displays the correct number of photos per page', () => {
    const { getByTestId } = render(<GalleryContainer initialPhotos={initialPhotos} />);
    const photoItems = getByTestId('photo-grid').children;
    expect(photoItems.length).toBe(2);
  });
});