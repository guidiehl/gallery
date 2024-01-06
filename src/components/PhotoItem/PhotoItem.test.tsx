import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PhotoItem from './PhotoItem';
import { Photo } from '../../types/photo';

describe('PhotoItem', () => {
  const mockOnSave = jest.fn();
  const photo: Photo = {
    id: 1,
    title: 'Test Photo',
    url: 'http://test.com/1.jpg',
    author: 'Test Author',
    authorEmail: 'test@test.com',
    rating: 3,
    albumId: 1,
    albumTitle: 'Test Album',
    thumbnailUrl: 'http://test.com/1.jpg'
  };

  it('renders the photo item', () => {
    const { getByTestId } = render(<PhotoItem photo={photo} onSave={mockOnSave} />);
    const photoItem = getByTestId('photo-item');
    expect(photoItem).toBeInTheDocument();
  });

  it('renders the photo details', () => {
    const { getByText } = render(<PhotoItem photo={photo} onSave={mockOnSave} />);
    expect(getByText(photo.title)).toBeInTheDocument();
    expect(getByText(photo.author)).toBeInTheDocument();
  });

  it('opens the modal when the photo item is clicked', () => {
    const { getByTestId } = render(<PhotoItem photo={photo} onSave={mockOnSave} />);
    const photoItem = getByTestId('photo-item');
    fireEvent.click(photoItem);
    const photoModal = getByTestId('photo-modal');
    expect(photoModal).toBeInTheDocument();
  });

  it('calls the onSave callback with the updated photo when the save button in the modal is clicked', () => {
    const { getByTestId } = render(<PhotoItem photo={photo} onSave={mockOnSave} />);
    const photoItem = getByTestId('photo-item');
    fireEvent.click(photoItem);
    const saveButton = getByTestId('save-button');
    fireEvent.click(saveButton);
    expect(mockOnSave).toHaveBeenCalledWith(photo);
  });
});