import React, { useContext } from 'react';
import { Tabs, Tab } from '@mui/material';
import { styled } from '@mui/system';

import { OptionsContext } from '../../contexts/options.context';

import './nav.styles.scss';

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className='MuiTabs-indicatorSpan' /> }}
  />
))({
  minHeight: '35px',
  height: '35px',
  '& .MuiTabs-indicator': {
    display: 'none',
  },
});

const StyledTab = styled((props) => <Tab {...props} />)(() => ({
  textTransform: 'none',
  fontFamily: "Georgia, 'Times New Roman', Times, serif",
  color: 'rgb(80,80,80)',
  minHeight: '35px',
  height: '35px',
  boxSizing: 'border-box',
  border: '1px solid rgb(200,200,200)',
  borderBottom: 'none',
  '&.Mui-selected': {
    color: 'white',
    backgroundColor: '#194186',
    border: 'none',
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
}));

export default function Nav() {
  const { navTab, navTabOptions, setNavTab } = useContext(OptionsContext);

  return (
    <div className='nav-container'>
      <StyledTabs
        value={navTab}
        onChange={(e, newTab) => setNavTab(newTab)}
        aria-label='tool navigation tabs'
      >
        {navTabOptions.map((name) => (
          <StyledTab key={name} label={name} />
        ))}
      </StyledTabs>
    </div>
  );
}
