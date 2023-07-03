import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from '@mui/material';

export default function CiToggle({
  checked,
  handleChange,
  ariaLabel,
  name,
  color,
}) {
  return (
    <Switch
      checked={checked}
      onChange={() => handleChange(!checked)}
      name={name}
      inputProps={{ 'aria-label': ariaLabel }}
      sx={{
        '& .MuiSwitch-switchBase': {
          marginTop: 1.0,
          padding: 0,
          transform: 'translateX(8px)',
          '&.Mui-checked': {
            transform: 'translateX(28px)'
          }
        },
        '& .MuiButtonBase-root': { color: `${color} !important` },
        '& .Mui-checked.Mui-checked + .MuiSwitch-track': {
          backgroundColor: color,
          opacity: 0.3,
        },
        '& .MuiSwitch-track': {
          opacity: 0.15,
        },
      }}
    />
  );
}

CiToggle.propTypes = {
  checked: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
