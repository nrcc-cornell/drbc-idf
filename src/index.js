import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { MapProvider } from './contexts/map.context';
import { OptionsProvider } from './contexts/options.context';
import { DataProvider } from './contexts/data.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <OptionsProvider>
      <DataProvider>
        <MapProvider>
          <App />
        </MapProvider>
      </DataProvider>
    </OptionsProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
