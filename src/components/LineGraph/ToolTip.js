import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  point: PropTypes.shape({
    serieColor: PropTypes.string.isRequired,
    data: PropTypes.shape({
      xFormatted: PropTypes.string.isRequired,
      yFormatted: PropTypes.string.isRequired
    })
  })
};
const ToolTip = ({ point: { serieColor, data } }) => {
  return (
    <div className={'tooltip'}>
      <span className={'tooltip__color-swatch'}>
        <span
          className={'color-swatch-square'}
          style={{ backgroundColor: serieColor }}
        ></span>
      </span>
      <span className={'tooltip__values'}>
        <span>x: {data.xFormatted}</span>
        <span>y: {data.yFormatted}</span>
      </span>
    </div>
  );
};

ToolTip.propTypes = propTypes;

export default ToolTip;
