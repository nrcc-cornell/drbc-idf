import React from 'react';
import { Fab, Popper, Box } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

// import CsvDownloadButton from '../csv-download-button/csv-download-button.component';
import ExcelDownloadButton from '../csv-download-button/xlsx-download-button.component';
import PdfDownloadButton from '../pdf-download-button/pdf-download-button.component';

import './download-btns.styles.scss';

export default function DownloadBtns() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const btns = <>
    {/* <CsvDownloadButton /> */}
    <ExcelDownloadButton />
    <PdfDownloadButton />
  </>;
  
  return <div className='download-btns-container'>
    {window.innerWidth > 519 ? btns : <>
      <Fab size='small' sx={{ color: 'white', backgroundColor: 'rgb(54, 79, 129)', '&:hover': { backgroundColor: 'rgb(24, 99, 149)' }}} onClick={handleClick}>
        <DownloadIcon />
      </Fab>
      <Popper placement='right' open={Boolean(anchorEl)} anchorEl={anchorEl}>
        <Box className='popper-container'>{btns}</Box>
      </Popper>
    </>}
  </div>;
}