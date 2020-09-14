export const LOAD_FEEDS = 'LOAD_FEEDS';
export const LOAD_FEEDS_SUCCESS = 'LOAD_FEEDS_SUCCESS';
export const LOAD_FEEDS_FAILURE = 'LOAD_FEEDS_FAILURE';

function loadTemperatureOutput() {
  return {
    type: LOAD_FEEDS
  };
}

function setTemperatureOutput(temperatureOutput) {
  return {
    type: LOAD_FEEDS_SUCCESS,
    payload: temperatureOutput
  };
}

function loadTemperatureOutputFailed(error) {
  return {
    type: LOAD_FEEDS_FAILURE,
    payload: error
  };
}

export {
  loadTemperatureOutput,
  setTemperatureOutput,
  loadTemperatureOutputFailed
};
