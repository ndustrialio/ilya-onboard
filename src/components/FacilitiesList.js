import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  facilities: PropTypes.array.isRequired
};

function FacilitiesList({ facilities }) {
  return (
    <div className="facilities-list">
      Welcome to your new React app. You have{' '}
      <span className="facilities-list__count">{facilities.length}</span>{' '}
      facilities. Now go build something awesome.
    </div>
  );
}

FacilitiesList.propTypes = propTypes;

export default FacilitiesList;
