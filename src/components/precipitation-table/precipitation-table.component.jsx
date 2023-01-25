import React, { useContext } from 'react';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

import { DataContext } from '../../contexts/data.context';

import './precipitation-table.styles.scss';

const StyledTableCell = styled(TableCell)({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'rgba(54,132,92,0.75)',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: "Georgia, 'Times New Roman', Times, serif",
    borderRight: '1px solid rgb(200, 200, 200)',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
  },
});

export default function PrecipitationTable() {
  const { tableData } = useContext(DataContext);
  if (!tableData) return '';

  const iOfFirstMedian = tableData[0].findIndex((val) => val === 'Median');
  const numProjectedCols = iOfFirstMedian + (iOfFirstMedian - 1);
  const numAtlas14Cols =
    tableData[0][tableData[0].length - 1] === 'Median' ? 1 : 3;

  return (
    <div className='precip-table-container'>
      <TableContainer className='precip-table-content'>
        <Table size='small' aria-label='a dense table'>
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell align='center' colSpan={numProjectedCols}>
                Projected Precipitation (inch)
              </StyledTableCell>
              <StyledTableCell align='center' colSpan={numAtlas14Cols}>
                Atlas 14 Precipitation (inch)
              </StyledTableCell>
            </TableRow>
            <TableRow>
              {tableData[0].map((colName, i) => (
                <StyledTableCell
                  key={'header' + i}
                  align={i === 0 ? 'left' : 'center'}
                >
                  {colName}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.slice(1).map((row, i) => (
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
                    {(Math.round(value * 100) / 100).toFixed(2)}
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
