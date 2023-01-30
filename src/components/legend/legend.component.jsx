import React, { useContext } from 'react';

import { DataContext } from '../../contexts/data.context';

import './legend.styles.scss';

export default function Legend() {
  const { legendColors } = useContext(DataContext);

  const ticks = [<div key={0.95} className='legend-tick' />];
  const labels = [
    <div key={0.95} className='legend-label'>
      {0.95}
    </div>,
  ];
  const colorSquares = [];
  legendColors.forEach(([value, color]) => {
    ticks.push(<div key={value} className='legend-tick' />);
    labels.push(
      <div key={value} className='legend-label'>
        {value.toFixed(2)}
      </div>
    );
    colorSquares.push(
      <div
        key={value}
        className='legend-color-square'
        style={{ backgroundColor: color }}
      />
    );
  });

  return (
    <div className='legend-container'>
      <div className='legend'>
        <div className='legend-labels'>{labels}</div>
        <div className='legend-color-squares'>{colorSquares}</div>
        <div className='legend-ticks'>{ticks}</div>
      </div>
    </div>
  );
}
