import React, { useContext } from 'react';
import TableChartIcon from '@mui/icons-material/TableChart';

import writeXlsxFile from 'write-excel-file';

import { DataContext } from '../../contexts/data.context';
import { MapContext } from '../../contexts/map.context';
import { OptionsContext } from '../../contexts/options.context';

import Button from '../button/button.component';

export default function ExcelDownloadButton() {
  const { exportData, adjustments, percentileOrder } = useContext(DataContext);
  const { selectedLocation } = useContext(MapContext);
  const { selectByOptions, returnPeriod, rcp, timeFrame } =
    useContext(OptionsContext);

  const handleExcelDownload = async () => {
    const numEmptyAroundProj = Array(
      exportData[0].findIndex((val) => val === 'Median') - 1
    ).fill(null);
    const numEmptyAroundAtlas = Array(
      exportData[0][exportData[0].length - 1] === 'Median' ? 0 : 1
    ).fill(null);
    const lng = (
      Math.round(selectedLocation.coords.lng * 10000) / 10000
    ).toFixed(4);
    const lat = (
      Math.round(selectedLocation.coords.lat * 10000) / 10000
    ).toFixed(4);

    const tableHeader = [
      null,
      ...numEmptyAroundProj,
      `Projected ${timeFrame} Depth (inches)`,
      ...numEmptyAroundProj,
      ...numEmptyAroundAtlas,
      'Atlas 14 (inches)',
      ...numEmptyAroundAtlas,
    ];

    const span = Math.max(8, tableHeader.length)

    let excelData = [
      [{ rowSpan: 2, alignVertical: 'center', align: 'center', value: 'Data from ‘Projecting Extreme Precipitation in the Delaware River Basin’', span: span}],
      [null],
      [null],
      [null],
      [{value: 'Date:'}, {value: new Date().toLocaleDateString()}],
      [{value: 'Selected coordinates:'}, {value: lng}, {value: lat}],
      [{value: `${selectByOptions.text} of Selection:`}, {value: selectedLocation.name}],
      [{value: 'State of Selection:'}, {value: selectedLocation.state_abbr}],
      [{value: 'Annual Exceedance Probability:'}, {value: `${100 / parseInt(returnPeriod)}%`}],
      [{value: 'Emission Scenario:'}, {value: rcp.split('').join('.')}],
      [{value: 'Time Period:'}, {value: timeFrame}],
      [null],
      [null],
      [
        null,
        ...percentileOrder.map((percentile) =>
          ({ value: parseInt(percentile)
            ? `${percentile}${percentile === '83' ? 'rd' : 'th'}`
            : percentile.charAt(0).toUpperCase() + percentile.slice(1) })
        ),
      ],
      [
        {value: `Change Factors for ${selectByOptions.text}:`},
        ...adjustments.map((value) =>
          ({value: (Math.round(value * 100) / 100).toFixed(2)})
        ),
      ],
      [null],
      [null],
      tableHeader,
      ...exportData.map(row => {
        return row.map(cellValue => ({ value: cellValue }));
      }),
      [null],
      [null],
      [{span: span, rowSpan: 10, alignVertical: 'center', wrap: true, value: `This data was downloaded from ‘Projecting Extreme Precipitation in the Delaware River Basin’ available at ${window.location.href} (Link 1). The projection tool was developed by the Northeast Regional Climate Center (NRCC) at Cornell University (Link 2) on behalf of the Delaware River Basin Commission (DRBC) (Link 3). Any person who publishes or re-posts this data in whole or in part should credit the DRBC. The DRBC is a federal-interstate commission formed in 1961 to manage, protect, and improve the water resources of the Delaware River Basin. The project was funded, in part, by the U.S. Fish and Wildlife Service (FWS) through the National Fish and Wildlife Foundation’s (NFWF) Delaware Watershed Conservation Fund (DWCF). The views and conclusions contained in this document are those of the authors and should not be interpreted as representing the opinions or policies of the U.S. Government or the National Fish and Wildlife Foundation and its funding sources. Mention of trade names or commercial products does not constitute their endorsement by the U.S. Government, or the National Fish and Wildlife Foundation or its funding sources.`}],
      [null],
      [null],
      [null],
      [null],
      [null],
      [null],
      [null],
      [null],
      [null],
      [null],
      [
        {type: 'Formula', align: 'center', alignVertical: 'center', rowSpan: 2, span: 2, color: '#2045c9', value: `=HYPERLINK("${window.location.href}","Link 1")`},null,null,
        {type: 'Formula', align: 'center', alignVertical: 'center', rowSpan: 2, span: 2, color: '#2045c9', value: '=HYPERLINK("https:/www.nrcc.cornell.edu/","Link 2")'},null,null,
        {type: 'Formula', align: 'center', alignVertical: 'center', rowSpan: 2, span: 2, color: '#2045c9', value: '=HYPERLINK("https://www.nj.gov/drbc/","Link 3")'}
      ],
      [null]
    ];

    await writeXlsxFile(excelData, { fileName: `${lng}-${lat}.xlsx`})
  };

  return (
    <Button onClick={handleExcelDownload} buttonType='export'>
      <TableChartIcon />
      Excel
    </Button>
  );
}
