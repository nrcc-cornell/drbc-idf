import React, { useContext } from 'react';
import TableChartIcon from '@mui/icons-material/TableChart';

import { DataContext } from '../../contexts/data.context';
import { MapContext } from '../../contexts/map.context';
import { OptionsContext } from '../../contexts/options.context';

import Button from '../button/button.component';

export default function CsvDownloadButton() {
  const { exportData, adjustments, percentileOrder } = useContext(DataContext);
  const { selectedLocation } = useContext(MapContext);
  const { selectByOptions, returnPeriod, rcp, timeFrame } =
    useContext(OptionsContext);

  const handleCsvDownload = () => {
    const numEmptyAroundProj = Array(
      exportData[0].findIndex((val) => val === 'Median') - 1
    ).fill('');
    const numEmptyAroundAtlas = Array(
      exportData[0][exportData[0].length - 1] === 'Median' ? 0 : 1
    ).fill('');
    const lng = (
      Math.round(selectedLocation.coords.lng * 10000) / 10000
    ).toFixed(4);
    const lat = (
      Math.round(selectedLocation.coords.lat * 10000) / 10000
    ).toFixed(4);

    let csvContent = [
      ['Date:', new Date().toLocaleDateString()],
      ['Selected coordinates:', lng, lat],
      [`${selectByOptions.text} of Selection:`, selectedLocation.name],
      ['State of Selection:', selectedLocation.state_abbr],
      ['Return Period:', `${returnPeriod}-year`],
      ['Emission Scenario:', rcp.split('').join('.')],
      ['Time Period:', timeFrame],
      [''],
      [''],
      [
        '',
        ...percentileOrder.map((percentile) =>
          parseInt(percentile)
            ? `${percentile}th`
            : percentile.charAt(0).toUpperCase() + percentile.slice(1)
        ),
      ],
      [
        `Change Factors for ${selectByOptions.text}:`,
        ...adjustments.map((value) =>
          (Math.round(value * 100) / 100).toFixed(2)
        ),
      ],
      [''],
      [''],
      [
        '',
        ...numEmptyAroundProj,
        `Projected ${timeFrame} Depth (inches)`,
        ...numEmptyAroundProj,
        ...numEmptyAroundAtlas,
        'Atlas 14 (inches)',
        ...numEmptyAroundAtlas,
      ],
      ...exportData,
    ];

    csvContent =
      'data:text/csv;charset=utf-8,' +
      csvContent.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${lng}-${lat}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <Button onClick={handleCsvDownload} buttonType='export'>
      <TableChartIcon />
      CSV
    </Button>
  );
}
