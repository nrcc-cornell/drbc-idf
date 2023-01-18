import React from 'react';
import { render } from '@testing-library/react';
import Legend from './legend.component';

it('renders matches snapshot', () => {
  expect(render(<Legend />)).toMatchSnapshot();
});
