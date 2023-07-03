import React, { useContext } from 'react';

import { OptionsContext } from './contexts/options.context';
import { DataContext } from './contexts/data.context';
import { PdfContext } from './contexts/pdf.context';

import Content from './components/content/content.component';
import Legend from './components/legend/legend.component';
import MapComponent from './components/map/map.component';
import Nav from './components/nav/nav.component';
import OptionPanel from './components/option-panel/option-panel.component';
import PrecipitationTable from './components/precipitation-table/precipitation-table.component';
import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';

import './App.scss';

function App() {
  const { navTab } = useContext(OptionsContext);
  const { tableData, exportData } = useContext(DataContext);
  const { precipDataRef } = useContext(PdfContext);

  return (
    <div className='drbc-layout'>
      <div className='drbc-content-container'>
        <Header />

        <main id='drb-idf-main-container'>
          <div className='top-row'>
            <OptionPanel />
          </div>

          <div className='bottom-row'>
            <div className='panel'>
              <Legend />
              <MapComponent />
            </div>
            <div className='panel'>
              <Nav />
              <Content />
            </div>
          </div>
        </main>

        {navTab === 1 && <>
          <PrecipitationTable data={tableData} />
          <div id='hidden-pdf-table'>
            <PrecipitationTable data={exportData} tableRef={precipDataRef} />
          </div>
        </>}

        <Footer />
      </div>
    </div>
  );
}

export default App;
