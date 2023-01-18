import React from 'react';
import { render } from '@testing-library/react';
import OptionPanel from './option-panel.component';

it('renders matches snapshot', () => {
  expect(render(<OptionPanel />)).toMatchSnapshot();
});
