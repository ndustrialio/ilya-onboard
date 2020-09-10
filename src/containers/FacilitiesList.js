import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { Loader } from '@ndustrial/nd-react-common';
import * as facilitiesActionCreators from '../actions/facilities';
import FacilitiesList from '../components/FacilitiesList';

class ConnectedFacilitiesList extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      facilities: PropTypes.shape({
        loadFacilities: PropTypes.func.isRequired
      }).isRequired
    }).isRequired,
    facilities: PropTypes.array,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    isLoading: PropTypes.bool
  };

  componentDidMount() {
    this.props.actions.facilities.loadFacilities();
  }

  render() {
    return (
      <div className="facilities-list__container">
        {this.props.isLoading ? (
          <Loader className="facilities-list__loader" />
        ) : (
          <FacilitiesList {...this.props} />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    facilities: state.facilities.items,
    isLoading: state.facilities.isLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      facilities: bindActionCreators(facilitiesActionCreators, dispatch)
    }
  };
}

export { ConnectedFacilitiesList as FacilitiesList };
export default connect(mapStateToProps, mapDispatchToProps)(
  ConnectedFacilitiesList
);
