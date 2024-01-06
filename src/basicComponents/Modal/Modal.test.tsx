import { render, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
  const mockSetIsOpen = jest.fn();

  it('renders the modal', () => {
    const { getByTestId } = render(<Modal setIsOpen={mockSetIsOpen} children={undefined}  />);
    const modal = getByTestId('modal');
    expect(modal).toBeInTheDocument();
  });

  it('renders the children when the modal is open', () => {
    const { getByText } = render(
      <Modal setIsOpen={mockSetIsOpen}>
        <div>Test Child</div>
      </Modal>
    );
    expect(getByText('Test Child')).toBeInTheDocument();
  });

  it('applies the provided styles to the modal', () => {
    const style = { backgroundColor: 'red' };
    const { getByTestId } = render(<Modal setIsOpen={mockSetIsOpen} children={undefined}  style={style} />);
    const modal = getByTestId('modal');
    expect(modal).toHaveStyle('background-color: red');
  });

  it('calls the setIsOpen callback with false when the dark background is clicked', () => {
    const { getByTestId } = render(<Modal setIsOpen={mockSetIsOpen}  children={undefined}  />);
    const darkBackground = getByTestId('dark-background');
    fireEvent.click(darkBackground);
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });

  it('calls the setIsOpen callback with false when the close button is clicked', () => {
    const { getByTestId } = render(<Modal setIsOpen={mockSetIsOpen}  children={undefined}  />);
    const closeButton = getByTestId('modal-close');
    fireEvent.click(closeButton);
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });
});