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
      ['Data from ‘Projecting Extreme Precipitation in the Delaware River Basin’'],
      [''],
      [''],
      ['Date:', new Date().toLocaleDateString()],
      ['Selected coordinates:', lng, lat],
      [`${selectByOptions.text} of Selection:`, selectedLocation.name],
      ['State of Selection:', selectedLocation.state_abbr],
      ['Annual Exceedance Probability:', `${100 / parseInt(returnPeriod)}%`],
      ['Emission Scenario:', rcp.split('').join('.')],
      ['Time Period:', timeFrame],
      [''],
      [''],
      [
        '',
        ...percentileOrder.map((percentile) =>
          parseInt(percentile)
            ? `${percentile}${percentile === '83' ? 'rd' : 'th'}`
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
      [''],
      [''],
      ['This [Data / Table] was downloaded from ‘Projecting Extreme Precipitation in the Delaware River Basin’ available at [URL]. The projection tool was developed by the Northeast Regional Climate Center (NRCC) at Cornell University on behalf of the Delaware River Basin Commission (DRBC). Any person who publishes or re-posts this data in whole or in part should credit the DRBC. The DRBC is a federal-interstate commission formed in 1961 to manage, protect, and improve the water resources of the Delaware River Basin. The project was funded, in part, by the U.S. Fish and Wildlife Service (FWS) through the National Fish and Wildlife Foundation’s (NFWF) Delaware Watershed Conservation Fund (DWCF). The views and conclusions contained in this document are those of the authors and should not be interpreted as representing the opinions or policies of the U.S. Government or the National Fish and Wildlife Foundation and its funding sources. Mention of trade names or commercial products does not constitute their endorsement by the U.S. Government, or the National Fish and Wildlife Foundation or its funding sources.'],
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
