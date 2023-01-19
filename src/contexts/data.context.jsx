import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import Rainbow from 'rainbowvis.js';

import { OptionsContext } from './options.context';

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

const calculateColors = (fileData, returnPeriod, rcp, timeFrame, matcher) => {
  const { locVals, min, max } = fileData.reduce(
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

      if (value < acc.min) acc.min = value;
      if (value > acc.max) acc.max = value;
      acc.locVals.push([id, value]);
      return acc;
    },
    { locVals: [], min: 999, max: -999 }
  );

  const minDiff = Math.abs(min - 1);
  const maxDiff = Math.abs(max - 1);
  const diff = Math.max(minDiff, maxDiff);

  const rainbow = new Rainbow();
  rainbow.setSpectrum('#e2b533', '#1a7c00', '#002eff');
  rainbow.setNumberRange(1 - diff, 1 + diff);
  let colors = ['match', ['get', matcher]];

  const tracker = [];
  locVals.forEach(([id, value], i) => {
    if (tracker.includes(id)) {
      console.log(id);
    } else {
      tracker.push(id);
    }
    colors.push(
      matcher === 'fips_num' ? parseInt(id) : id || `${i}`,
      '#' + rainbow.colourAt(value)
    );
  });

  colors.push('rgba(0,0,0,0)');
  console.log(colors);

  return { colors, min, max };
};

// Set up initial state of context
export const DataContext = createContext({
  legendData: {},
  mapColors: [],
});

// Set up context provider
export const DataProvider = ({ children }) => {
  const [matcher, setMatcher] = useState('fips_num');
  const [fileData, setFileData] = useState([]);
  const [legendData, setLegendData] = useState({ min: 0, max: 0 });
  const [mapColors, setMapColors] = useState([
    'match',
    ['get', matcher],
    '00000',
    'rgba(0,0,0,0)',
  ]);
  const { selectBy, returnPeriod, rcp, timeFrame } = useContext(OptionsContext);

  useEffect(() => {
    loadDataFile(selectBy, setFileData);
    if (selectBy === 'county') {
      setMatcher('fips_num');
    } else if (selectBy === 'muni') {
      setMatcher('GNIS_ID');
    } else if (selectBy === 'huc12') {
      setMatcher('huc12');
    }
  }, [selectBy]);

  useEffect(() => {
    const { colors, min, max } = calculateColors(
      fileData,
      returnPeriod,
      rcp,
      timeFrame,
      matcher
    );
    setMapColors(colors);
    setLegendData({ min, max });
  }, [fileData, returnPeriod, rcp, timeFrame]);

  const value = {
    mapColors,
    legendData,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

DataProvider.propTypes = {
  children: PropTypes.node,
};
