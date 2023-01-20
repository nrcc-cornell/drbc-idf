import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

import selectorsInfo from './selectorsInfo.json';
import tabsInfo from './tabsInfo.json';

// Set up initial state of context
export const OptionsContext = createContext({
  selectors: [],
  selectBy: {},
});

// Set up context provider
export const OptionsProvider = ({ children }) => {
  const [selectBy, setSelectBy] = useState('county');
  const [returnPeriod, setReturnPeriod] = useState('2');
  const [rcp, setRcp] = useState('45');
  const [timeFrame, setTimeFrame] = useState('2020-2069');
  const [navTab, setNavTab] = useState(0);

  const selectors = [
    {
      label: selectorsInfo['selectBy'].name,
      currentValue: selectBy,
      setFunction: setSelectBy,
      optionsArray: selectorsInfo['selectBy'].options,
    },
    {
      label: selectorsInfo['rcp'].name,
      currentValue: rcp,
      setFunction: setRcp,
      optionsArray: selectorsInfo['rcp'].options,
    },
    {
      label: selectorsInfo['timeFrame'].name,
      currentValue: timeFrame,
      setFunction: setTimeFrame,
      optionsArray: selectorsInfo['timeFrame'].options,
    },
    {
      label: selectorsInfo['returnPeriod'].name,
      currentValue: returnPeriod,
      setFunction: setReturnPeriod,
      optionsArray: selectorsInfo['returnPeriod'].options,
    },
  ];

  const value = {
    selectors,
    selectBy,
    returnPeriod,
    rcp,
    timeFrame,
    navTab,
    setNavTab,
    navTabOptions: tabsInfo.map((tabInfo) => tabInfo.name),
    tabContent: tabsInfo[navTab].content,
  };
  return (
    <OptionsContext.Provider value={value}>{children}</OptionsContext.Provider>
  );
};

OptionsProvider.propTypes = {
  children: PropTypes.node,
};
