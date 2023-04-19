import React from 'react';
import PropTypes from 'prop-types';
import { Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledToggleButton = styled(ToggleButton)(() => ({
  '&.MuiToggleButton-root': {
    color: 'rgb(40,40,40)',
    borderColor: 'rgb(49, 115, 214)',
    paddingTop: '9px',
    fontSize: '12px',
    textTransform: 'none',
    fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
    minWidth: '42px',
    '&:hover': {
      backgroundColor: 'rgba(49, 115, 214, 0.1)',
    },
    '&.Mui-selected': {
      backgroundColor: '#194186',
      color: 'white',
    },
    '&.Mui-disabled': {
      backgroundColor: 'rgba(0,0,0,0.05)',
      color: 'rgb(120,120,120)',
      fontStyle: 'italic',
    },
  },
}));

const StyledLabel = styled(Typography)(() => ({
  '&.MuiTypography-root': {
    fontFamily: "Georgia, 'Times New Roman', Times, serif",
    fontSize: '14px',
  },
}));

export default function ToggleButtons({
  label,
  currentValue,
  setFunction,
  optionsArray,
}) {
  const handleChange = (event, newValue) => {
    if (newValue !== null) {
      setFunction(newValue);
    }
  };

  return (
    <div className='toggle-buttons-container'>
      <StyledLabel>{label}:</StyledLabel>
      <ToggleButtonGroup
        value={currentValue}
        exclusive
        onChange={handleChange}
        aria-label={label || ''}
        size='small'
      >
        {optionsArray.map((optionInfo) => (
          <StyledToggleButton
            key={optionInfo.value}
            value={optionInfo.value}
            aria-label={optionInfo.ariaLabel || ''}
            disabled={optionInfo.disabled || false}
          >
            {optionInfo.text}
          </StyledToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}

ToggleButtons.propTypes = {
  label: PropTypes.string,
  currentValue: PropTypes.string.isRequired,
  setFunction: PropTypes.func.isRequired,
  optionsArray: PropTypes.array.isRequired,
};
