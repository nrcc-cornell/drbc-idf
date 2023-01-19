import React from 'react';
import PropTypes from 'prop-types';

import './button.styles.scss';

const BUTTON_TYPE_CLASSES = {
  inverted: 'inverted',
  centeredSmall: 'centered small',
  small: 'small',
  resetZoom: 'reset-zoom',
};

export default function Button({ children, buttonType, ...otherProps }) {
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  buttonType: PropTypes.string,
  otherProps: PropTypes.object,
};