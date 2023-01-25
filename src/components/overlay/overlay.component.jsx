import React from 'react';
import PropTypes from 'prop-types';
import { Source, Layer } from 'react-map-gl';

export default function Overlay({
  name,
  sourceUrl,
  sourceLayer,
  idKey,
  visibility,
  colors,
  selectedId,
}) {
  return (
    <Source type='vector' url={sourceUrl} id={name + '-colors'}>
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
              ['==', ['get', idKey], selectedId],
            ],
            0.75,
            0.5,
          ],
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
  idKey: PropTypes.string.isRequired,
  visibility: PropTypes.string.isRequired,
  colors: PropTypes.array.isRequired,
  selectedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
