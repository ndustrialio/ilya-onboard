import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Loader } from '@ndustrial/nd-react-common';
import { withAPI } from '../api';
import {
  loadTemperatureOutput,
  setTemperatureOutput,
  loadTemperatureOutputFailed
} from '../actions/feeds';
import TemperatureBox from '../components/TemperatureBox';

const getStartingDateRange = () => {
  const today = new Date();
  const offset = 6 - today.getDay();
  const startDate = new Date(new Date().setDate(today.getDate() - offset));
  const endDate = new Date(new Date().setDate(startDate.getDate() + 6));

  return {
    startDate,
    endDate
  };
};

class TemperatureFeed extends Component {
  static propTypes = {
    api: PropTypes.object,
    temperatureOutput: PropTypes.array.isRequired,
    loadTemperature: PropTypes.func.isRequired,
    setTemperature: PropTypes.func.isRequired,
    loadFailed: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    isLoading: PropTypes.bool
  };

  constructor(props) {
    super(props);
    const { startDate, endDate } = getStartingDateRange();
    this.state = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      timeStart: Math.round(startDate.getTime() / 1000),
      timeEnd: Math.round(endDate.getTime() / 1000)
    };
  }

  componentDidMount() {
    const { api, loadTemperature, setTemperature, loadFailed } = this.props;

    // TODO: Move to actions to follow ndustrial standards
    loadTemperature();
    api
      .getOutputs({ ...this.state })
      .then((response) => {
        setTemperature(response);
      })
      .catch((error) => {
        loadFailed(error);
      });
  }

  render() {
    const { temperatureOutput, isLoading } = this.props;
    return (
      <Fragment>
        {!isLoading ? (
          <TemperatureBox
            temperatureOutput={temperatureOutput}
            {...this.state}
          />
        ) : (
          <Loader className="facilities-list__loader" />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.feeds.isLoading,
  temperatureOutput: state.feeds.temperatureOutput
});

const mapDispatchToProps = (dispatch) => ({
  loadTemperature: () => dispatch(loadTemperatureOutput()),
  setTemperature: (output) => dispatch(setTemperatureOutput(output)),
  loadFailed: () => dispatch(loadTemperatureOutputFailed())
});

export default withAPI(
  connect(mapStateToProps, mapDispatchToProps)(TemperatureFeed)
);
