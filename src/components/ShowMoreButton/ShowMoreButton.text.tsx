import { render, fireEvent } from '@testing-library/react';
import ShowMoreButton from './ShowMoreButton';

describe('ShowMoreButton', () => {
  const mockOnClick = jest.fn();

  it('renders the button with the correct text', () => {
    const { getByText } = render(<ShowMoreButton onClick={mockOnClick} currentLength={10} filteredLength={20} />);
    const button = getByText('Vedere di più');
    expect(button).toBeInTheDocument();
  });

  it('renders the correct count', () => {
    const { getByText } = render(<ShowMoreButton onClick={mockOnClick} currentLength={10} filteredLength={20} />);
    const count = getByText('10 di 20');
    expect(count).toBeInTheDocument();
  });

  it('calls the onClick callback when the button is clicked', () => {
    const { getByTestId } = render(<ShowMoreButton onClick={mockOnClick} currentLength={10} filteredLength={20} />);
    const button = getByTestId('show-more-button');
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalled();
  });
});