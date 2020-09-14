import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Loader } from '@ndustrial/nd-react-common';
import { withAPI } from '../api';
import {
  setTemperatureOutput,
  loadTemperatureOutputFailed
} from '../actions/feeds';

class TemperatureFeed extends Component {
  static propTypes = {
    api: PropTypes.object,
    temperatureOutput: PropTypes.object.isRequired,
    // loadTemperature: PropTypes.func.isRequired,
    setTemperature: PropTypes.func.isRequired,
    loadFailed: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    isLoading: PropTypes.bool
  };

  componentDidMount() {
    const { api, setTemperature, loadFailed } = this.props;

    api
      .getFeeds()
      .then((response) => {
        setTemperature(response);
      })
      .catch((error) => {
        loadFailed(error);
      });
  }

  render() {
    return (
      <div className="facilities-list__container">
        {this.props.temperatureOutput ? (
          `temperature output`
        ) : (
          <Loader className="facilities-list__loader" />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  temperatureOutput: state.feeds.temperatureOutput
});

const mapDispatchToProps = (dispatch) => ({
  // loadTemperature: () => dispatch(loadTemperatureOutput()),
  setTemperature: (output) => dispatch(setTemperatureOutput(output)),
  loadFailed: () => dispatch(loadTemperatureOutputFailed())
});

export default withAPI(
  connect(mapStateToProps, mapDispatchToProps)(TemperatureFeed)
);
