import React, { createContext, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import bbox from '@turf/bbox';

// Bounding box used to set initial view
const INIT_BOUNDS = [-76.89, 38.4, -73.74, 42.91];

// Clamps latitude
function isOutsideLatBounds(lat) {
  return lat > INIT_BOUNDS[3] + 0.2 || lat < INIT_BOUNDS[1] + 0.2;
}

// Clamps longitude
function isOutsideLngBounds(lng) {
  return lng > INIT_BOUNDS[2] + 0.2 || lng < INIT_BOUNDS[0] + 0.2;
}

// Set up initial state of context
export const MapContext = createContext({
  mapRef: null,
  viewState: {},
  handleLoad: () => null,
  handleMapClick: () => null,
  handlePanning: () => null,
  resetViewState: () => null,
  isInitView: true,
});

// Set up context provider
export const MapProvider = ({ children }) => {
  const mapRef = useRef(null);
  const [viewState, setViewState] = useState({
    bounds: INIT_BOUNDS,
  });
  const [initView, setInitView] = useState(null);
  const [isInitView, setIsInitView] = useState(true);

  useEffect(() => {
    try {
      const currCenter = mapRef.current.getCenter();
      const currZoom = mapRef.current.getZoom();

      setIsInitView(
        currCenter.lat === initView.center[1] &&
          currCenter.lng === initView.center[0] &&
          currZoom === initView.zoom
      );
    } catch {
      setIsInitView(true);
    }
  }, [viewState, initView]);

  // Tries to get new location information, stores it if successful, moves map to new location
  const handleMapClick = async (e) => {
    if (mapRef.current) {
      const feature = e.features[0];
      if (feature) {
        // calculate the bounding box of the feature
        const [minLng, minLat, maxLng, maxLat] = bbox(feature);

        console.log(feature.properties);

        mapRef.current.fitBounds(
          [
            [minLng, minLat],
            [maxLng, maxLat],
          ],
          {
            padding: { top: 20, bottom: 20, left: 20, right: 20 },
            duration: 1000,
          }
        );
      }
    }
  };

  // Limits panning to bbox coordinates
  const handlePanning = (view) => {
    if (isOutsideLatBounds(view.latitude)) {
      view.latitude = viewState.latitude;
    }

    if (isOutsideLngBounds(view.longitude)) {
      view.longitude = viewState.longitude;
    }

    setViewState((prev) => {
      return {
        ...prev,
        ...view,
      };
    });
  };

  // Increases zoom step and sets init zoom for reset button to use
  const handleLoad = (e) => {
    e.target.scrollZoom.setWheelZoomRate(1 / 100);

    const center = e.target.getCenter();
    setInitView({
      zoom: e.target.getZoom(),
      center: [center.lng, center.lat],
    });
  };

  // Moves map to initial view
  const resetViewState = () => {
    mapRef.current.flyTo({
      ...initView,
      speed: 0.8,
      essential: true,
    });
  };

  const value = {
    mapRef,
    viewState,
    handleLoad,
    handleMapClick,
    handlePanning,
    resetViewState,
    isInitView,
  };
  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};

MapProvider.propTypes = {
  children: PropTypes.node,
};
