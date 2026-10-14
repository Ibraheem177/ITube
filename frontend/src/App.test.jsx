import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the video feed', () => {
  render(<App />);
  expect(screen.getByRole('main')).toBeInTheDocument();
});
