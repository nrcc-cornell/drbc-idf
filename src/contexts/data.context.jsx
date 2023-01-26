import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import Rainbow from 'rainbowvis.js';

import { OptionsContext } from './options.context';
import { MapContext } from './map.context';

const loadDataFile = (selectBy, setFunction) => {
  JSZipUtils.getBinaryContent(
    `${process.env.PUBLIC_URL}/data/${selectBy}_adjustments.zip`,
    async (err, data) => {
      if (err) {
        return [];
      }
      const jsZip = new JSZip();
      const bData = await jsZip.loadAsync(data);
      const tData = await bData.files[`${selectBy}_adjustments.json`].async(
        'text'
      );
      setFunction(JSON.parse(tData));
    }
  );
};

const calculateColors = (fileData, returnPeriod, rcp, timeFrame) => {
  const { locVals, rawMin, rawMax } = fileData.reduce(
    (acc, locationObj) => {
      const id = locationObj.id;
      let value;
      try {
        value =
          locationObj.nearest_gridpoint.nj.data[rcp][timeFrame][
            returnPeriod
          ][3];
      } catch {
        value =
          locationObj.nearest_gridpoint.drb.data[rcp][timeFrame][
            returnPeriod
          ][3];
      }

      if (value < acc.rawMin) acc.rawMin = value;
      if (value > acc.rawMax) acc.rawMax = value;
      acc.locVals.push([id, value]);
      return acc;
    },
    { locVals: [], rawMin: 999, rawMax: -999 }
  );

  const diff = Math.max(Math.abs(rawMin - 1), Math.abs(rawMax - 1));
  const min = Math.round((1 - diff) * 100) / 100;
  const max = Math.round((1 + diff) * 100) / 100;

  const rainbow = new Rainbow();
  rainbow.setSpectrum('#e2b533', '#1a7c00', '#002eff');
  rainbow.setNumberRange(min, max);
  let colors = ['match', ['get', 'id']];

  locVals.forEach(([id, value], i) => {
    colors.push(id || `${i}`, '#' + rainbow.colourAt(value));
  });

  colors.push('rgba(0,0,0,0)');
  return { colors, min, max };
};

const convertData = (rawData, returnPeriodOrder) => {
  return rawData.slice(0, 10).reduce(
    (acc, durationArr, durNum) => {
      durationArr.slice(1, 7).forEach((val, i) => {
        const roundedVal =
          Math.round((durNum === 9 ? val * 1.13 : val) * 100) / 100;
        acc[returnPeriodOrder[i]].push(roundedVal);
      });
      return acc;
    },
    { 2: [], 5: [], 10: [], 25: [], 50: [], 100: [] }
  );
};

const atlas14TextToJson = (dataText, removeText) => {
  const dataOnly = dataText.replace(`${removeText} = `, '');
  const cleanedText = dataOnly
    .split('')
    .map((char) => (char === "'" ? '' : char))
    .join('');
  return JSON.parse(cleanedText);
};

const parseAtlas14Data = (text) => {
  const dataNames = [
    ['quantiles', 'median'],
    ['upper', '90'],
    ['lower', '10'],
  ];
  const returnPeriods = ['2', '5', '10', '25', '50', '100'];

  const textArrs = text.split(';\n').slice(1, 4);
  const jsonData = dataNames.reduce(
    (acc, [removeText, dataSetName], i) => {
      const rawData = atlas14TextToJson(textArrs[i], removeText);
      const atlas14Data = convertData(rawData, returnPeriods);
      returnPeriods.forEach((rp) => {
        acc[rp][dataSetName] = atlas14Data[rp];
      });
      return acc;
    },
    { 2: {}, 5: {}, 10: {}, 25: {}, 50: {}, 100: {} }
  );
  return jsonData;
};

const updateAtlas14Data = async (coords, setChartData) => {
  const response = await fetch(
    `https://cors-proxy.benlinux915.workers.dev/atlas14`,
    {
      method: 'POST',
      body: JSON.stringify(coords),
    }
  );
  const apiText = await response.text();
  const atlas14Data = parseAtlas14Data(apiText);
  setChartData(atlas14Data);
};

const percentileOrder = ['10', '17', '25', 'median', '75', '83', '90'];
const calculateProjectedData = (
  atlas14Data,
  fileData,
  returnPeriod,
  rcp,
  timeFrame,
  selectedLocation
) => {
  const adjustmentData = fileData.find((loc) => loc.id === selectedLocation.id);
  if (!adjustmentData) {
    return { newAdjustments: null, projectedData: null };
  }

  let adjustments;
  try {
    adjustments =
      adjustmentData.nearest_gridpoint.nj.data[rcp][timeFrame][returnPeriod];
  } catch {
    adjustments =
      adjustmentData.nearest_gridpoint.drb.data[rcp][timeFrame][returnPeriod];
  }

  const atlas14Median = atlas14Data[returnPeriod].median;
  return {
    newAdjustments: adjustments,
    projectedData: atlas14Median.reduce(
      (acc, aValue) => {
        adjustments.forEach((adj, i) => {
          acc[percentileOrder[i]].push(Math.round(aValue * adj * 100) / 100);
        });
        return acc;
      },
      { 10: [], 17: [], 25: [], median: [], 75: [], 83: [], 90: [] }
    ),
  };
};

const compileTableData = (chartData, hoveredData, togglesInfo) => {
  if (!chartData || !chartData.projectedData) return null;

  const targetRows = [
    ['Last Hovered', null],
    ['60min', 4],
    ['6hr', 7],
    ['12hr', 8],
    ['24hr', 9],
  ];

  const projectedColumns = togglesInfo.slice(1).reduce(
    (acc, ciInfo) => {
      if (ciInfo.checked) {
        acc = [ciInfo.tableHeadings[0], ...acc, ciInfo.tableHeadings[1]];
      }
      return acc;
    },
    ['Median']
  );

  const data = targetRows.map(([name, index]) => {
    const rowData = [];
    if (index === null && hoveredData) {
      rowData.push(hoveredData.name);
    } else {
      rowData.push(name);
    }

    projectedColumns.forEach((column) => {
      if (index === null) {
        rowData.push(
          hoveredData ? hoveredData.projectedData[column.toLowerCase()] : null
        );
      } else {
        rowData.push(chartData.projectedData[column.toLowerCase()][index]);
      }
    });

    if (togglesInfo[0].checked) {
      if (index === null) {
        ['10', 'median', '90'].forEach((percentile) =>
          rowData.push(hoveredData ? hoveredData.atlas14Data[percentile] : null)
        );
      } else {
        ['10', 'median', '90'].forEach((percentile) =>
          rowData.push(chartData.atlas14Data[percentile][index])
        );
      }
    } else {
      if (index === null) {
        rowData.push(hoveredData ? hoveredData.atlas14Data['median'] : null);
      } else {
        rowData.push(chartData.atlas14Data['median'][index]);
      }
    }

    return rowData;
  });

  let atlas14Columns;
  if (togglesInfo[0].checked) {
    atlas14Columns = togglesInfo[0].tableHeadings.map((str) =>
      parseInt(str) ? str + '%' : str
    );
  } else {
    atlas14Columns = [togglesInfo[0].tableHeadings[1]];
  }

  return [
    [
      'Duration',
      ...projectedColumns.map((str) => (parseInt(str) ? str + '%' : str)),
      ...atlas14Columns,
    ],
    ...data,
  ];
};

// Set up initial state of context
export const DataContext = createContext({
  legendData: {},
  mapColors: [],
  chartData: null,
  lastDurationHovered: null,
  setLastDurationHovered: () => null,
  adjustments: null,
  percentileOrder: [],
});

// Set up context provider
export const DataProvider = ({ children }) => {
  const [fileData, setFileData] = useState([]);
  const [legendData, setLegendData] = useState({ min: 0, max: 0 });
  const [atlas14Data, setAtlas14Data] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [adjustments, setAdjustments] = useState(null);
  const [mapColors, setMapColors] = useState([
    'match',
    ['get', 'id'],
    '1',
    'rgba(0,0,0,0)',
    'rgba(0,0,0,0)',
  ]);
  const [lastDurationHovered, setLastDurationHovered] = useState(null);
  const { selectByOptions, returnPeriod, rcp, timeFrame, togglesInfo } =
    useContext(OptionsContext);
  const { selectedLocation } = useContext(MapContext);

  useEffect(() => {
    loadDataFile(selectByOptions.value, setFileData);
  }, [selectByOptions]);

  useEffect(() => {
    const { colors, min, max } = calculateColors(
      fileData,
      returnPeriod,
      rcp,
      timeFrame
    );

    if (colors.length > 3) setMapColors(colors);
    setLegendData({ min, max });
  }, [fileData, returnPeriod, rcp, timeFrame]);

  useEffect(() => {
    if (selectedLocation) {
      updateAtlas14Data(selectedLocation.coords, setAtlas14Data);
    }
  }, [selectedLocation]);

  useEffect(() => {
    if (atlas14Data && fileData.length && selectedLocation) {
      const { newAdjustments, projectedData } = calculateProjectedData(
        atlas14Data,
        fileData,
        returnPeriod,
        rcp,
        timeFrame,
        selectedLocation
      );

      setAdjustments(newAdjustments);
      setChartData({ atlas14Data: atlas14Data[returnPeriod], projectedData });
    }
  }, [fileData, returnPeriod, rcp, timeFrame, selectedLocation, atlas14Data]);

  useEffect(() => {
    setTableData(compileTableData(chartData, lastDurationHovered, togglesInfo));
  }, [chartData, lastDurationHovered, togglesInfo]);

  const value = {
    mapColors,
    legendData,
    chartData,
    lastDurationHovered,
    setLastDurationHovered,
    tableData,
    adjustments,
    percentileOrder,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

DataProvider.propTypes = {
  children: PropTypes.node,
};
