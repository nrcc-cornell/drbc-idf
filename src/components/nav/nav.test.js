import React from 'react';
import { render } from '@testing-library/react';
import Nav from './nav.component';

it('renders matches snapshot', () => {
  expect(render(<Nav />)).toMatchSnapshot();
});
