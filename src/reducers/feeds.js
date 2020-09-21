import {
  loadTemperatureOutputFailed,
  loadTemperatureOutput,
  setTemperatureOutput
} from '../actions/feeds';

import { updateState } from './helpers';
import { createReducer } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  isLoading: true,
  temperatureOutput: [],
  error: null
};

const reducer = createReducer(INITIAL_STATE, {
  [loadTemperatureOutput]: (state, action) =>
    updateState(state, {
      isLoading: true,
      error: INITIAL_STATE.error,
      temperatureOutput: INITIAL_STATE.temperatureOutput
    }),

  [setTemperatureOutput]: (state, action) => ({
    ...state,
    isLoading: false,
    temperatureOutput: action.payload.map((event) => ({
      ...event,
      value: Number.parseFloat(event.value)
    }))
  }),

  [loadTemperatureOutputFailed]: (state, action) => ({
    ...state,
    isLoading: false,
    error: action.payload
  })
});

export default reducer;
