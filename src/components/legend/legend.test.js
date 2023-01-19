import React from 'react';
import { render, screen } from '@testing-library/react';
import { DataContext } from '../../contexts/data.context';
import Legend from './legend.component';

function renderLegend(legendData) {
  return render(
    <DataContext.Provider value={legendData}>
      <Legend />
    </DataContext.Provider>
  );
}

it('renders matches snapshot', () => {
  expect(
    renderLegend({ legendData: { min: 0.0, max: 2.0 } })
  ).toMatchSnapshot();
});

it('displays proper min and max', () => {
  renderLegend({ legendData: { min: 0.5, max: 1.5 } });
  expect(screen.getByText(0.5)).toBeTruthy();
  expect(screen.getByText(1.5)).toBeTruthy();
});
