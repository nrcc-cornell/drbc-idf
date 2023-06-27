import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

import config from './config.json';
import { tabsInfo } from './tabsInfo.jsx';
// import tabsInfo from './tabsInfo.json';
import togglesConfig from './togglesInfo.json';

// Set up initial state of context
export const OptionsContext = createContext({
  selectors: [],
  selectBy: {},
  selectByOptions: {},
  returnPeriod: '',
  rcp: '',
  timeFrame: '',
  navTab: 0,
  setNavTab: () => null,
  navTabOptions: [],
  tabContent: [],
  togglesInfo: [],
});

// Set up context provider
export const OptionsProvider = ({ children }) => {
  const [selectBy, setSelectBy] = useState(config.selectBy.options[0].value);
  const [returnPeriod, setReturnPeriod] = useState(
    config.returnPeriod.options[0].value
  );
  const [rcp, setRcp] = useState(config.rcp.options[0].value);
  const [timeFrame, setTimeFrame] = useState(config.timeFrame.options[0].value);
  const [navTab, setNavTab] = useState(0);
  const [togglesInfo, setTogglesInfo] = useState(togglesConfig);

  const selectors = [
    {
      label: config.selectBy.name,
      currentValue: selectBy,
      setFunction: setSelectBy,
      optionsArray: config.selectBy.options,
    },
    {
      label: config.rcp.name,
      currentValue: rcp,
      setFunction: setRcp,
      optionsArray: config.rcp.options,
    },
    {
      label: config.timeFrame.name,
      currentValue: timeFrame,
      setFunction: setTimeFrame,
      optionsArray: config.timeFrame.options,
    },
    {
      label: config.returnPeriod.name,
      currentValue: returnPeriod,
      setFunction: setReturnPeriod,
      optionsArray: config.returnPeriod.options,
    },
  ];

  const updateToggles = (index, newValue) => {
    const newToggleState = [...togglesInfo];
    newToggleState[index].checked = newValue;
    setTogglesInfo(newToggleState);
  };

  const value = {
    selectors,
    selectBy,
    selectByOptions: config.selectBy.options.find(
      (opt) => opt.value === selectBy
    ),
    returnPeriod,
    rcp,
    timeFrame,
    navTab,
    setNavTab,
    navTabOptions: tabsInfo.map((tabInfo) => tabInfo.name),
    tabType: tabsInfo[navTab].contentType,
    tabContent: tabsInfo[navTab].content,
    togglesInfo,
    updateToggles,
  };
  return (
    <OptionsContext.Provider value={value}>{children}</OptionsContext.Provider>
  );
};

OptionsProvider.propTypes = {
  children: PropTypes.node,
};
