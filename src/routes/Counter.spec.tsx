import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../testUtils';
import Counter from './Counter';

test('Counter', async () => {
  renderWithProviders(<Counter />);

  userEvent.click(screen.getByText('Count is 0'));

  await screen.findByText('Count is 1');
});
