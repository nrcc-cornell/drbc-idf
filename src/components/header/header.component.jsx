import React from 'react';
import { Typography } from '@mui/material';

import './header.styles.scss';

export default function Header() {
  return (
    <header className='drbc-header'>
      <a href="https://www.nj.gov/drbc/" target='_blank' rel='noreferrer'><img height='96px' width='182px' className='drbc-logo' src={`${process.env.PUBLIC_URL}/assets/drbc_logo.gif`} alt='Delaware River Basin Commission logo' /></a>
      <hgroup>
        <Typography variant='h1'>Projecting Extreme Precipitation in the Delaware River Basin</Typography>
        <Typography variant='h2'>An Interactive Tool Supporting Regional Resilience</Typography>
      </hgroup>
    </header>
  );
}