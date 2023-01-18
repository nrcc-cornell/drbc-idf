import React, { useContext } from 'react';

import { OptionsContext } from '../../contexts/options.context';

import ToggleButtons from '../toggle-buttons/toggle-buttons.component';

import './option-panel.styles.scss';

export default function OptionPanel() {
  const { selectors } = useContext(OptionsContext);

  return (
    <div className='option-panel-container'>
      {selectors.map((selectorInfo, i) => (
        <ToggleButtons key={i} {...selectorInfo} />
      ))}
    </div>
  );
}
