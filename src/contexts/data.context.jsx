import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';

import config from './config.json';

import { OptionsContext } from './options.context';
import { MapContext } from './map.context';

import legendColors from './legendColors.json';

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

const valueToColor = (value, legendColors) => {
  for (let i = 0; i < legendColors.length; i++) {
    let threshold, color;
    [threshold, color] = legendColors[i];
    if (value < threshold) return color;
  }
  return 'black';
};

const getNearest = (locationObj) => {
  let value;
  if (
    locationObj.nearest_gridpoint.nj.distance <=
    locationObj.nearest_gridpoint.drb.distance
  ) {
    try {
      value = locationObj.nearest_gridpoint.nj.data;
    } catch {
      value = locationObj.nearest_gridpoint.drb.data;
    }
  } else {
    try {
      value = locationObj.nearest_gridpoint.drb.data;
    } catch {
      value = locationObj.nearest_gridpoint.nj.data;
    }
  }
  return value;
};

const calculateColors = (
  fileData,
  returnPeriod,
  rcp,
  timeFrame,
  legendColors
) => {
  const locVals = fileData.reduce((acc, locationObj) => {
    const id = locationObj.id;
    const value = getNearest(locationObj);
    if (value[rcp][timeFrame]) {
      acc.push([id, value[rcp][timeFrame][returnPeriod][3]]);
    }
    return acc;
  }, []);
  let colors = ['match', ['get', 'id']];

  locVals.forEach(([id, value], i) => {
    colors.push(id || `${i}`, valueToColor(value, legendColors));
  });

  colors.push('rgba(0,0,0,0)');
  return colors;
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

const updateAtlas14Data = async (coords) => {
  const response = await fetch(
    `https://cors-proxy.benlinux915.workers.dev/atlas14`,
    {
      method: 'POST',
      body: JSON.stringify(coords),
    }
  );
  const apiText = await response.text();
  return parseAtlas14Data(apiText);
};

const percentileOrder = ['10', '17', '25', 'median', '75', '83', '90'];

const compileTableData = (chartData, hoveredData, togglesInfo) => {
  if (!chartData || !chartData.projectedData) return null;

  let targetRows;
  if (hoveredData) {
    targetRows = [
      ['Last Hovered', null],
      ['60min', 4],
      ['6hr', 7],
      ['12hr', 8],
      ['24hr', 9],
    ];
  } else {
    targetRows = [
      ['5min', 0],
      ['10min', 1],
      ['15min', 2],
      ['30min', 3],
      ['60min', 4],
      ['2hr', 5],
      ['3hr', 6],
      ['6hr', 7],
      ['12hr', 8],
      ['24hr', 9]
    ];
  }

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

const findMax = (obj, initMax=0) => {
  return Object.values(obj).reduce((max, val) => {
    if (Array.isArray(val)) {
      return Math.max(max, ...val);
    } else if (typeof val === 'object' && val !== null) {
      return findMax(val);
    } else {
      throw new Error('Invalid data type');
    }
  }, initMax);
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
  legendColors: [],
  isLoading: false
});

// Set up context provider
export const DataProvider = ({ children }) => {
  const [fileData, setFileData] = useState([]);
  const [atlas14Data, setAtlas14Data] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [yMax, setYMax] = useState(0);
  const [tableData, setTableData] = useState(null);
  const [projectedData, setProjectedData] = useState(null);
  const [adjustments, setAdjustments] = useState(null);
  const [mapColors, setMapColors] = useState([
    'match',
    ['get', 'id'],
    '1',
    'rgba(0,0,0,0)',
    'rgba(0,0,0,0)',
  ]);
  const [lastDurationHovered, setLastDurationHovered] = useState(null);
  const [isLoading, setIsLoading] = useState(0);
  const { selectByOptions, returnPeriod, rcp, timeFrame, togglesInfo } =
    useContext(OptionsContext);
  const { selectedLocation } = useContext(MapContext);

  useEffect(() => {
    loadDataFile(selectByOptions.value, setFileData);
  }, [selectByOptions]);

  useEffect(() => {
    if (atlas14Data && fileData.length && selectedLocation) {
      const locationObj = fileData.find((loc) => loc.id === selectedLocation.id);
      if (locationObj) {
        const newAdjustments = getNearest(locationObj);
        
        const newProjectedData = {};
        for (const rcp of config.rcp.options.map(obj => obj.value)) {
          newProjectedData[rcp] = {};
  
          for (const timeFrame of config.timeFrame.options.map(obj => obj.value)) {
            newProjectedData[rcp][timeFrame] = {};
            for (const returnPeriod in atlas14Data) {
              const atlas14Median = atlas14Data[returnPeriod].median;
              const scenarioAdjustments = newAdjustments[rcp][timeFrame][returnPeriod];
              
              newProjectedData[rcp][timeFrame][returnPeriod] = atlas14Median.reduce(
                (acc, aValue) => {
                  scenarioAdjustments.forEach((adj, i) => {
                    acc[percentileOrder[i]].push(Math.round(aValue * adj * 100) / 100);
                  });
                  return acc;
                },
                { 10: [], 17: [], 25: [], median: [], 75: [], 83: [], 90: [] }
              );
            }
          }
        }
      
        setAdjustments(newAdjustments);
        setProjectedData(newProjectedData);
        setYMax(findMax({ atlas14Data, newProjectedData }));
      } else {
        setAdjustments(null);
        setProjectedData(null);
        setYMax(0);
      }
    }
  }, [fileData, selectedLocation, atlas14Data]);

  useEffect(() => {
    const colors = calculateColors(
      fileData,
      returnPeriod,
      rcp,
      timeFrame,
      legendColors
    );

    if (colors.length > 3) setMapColors(colors);
  }, [fileData, returnPeriod, rcp, timeFrame]);

  useEffect(() => {
    (async () => {
      if (selectedLocation) {
        setIsLoading(true);
        const results = await updateAtlas14Data(selectedLocation.coords);
        setAtlas14Data(results);
        setIsLoading(false); 
      }
    })();
  }, [selectedLocation]);

  useEffect(() => {
    if (atlas14Data && projectedData) {
      setChartData({ atlas14Data: atlas14Data[returnPeriod], projectedData: projectedData[rcp][timeFrame][returnPeriod], yMax: yMax });
    }
  }, [returnPeriod, rcp, timeFrame, projectedData, atlas14Data, yMax]);

  useEffect(() => {
    setTableData(compileTableData(chartData, lastDurationHovered, togglesInfo));
  }, [chartData, lastDurationHovered, togglesInfo]);

  const value = {
    mapColors,
    chartData,
    lastDurationHovered,
    setLastDurationHovered,
    tableData,
    adjustments: adjustments ? adjustments[rcp][timeFrame][returnPeriod] : null,
    percentileOrder,
    legendColors,
    exportData: compileTableData(chartData, null, togglesInfo),
    isLoading
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

DataProvider.propTypes = {
  children: PropTypes.node,
};
