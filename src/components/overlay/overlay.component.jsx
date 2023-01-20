import React from 'react';
import PropTypes from 'prop-types';
import { Source, Layer } from 'react-map-gl';

export default function Overlay({
  name,
  sourceUrl,
  sourceLayer,
  opacity,
  colors,
}) {
  console.log(colors);
  return (
    <Source type='vector' url={sourceUrl} id={name + '-colors'}>
      <Layer
        id={name + '-fill'}
        type='fill'
        source-layer={sourceLayer}
        paint={{
          'fill-color': colors,
          'fill-opacity': opacity,
          'fill-outline-color': 'black',
        }}
        beforeId='basin-outline'
      />
    </Source>
  );
}

Overlay.propTypes = {
  name: PropTypes.string.isRequired,
  sourceUrl: PropTypes.string.isRequired,
  sourceLayer: PropTypes.string.isRequired,
  opacity: PropTypes.number.isRequired,
  colors: PropTypes.array.isRequired,
};
