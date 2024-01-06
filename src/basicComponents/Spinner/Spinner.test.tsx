
import { render } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner', () => {
  it('renders the spinner', () => {
    const { getByTestId } = render(<Spinner />);
    const spinner = getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });
});