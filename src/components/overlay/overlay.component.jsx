import React from 'react';
import PropTypes from 'prop-types';
import { Source, Layer } from 'react-map-gl';

export default function Overlay({
  name,
  sourceUrl,
  sourceLayer,
  visibility,
  colors,
  selectedId,
}) {
  return (
    <Source type='vector' url={sourceUrl} promoteId='id' id={name + '-colors'}>
      <Layer
        id={name + '-fill'}
        type='fill'
        source-layer={sourceLayer}
        layout={{
          visibility: visibility,
        }}
        paint={{
          'fill-color': colors,
          'fill-opacity': [
            'case',
            [
              'any',
              ['boolean', ['feature-state', 'hover'], false],
              ['==', ['get', 'id'], selectedId],
            ],
            0.7,
            0.6,
          ],
          'fill-outline-color': [
            'case',
            [
              'any',
              ['boolean', ['feature-state', 'hover'], false],
              ['==', ['get', 'id'], selectedId],
            ],
            'rgb(0,0,0)',
            'rgb(80,80,80)',
          ],
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
  visibility: PropTypes.string.isRequired,
  colors: PropTypes.array.isRequired,
  selectedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
