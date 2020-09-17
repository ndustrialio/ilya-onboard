import { createAction } from '@reduxjs/toolkit';

const loadTemperatureOutput = createAction('LOAD_FEEDS');

const setTemperatureOutput = createAction(
  'LOAD_FEEDS_SUCCESS',
  (temperatureOutput) => ({
    payload: temperatureOutput.records
  })
);

const loadTemperatureOutputFailed = createAction(
  'LOAD_FEEDS_FAILURE',
  (error) => ({
    paylod: {
      error: error
    }
  })
);

export {
  loadTemperatureOutput,
  setTemperatureOutput,
  loadTemperatureOutputFailed
};
