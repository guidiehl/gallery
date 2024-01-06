import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PhotoModal from './PhotoModal';
import { Photo } from '../../types/photo';

describe('PhotoModal', () => {
  const mockSetIsOpen = jest.fn();
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

  it('renders the photo modal', () => {
    const { getByTestId } = render(<PhotoModal photo={photo} setIsOpen={mockSetIsOpen} onSave={mockOnSave} />);
    const photoModal = getByTestId('photo-modal');
    expect(photoModal).toBeInTheDocument();
  });

  it('renders the photo details', () => {
    const { getByText } = render(<PhotoModal photo={photo} setIsOpen={mockSetIsOpen} onSave={mockOnSave} />);
    expect(getByText(photo.title)).toBeInTheDocument();
    expect(getByText('da ' + photo.author)).toBeInTheDocument();
    expect(getByText(photo.authorEmail)).toBeInTheDocument();
  });

  it('calls the setIsOpen callback with false when the close button is clicked', () => {
    const { getByTestId } = render(<PhotoModal photo={photo} setIsOpen={mockSetIsOpen} onSave={mockOnSave} />);
    const closeButton = getByTestId('modal-close');
    fireEvent.click(closeButton);
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });

  it('calls the onSave callback with the updated photo when the save button is clicked', () => {
    const { getByTestId } = render(<PhotoModal photo={photo} setIsOpen={mockSetIsOpen} onSave={mockOnSave} />);
    const saveButton = getByTestId('save-button');
    fireEvent.click(saveButton);
    expect(mockOnSave).toHaveBeenCalledWith(photo);
  });
});