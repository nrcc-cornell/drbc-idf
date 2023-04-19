import React, { useContext } from 'react';

import { DataContext } from '../../contexts/data.context';

import './legend.styles.scss';

export default function Legend() {
  const { legendColors } = useContext(DataContext);

  const firstBinLow = legendColors[0][0] - 0.02;
  const ticks = [<div key={firstBinLow} className='legend-tick short-tick' />];
  const labels = [];
  const colorSquares = [];
  legendColors.forEach(([value, color]) => {
    const roundedValue = (value + 0.03).toFixed(2);
    const isEven = roundedValue.charAt(3) === '0';
    ticks.push(
      <div
        key={value}
        className={`legend-tick ${isEven ? 'long-tick' : 'short-tick'}`}
      />
    );

    if (isEven) {
      labels.push(
        <div key={value} className={'legend-label'}>
          {roundedValue}
        </div>
      );
    }
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
      <div className='legend-title'>Change Factor (Percentile)</div>
      <div className='legend'>
        <div className='legend-labels'>{labels}</div>
        <div className='legend-color-squares'>{colorSquares}</div>
        <div className='legend-ticks'>{ticks}</div>
      </div>
    </div>
  );
}
