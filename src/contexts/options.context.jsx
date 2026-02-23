import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

import config from './config.json';
import { tabsInfo } from './tabsInfo.jsx';
// import tabsInfo from './tabsInfo.json';
import togglesConfig from './togglesInfo.json';

// Set up initial state of context
export const OptionsContext = createContext({
  selectors: [],
  method: '',
  selectBy: {},
  selectByOptions: {},
  returnPeriod: '',
  scenario: '',
  timeFrame: '',
  navTab: 0,
  setNavTab: () => null,
  navTabOptions: [],
  tabContent: [],
  togglesInfo: [],
});

// Set up context provider
export const OptionsProvider = ({ children }) => {
  const [method, setMethod] = useState(config.method.options[0].value);
  const [selectBy, setSelectBy] = useState(config.selectBy.options[0].value);
  const [returnPeriod, setReturnPeriod] = useState(
    config.returnPeriod.options[0].value
  );
  const [rcp, setRcp] = useState(config.locarcp.options[0].value);
  const [ssp, setSsp] = useState(config.loca2ssp.options[0].value);
  const [timeFrame, setTimeFrame] = useState(config.timeFrame.options[0].value);
  const [navTab, setNavTab] = useState(0);
  const [togglesInfo, setTogglesInfo] = useState(togglesConfig);

  const changeScenario = (newScenario) => {
    if (newScenario === config.locarcp.options[0].value || newScenario === config.loca2ssp.options[0].value) {
      setRcp(config.locarcp.options[0].value);
      setSsp(config.loca2ssp.options[0].value);
    } else if (newScenario === config.locarcp.options[1].value || newScenario === config.loca2ssp.options[2].value) {
      setRcp(config.locarcp.options[1].value);
      setSsp(config.loca2ssp.options[2].value);
    } else if (newScenario === config.loca2ssp.options[1].value) {
      setSsp(config.loca2ssp.options[1].value);
    }
  };

  const selectors = [
    {
      label: config.method.name,
      currentValue: method,
      setFunction: setMethod,
      optionsArray: config.method.options,
    },
    {
      label: config.selectBy.name,
      currentValue: selectBy,
      setFunction: setSelectBy,
      optionsArray: config.selectBy.options,
    },
    {
      label: config.locarcp.name,
      currentValue: rcp,
      setFunction: changeScenario,
      optionsArray: config.locarcp.options,
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
  if (method === 'loca2') {
    selectors[2] = {
      label: config.loca2ssp.name,
      currentValue: ssp,
      setFunction: changeScenario,
      optionsArray: config.loca2ssp.options,
    }
  }

  const updateToggles = (index, newValue) => {
    const newToggleState = [...togglesInfo];
    newToggleState[index].checked = newValue;
    setTogglesInfo(newToggleState);
  };

  const value = {
    selectors,
    method,
    selectBy,
    selectByOptions: config.selectBy.options.find(
      (opt) => opt.value === selectBy
    ),
    returnPeriod,
    scenario: method === 'loca' ? rcp : ssp,
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
