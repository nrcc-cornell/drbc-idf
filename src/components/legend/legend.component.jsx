import React, { useContext } from 'react';

import { DataContext } from '../../contexts/data.context';

import './legend.styles.scss';

export default function Legend() {
  const { legendData } = useContext(DataContext);
  return (
    <div className='legend-container'>
      <div className='legend'>
        <div className='legend-labels'>
          <div className='legend-label'>{legendData.min}</div>
          <div className='legend-label'>1.0</div>
          <div className='legend-label'>{legendData.max}</div>
        </div>
        <div className='legend-colors'>
          <div className='label-tick' />
          <div className='label-tick' />
          <div className='label-tick' />
        </div>
      </div>
    </div>
  );
}
