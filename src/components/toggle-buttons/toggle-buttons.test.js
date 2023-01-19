import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToggleButtons from './toggle-buttons.component';

let currentValue = 'btn1';

it('render matches snapshot', () => {
  expect(
    render(
      <ToggleButtons
        label='Test'
        currentValue={currentValue}
        setFunction={(newValue) => (currentValue = newValue)}
        optionsArray={[
          {
            value: 'btn1',
            ariaLabel: 'button one',
            text: 'Button 1',
          },
          {
            value: 'btn2',
            ariaLabel: 'button two',
            text: 'Button 2',
          },
        ]}
      />
    )
  ).toMatchSnapshot();
});

it('has correct button selected', async () => {
  render(
    <ToggleButtons
      label='Test'
      currentValue={currentValue}
      setFunction={(newValue) => (currentValue = newValue)}
      optionsArray={[
        {
          value: 'btn1',
          ariaLabel: 'button one',
          text: 'Button 1',
        },
        {
          value: 'btn2',
          ariaLabel: 'button two',
          text: 'Button 2',
        },
      ]}
    />
  );
  expect(screen.getByText('Button 1').className.includes('Mui-selected')).toBe(
    true
  );
  expect(screen.getByText('Button 2').className.includes('Mui-selected')).toBe(
    false
  );
});

it('changes button on click', async () => {
  const { rerender } = render(
    <ToggleButtons
      label='Test'
      currentValue={currentValue}
      setFunction={(newValue) => (currentValue = newValue)}
      optionsArray={[
        {
          value: 'btn1',
          ariaLabel: 'button one',
          text: 'Button 1',
        },
        {
          value: 'btn2',
          ariaLabel: 'button two',
          text: 'Button 2',
        },
      ]}
    />
  );
  await userEvent.click(screen.getByText('Button 2'));
  rerender(
    <ToggleButtons
      label='Test'
      currentValue={currentValue}
      setFunction={(newValue) => (currentValue = newValue)}
      optionsArray={[
        {
          value: 'btn1',
          ariaLabel: 'button one',
          text: 'Button 1',
        },
        {
          value: 'btn2',
          ariaLabel: 'button two',
          text: 'Button 2',
        },
      ]}
    />
  );

  expect(screen.getByText('Button 1').className.includes('Mui-selected')).toBe(
    false
  );
  expect(screen.getByText('Button 2').className.includes('Mui-selected')).toBe(
    true
  );
});