import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableHead, TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

import { MapContext } from '../../contexts/map.context';
import { OptionsContext } from '../../contexts/options.context';
import { DataContext } from '../../contexts/data.context';

import './location-info.styles.scss';
import { PdfContext } from '../../contexts/pdf.context';

const StyledTableCell = styled(TableCell)({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'rgba(54,132,92,0.75)',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    fontFamily: "Georgia, 'Times New Roman', Times, serif",
    borderRight: '1px solid rgb(200, 200, 200)',
    padding: 0,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 10,
    fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
    padding: '3px 0px',
  },
});

const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export default function LocationInfo({ hovered }) {
  const { selectedLocation } = useContext(MapContext);
  const { selectBy } = useContext(OptionsContext);
  const { adjustments, percentileOrder } = useContext(DataContext);
  const { changeFactorRef } = useContext(PdfContext);

  const hoveredContent = hovered ? (
    <div className='location-info-hovered'>
      <div className='hovered-type'>Hovered {capitalize(selectBy)}:</div>
      <div className='hovered-name'>
        {hovered.name}, {hovered.state_abbr}
      </div>
    </div>
  ) : (
    ''
  );

  const selectedContent =
    selectedLocation && selectedLocation.id ? (
      <Table
        className='selected-change-factors'
        size='small'
        aria-label='table of change factors for the selected location'
        ref={changeFactorRef}
      >
        <TableHead>
          <TableRow>
            <StyledTableCell
              colSpan={percentileOrder.length}
              align='center'
              sx={{
                '&:last-child': {
                  borderRight: 0,
                  lineHeight: '15px',
                  padding: '4px 6px',
                },
              }}
            >
              Change factors by Percentile for {capitalize(selectBy)}:{' '}
              {selectedLocation.name}, {selectedLocation.state_abbr}
            </StyledTableCell>
          </TableRow>
          <TableRow>
            {percentileOrder.map((percentile) => (
              <StyledTableCell
                key={percentile}
                align='center'
                sx={{ '&:last-child': { borderRight: 0 } }}
              >
                {percentile === 'median' ? 'Median' : percentile + 'th'}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {adjustments &&
              adjustments.map((value, i) => (
                <StyledTableCell
                  key={i}
                  align='center'
                  sx={{ borderBottom: 0 }}
                >
                  {(Math.round(value * 100) / 100).toFixed(2)}
                </StyledTableCell>
              ))}
          </TableRow>
        </TableBody>
      </Table>
    ) : null;

  if (hovered || selectedLocation) {
    return (
      <div className='location-info-container'>
        {hoveredContent}
        <div className='location-info-selected'>{selectedContent}</div>
      </div>
    );
  } else {
    return '';
  }
}

LocationInfo.propTypes = {
  hovered: PropTypes.object,
};
