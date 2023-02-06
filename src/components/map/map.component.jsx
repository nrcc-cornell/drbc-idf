import React, { useContext, useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import Map, { Marker, AttributionControl } from 'react-map-gl';
import InfoIcon from '@mui/icons-material/Info';

import { MapContext } from '../../contexts/map.context';
import { OptionsContext } from '../../contexts/options.context';
import { DataContext } from '../../contexts/data.context';

import Button from '../button/button.component';
import Overlay from '../overlay/overlay.component';
import LocationInfo from '../location-info/location-info.component';

import './map.styles.scss';

// Set token for mapbox API
mapboxgl.accessToken =
  'pk.eyJ1IjoiaWRmY3VydmV0b29sYWRtaW4iLCJhIjoiY2xkdGE0M3hpMDhpYzNxcGM1dm9yYjk5YyJ9.i1-mSRRpL-fw0mUBY4o_6A';

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
    overlayInfo,
    selectedLocation,
  } = useContext(MapContext);
  const { selectBy } = useContext(OptionsContext);
  const { mapColors } = useContext(DataContext);
  const [hovered, setHovered] = useState(null);
  const hoveredId = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      overlayInfo.forEach((overlay) => {
        const layerId = overlay.name + '-fill';
        const source = overlay.name + '-colors';
        const sourceLayer = overlay.sourceLayer;

        mapRef.current.on('mousemove', layerId, (e) => {
          // Handle changing cursor
          mapRef.current.getCanvas().style.cursor = 'pointer';

          // Handle highlighting hovered polygon
          if (e.features.length > 0) {
            if (hoveredId.current !== null) {
              mapRef.current.setFeatureState(
                {
                  source: source,
                  id: hoveredId.current,
                  sourceLayer: sourceLayer,
                },
                { hover: false }
              );
            }
            hoveredId.current = e.features[0].id;
            setHovered(e.features[0].properties);
            mapRef.current.setFeatureState(
              {
                source: source,
                id: hoveredId.current,
                sourceLayer: sourceLayer,
              },
              { hover: true }
            );
          }
        });

        mapRef.current.on('mouseleave', layerId, () => {
          // Handle resetting cursor
          mapRef.current.getCanvas().style.cursor = '';

          // Handle cleaning up highlight
          if (hoveredId.current !== null) {
            mapRef.current.setFeatureState(
              {
                source: source,
                id: hoveredId.current,
                sourceLayer: sourceLayer,
              },
              { hover: false }
            );
          }
          hoveredId.current = null;
          setHovered(null);
        });
      });
    }
  }, [mapRef.current]);

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
        logoPosition='top-left'
        onMove={(evt) => handlePanning(evt.viewState)}
        onClick={handleMapClick}
        onLoad={handleLoad}
        minZoom={5.5}
        maxZoom={14}
      >
        {Object.values(overlayInfo).map((overlay, i) => (
          <Overlay
            key={i}
            {...overlay}
            visibility={selectBy === overlay.name ? 'visible' : 'none'}
            colors={mapColors}
            selectedId={
              selectedLocation ? selectedLocation.id : selectedLocation
            }
          />
        ))}

        {selectedLocation && (
          <Marker
            longitude={selectedLocation.coords.lng}
            latitude={selectedLocation.coords.lat}
            color='#b20e0e'
          ></Marker>
        )}

        <AttributionControl position='top-right' compact={true}>
          {InfoIcon}
        </AttributionControl>
      </Map>

      <LocationInfo hovered={hovered} />

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
