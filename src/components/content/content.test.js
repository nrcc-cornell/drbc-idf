import React from 'react';
import { render, screen } from '@testing-library/react';
import { OptionsContext } from '../../contexts/options.context';
import Content from './content.component';

const normalProps = {
  tabContent: [
    {
      sectionType: 'normal',
      sectionContent: {
        heading: 'Data Source',
        body: [
          {
            element: 'p',
            text: 'The wild, wonderful mind of Arthur DeGaetano.',
          },
        ],
      },
    },
  ],
};

const blankProps = {
  tabContent: [],
};

const componentProps = {
  tabContent: [
    {
      sectionType: 'component',
      sectionContent: 'testing',
    },
  ],
};

const renderContent = (contentData) => {
  return render(
    <OptionsContext.Provider value={contentData}>
      <Content />
    </OptionsContext.Provider>
  );
};

it('renders matches snapshot', () => {
  expect(renderContent(normalProps)).toMatchSnapshot();
  expect(screen.queryByText('Data Source')).toBeTruthy();
});

it('handles blank content', () => {
  expect(renderContent(blankProps)).toMatchSnapshot();
  expect(screen.queryByText('Data Source')).toBeFalsy();
});

it('can render components', () => {
  expect(renderContent(componentProps)).toMatchSnapshot();
  expect(screen.queryByText('Rendered Test div')).toBeTruthy();
});
