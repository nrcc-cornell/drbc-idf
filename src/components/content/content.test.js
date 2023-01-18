import React from 'react';
import { render } from '@testing-library/react';
import Content from './content.component';

it('renders matches snapshot', () => {
  expect(render(<Content />)).toMatchSnapshot();
});
