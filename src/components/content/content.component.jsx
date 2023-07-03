import React, { useContext } from 'react';


import Chart from '../chart/chart.component';

import { OptionsContext } from '../../contexts/options.context';

import './content.styles.scss';

const componentOptions = {
  highchart: <Chart />
};

export default function Content() {
  const { tabType, tabContent } = useContext(OptionsContext);

  const renderContent = (tabContent) => {
    return <div>{tabType === 'normal' ? tabContent : componentOptions[tabContent]}</div>
  };

  return <div id='content-container'>{renderContent(tabContent)}</div>;
}
