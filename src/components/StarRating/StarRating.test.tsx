
import { render, fireEvent } from '@testing-library/react';
import StarRating from './StarRating';

describe('StarRating', () => {
    const mockOnRatingChange = jest.fn();

    it('renders the correct number of bottom stars', () => {
        const { getAllByTestId } = render(<StarRating rating={3} onRatingChange={mockOnRatingChange} />);
        const bottomStar = getAllByTestId('bottom');
        expect(bottomStar.length).toBe(5); 
    });

    it('checks if the number of filled star is correct', () => {
        const { getAllByText } = render(<StarRating rating={3} onRatingChange={mockOnRatingChange} />);
        const filledStars = getAllByText('★');
        expect(filledStars.length).toBe(6); // 3 full stars + 3 half stars
    });

    it('calls the onRatingChange callback when a star is clicked', () => {
        const { container } = render(<StarRating rating={3} onRatingChange={mockOnRatingChange}/>);
        const starBottom3 = container.querySelector('#star-bottom3');
        fireEvent.click(starBottom3!);
        expect(mockOnRatingChange).toHaveBeenCalledWith(3);
    });

    it('to correct assign the rating when clicked', () => {
        const { container } = render(<StarRating rating={0} onRatingChange={mockOnRatingChange}/>);
        const starTop3 = container.querySelector('#star-top3');
        fireEvent.click(starTop3!);
        expect(mockOnRatingChange).toHaveBeenCalledWith(2.5);
    });
});