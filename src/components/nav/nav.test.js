import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OptionsContext } from '../../contexts/options.context';
import Nav from './nav.component';

const setStateMock = jest.fn();
const defaultProps = {
  navTab: 0,
  navTabOptions: ['Tab 1', 'Tab 2'],
  setNavTab: setStateMock,
};

const renderNav = (navData) => {
  return render(
    <OptionsContext.Provider value={navData}>
      <Nav />
    </OptionsContext.Provider>
  );
};

it('render matches snapshot', () => {
  expect(renderNav(defaultProps)).toMatchSnapshot();
});

it('has correct tab selected', async () => {
  renderNav(defaultProps);
  expect(screen.getByText('Tab 1').className.includes('Mui-selected')).toBe(
    true
  );
  expect(screen.getByText('Tab 2').className.includes('Mui-selected')).toBe(
    false
  );
});

it('changes tab on click', async () => {
  const { rerender } = renderNav(defaultProps);
  await userEvent.click(screen.getByText('Tab 2'));
  rerender(
    <OptionsContext.Provider value={{ ...defaultProps, navTab: 1 }}>
      <Nav />
    </OptionsContext.Provider>
  );

  expect(screen.getByText('Tab 1').className.includes('Mui-selected')).toBe(
    false
  );
  expect(screen.getByText('Tab 2').className.includes('Mui-selected')).toBe(
    true
  );
});
