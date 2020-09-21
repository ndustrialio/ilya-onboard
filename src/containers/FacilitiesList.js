import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as facilitiesActionCreators from '../actions/facilities';
import { Facilities, Loader } from '../components/';
import contxtSdk from '../services/contxt';

class FacilitiesList extends Component {
  static propTypes = {
    loadFacilities: PropTypes.func.isRequired,
    facilities: PropTypes.array,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    isLoading: PropTypes.bool
  };

  componentDidMount() {
    this.props.loadFacilities();
  }

  render() {
    window.contxt = contxtSdk;

    return (
      <div className="facilities-list__container">
        {this.props.isLoading ? (
          <Loader className="facilities-list__loader" />
        ) : (
          <Facilities {...this.props} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  facilities: state.facilities.items,
  isLoading: state.facilities.isLoading
});

const mapDispatchToProps = (dispatch) => ({
  loadFacilities: () => dispatch(facilitiesActionCreators.loadFacilities())
});

export default connect(mapStateToProps, mapDispatchToProps)(FacilitiesList);
