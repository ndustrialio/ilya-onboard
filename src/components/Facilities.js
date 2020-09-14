import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  facilities: PropTypes.array.isRequired
};

function Facilities({ facilities }) {
  return (
    <div className="facilities-list">
      Welcome to your new React app. You have{' '}
      <span className="facilities-list__count">{facilities.length}</span>{' '}
      facilities. Now go build something awesome.
    </div>
  );
}

Facilities.propTypes = propTypes;

export default Facilities;
