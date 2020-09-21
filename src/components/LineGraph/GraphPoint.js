import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.string.isRequired,
  r: PropTypes.number
};

const GraphPoint = ({ id, r = 5 }) => {
  return (
    <circle
      id={id}
      className={'line-graph-point line-graph-point--intialized'}
      r={r}
    ></circle>
  );
};

GraphPoint.propTypes = propTypes;
export default GraphPoint;
