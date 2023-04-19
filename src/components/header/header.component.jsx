import React from 'react';
import { Typography } from '@mui/material';

import './header.styles.scss';

export default function Header() {
  return (
    <header className='drbc-header'>
      <hgroup>
        <Typography variant='h1'>Delaware River Basin Precipitation Projection Tool</Typography>
        <Typography variant='h2'>Projected Intensity-Duration-Frequency (IDF) Curves</Typography>
      </hgroup>
    </header>
  );
}