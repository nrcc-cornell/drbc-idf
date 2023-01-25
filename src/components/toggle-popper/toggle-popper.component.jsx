import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Popper, Fade } from '@mui/material';

import './toggle-popper.styles.scss';

export default function TogglePopper({ children, togglesInfo }) {
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <div
      onMouseEnter={(event) => setAnchorEl(event.currentTarget)}
      onMouseLeave={() => setAnchorEl(null)}
    >
      {children}
      <Popper
        id='toggles-popper'
        open={anchorEl ? true : false}
        anchorEl={anchorEl}
        placement='top'
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={300}>
            <div className='toggles-popper-content'>
              <div className='toggles-popper-label'>Confidence Intervals</div>
              <div className='toggles'>
                {togglesInfo.map((info) => (
                  <div key={info.index} className='toggle-percent'>
                    {info.percent}
                  </div>
                ))}
              </div>
            </div>
          </Fade>
        )}
      </Popper>
    </div>
  );
}

TogglePopper.propTypes = {
  children: PropTypes.node,
  togglesInfo: PropTypes.array,
};
