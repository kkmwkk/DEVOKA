import { render, screen } from '@testing-library/react';
import ApiTest from './apiTest';

test('renders learn react link', () => {
  render(<ApiTest />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
