import React, { createContext, useRef } from 'react';
import PropTypes from 'prop-types';

// Set up initial state of context
export const PdfContext = createContext({
  changeFactorRef: null,
  precipDataRef: null,
  chartRef: null,
});

// Set up context provider
export const PdfProvider = ({ children }) => {
  const changeFactorRef = useRef(null);
  const precipDataRef = useRef(null);
  const chartRef = useRef(null);

  const value = {
    changeFactorRef,
    precipDataRef,
    chartRef,
  };
  return <PdfContext.Provider value={value}>{children}</PdfContext.Provider>;
};

PdfProvider.propTypes = {
  children: PropTypes.node,
};
