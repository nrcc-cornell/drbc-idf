import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

it('renders mocked content and layout', () => {
  expect(render(<App />)).toMatchSnapshot();
});
