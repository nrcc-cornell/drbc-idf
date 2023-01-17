import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

it('renders app-container', () => {
  const { getByText } = render(<App />);
  expect(getByText(/Test/i)).toBeInTheDocument();
});
