import { fireEvent, render } from '@testing-library/react';

import CustomButton from './CustomButton';

describe('CustomButton', () => {
    const mockOnClick = jest.fn();

    it('renders the button with the correct text', () => {
        const { getByTestId } = render(<CustomButton onClick={mockOnClick} text="Test Button" />);
        const button = getByTestId('custom-button');

        expect(button).toBeInTheDocument();

    });

    it('calls the onClick callback when the button is clicked', () => {
        const { getByText } = render(<CustomButton onClick={mockOnClick} text="Test Button" />);
        const button = getByText('Test Button');
        fireEvent.click(button);
        expect(mockOnClick).toHaveBeenCalled();
    });
});