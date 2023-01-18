import React, { useContext } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import Map from 'react-map-gl';

import { MapContext } from '../../contexts/map.context';
import { OptionsContext } from '../../contexts/options.context';
import overlayInfo from '../../contexts/overlayInfo.json';

import Button from '../button/button.component';
import Overlay from '../overlay/overlay.component';

import './map.styles.scss';

// Set token for mapbox API
mapboxgl.accessToken =
  'pk.eyJ1IjoiaWRmY3VydmV0b29sYWRtaW4iLCJhIjoiY2t2NzFiZXRmMWt0eDJvcDZzczBmMzRrYSJ9.U0DXUV08p4g3NsJWyb7DaQ';

//// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
mapboxgl.workerClass =
  //// eslint-disable-next-line @typescript-eslint/no-var-requires
  require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

export default function MapComponent() {
  const {
    mapRef,
    viewState,
    handleLoad,
    handleMapClick,
    handlePanning,
    resetViewState,
    isInitView,
  } = useContext(MapContext);
  const { selectBy } = useContext(OptionsContext);

  return (
    <div className='map-container'>
      <Map
        {...viewState}
        ref={mapRef}
        mapStyle='mapbox://styles/idfcurvetooladmin/clcj2ywq4000014qgnj0dvxjx'
        interactiveLayerIds={[selectBy + '-fill']}
        boxZoom={false}
        dragRotate={false}
        touchPitch={false}
        doubleClickZoom={false}
        attributionControl={false}
        onMove={(evt) => handlePanning(evt.viewState)}
        onClick={handleMapClick}
        onLoad={handleLoad}
        minZoom={5}
        maxZoom={14}
      >
        {Object.values(overlayInfo).map((overlay, i) => (
          <Overlay
            key={i}
            {...overlay}
            opacity={selectBy === overlay.name ? 0.5 : 0}
            colors={[]}
          />
        ))}
      </Map>

      {!isInitView && (
        <div className='reset-zoom-button'>
          <Button buttonType='resetZoom' onClick={resetViewState}>
            Reset Zoom
          </Button>
        </div>
      )}
    </div>
  );
}
