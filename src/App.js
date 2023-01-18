import React from 'react';

import Content from './components/content/content.component';
import Legend from './components/legend/legend.component';
import MapComponent from './components/map/map.component';
import Nav from './components/nav/nav.component';
import OptionPanel from './components/option-panel/option-panel.component';

import './App.scss';

function App() {
  return (
    <div className='drbc-layout-mock'>
      <div className='drbc-content-container-mock'>
        <h1 className='drbc-header-mock'>DRBC Header Content</h1>

        <div id='drb-idf-main-container'>
          <div className='top-panel'>
            <Legend />
            <OptionPanel />
          </div>
          <div className='bottom-panel'>
            <div className='left-panel'>
              <MapComponent />
            </div>
            <div className='right-panel'>
              <Nav />
              <Content />
            </div>
          </div>
        </div>

        <h1 className='drbc-footer-mock'>DRBC Footer Content</h1>
      </div>
    </div>
  );
}

export default App;
