import { screen } from '@testing-library/react';
import { renderWithProviders } from '../testUtils';
import Cards from './Cards';

test('Cards', async () => {
  renderWithProviders(<Cards />);

  expect(await screen.findByText('Loading cards...')).toBeInTheDocument();
  expect(await screen.findByText('Card 1 title')).toBeInTheDocument();
});
