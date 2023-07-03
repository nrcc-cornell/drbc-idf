import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

import './precipitation-table.styles.scss';

const StyledTableCell = styled(TableCell)({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'rgb(39, 133, 88)',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
    borderRight: '1px solid rgb(200, 200, 200)',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
  },
});

export default function PrecipitationTable({ data, tableRef }) {
  if (!data) return '';

  const iOfFirstMedian = data[0].findIndex((val) => val === 'Median');
  const numProjectedCols = iOfFirstMedian + (iOfFirstMedian - 1);
  const numAtlas14Cols =
    data[0][data[0].length - 1] === 'Median' ? 1 : 3;

  return (
    <div className='precip-table-container'>
      <TableContainer className='precip-table-content' ref={tableRef}>
        <Table size='small' aria-label='table of preciption projections'>
          <TableHead>
            <TableRow>
              <StyledTableCell
                sx={{ '&:first-of-type': { borderRight: 0 } }}
              ></StyledTableCell>
              <StyledTableCell align='center' colSpan={numProjectedCols}>
                Projected Precipitation (inch)
              </StyledTableCell>
              <StyledTableCell
                align='center'
                colSpan={numAtlas14Cols}
                sx={{ '&:last-child': { borderRight: 0 } }}
              >
                Atlas 14 Precipitation (inch)
              </StyledTableCell>
            </TableRow>
            <TableRow>
              {data[0].map((colName, i) => (
                <StyledTableCell
                  key={'header' + i}
                  align={i === 0 ? 'left' : 'center'}
                  sx={{ '&:last-child': { borderRight: 0 } }}
                >
                  {colName}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(1).map((row, i) => (
              <TableRow
                hover
                key={'row' + i}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <StyledTableCell
                  component='th'
                  scope='row'
                  sx={{ width: '130px' }}
                >
                  {row[0]}
                </StyledTableCell>
                {row.slice(1).map((value, j) => (
                  <StyledTableCell key={'cell' + j} align='center'>
                    {value === null
                      ? value
                      : (Math.round(value * 100) / 100).toFixed(2)}
                  </StyledTableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

PrecipitationTable.propTypes = {
  data: PropTypes.array,
  tableRef: PropTypes.oneOfType([
    PropTypes.func, 
    PropTypes.shape({ current: PropTypes.any })
])
};