import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Gallery from './components/Gallery/Gallery';


describe('Gallery', () => {
  it('renders without crashing', () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <Gallery />
      </QueryClientProvider>
    );
  });
});