import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  render: PropTypes.func
};
const Sidebar = ({ render }) => {
  return <div className={'sidebar'}>{render()}</div>;
};

Sidebar.propTypes = propTypes;
export default Sidebar;
