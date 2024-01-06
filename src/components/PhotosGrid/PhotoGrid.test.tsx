import React from 'react';
import { render } from '@testing-library/react';
import PhotoGrid from './PhotoGrid';
import { Photo } from '../../types/photo';

describe('PhotoGrid', () => {
  const mockOnSave = jest.fn();

  it('renders the photo grid', () => {
    const { getByTestId } = render(<PhotoGrid photos={[]} onSave={mockOnSave} />);
    const photoGrid = getByTestId('photo-grid');
    expect(photoGrid).toBeInTheDocument();
  });


});