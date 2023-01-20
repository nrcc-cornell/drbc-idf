import React from 'react';
import { render, screen } from '@testing-library/react';
import { OptionsContext } from '../../contexts/options.context';
import Content from './content.component';

const props1 = {
  tabContent: [
    {
      heading: 'Data Source',
      body: [
        {
          element: 'p',
          text: 'The wild, wonderful mind of Arthur DeGaetano.',
        },
      ],
    },
  ],
};

const props2 = {
  tabContent: [],
};

const renderContent = (contentData) => {
  return render(
    <OptionsContext.Provider value={contentData}>
      <Content />
    </OptionsContext.Provider>
  );
};

it('renders matches snapshot', () => {
  expect(renderContent(props1)).toMatchSnapshot();
  expect(screen.queryByText('Data Source')).toBeTruthy();
});

it('handles blank content', () => {
  expect(renderContent(props2)).toMatchSnapshot();
  expect(screen.queryByText('Data Source')).toBeFalsy();
});
