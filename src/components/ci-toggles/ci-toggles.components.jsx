import React, { useContext } from 'react';

import { OptionsContext } from '../../contexts/options.context';

import CiToggle from '../ci-toggle/ci-toggle.component';
import TogglePopper from '../toggle-popper/toggle-popper.component';

import './ci-toggles.styles.scss';

export default function CiToggles() {
  const { togglesInfo, updateToggles } = useContext(OptionsContext);

  return (
    <div className='ci-toggles-container'>
      <div className='ci-toggles-label'>Toggle Confidence Intervals</div>
      <TogglePopper togglesInfo={togglesInfo}>
        {togglesInfo.map((toggleObject) => (
          <CiToggle
            key={toggleObject.index}
            handleChange={(v) => updateToggles(toggleObject.index, v)}
            {...toggleObject}
          />
        ))}
      </TogglePopper>
    </div>
  );
}
