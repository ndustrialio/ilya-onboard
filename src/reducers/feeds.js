import {
  LOAD_FEEDS,
  LOAD_FEEDS_SUCCESS,
  LOAD_FEEDS_FAILURE
} from '../actions/feeds';

import { updateState } from './helpers';

const INITIAL_STATE = {
  isLoading: true,
  temperatureOutput: {},
  error: null
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_FEEDS:
      return updateState(state, {
        isLoading: true,
        error: INITIAL_STATE.error,
        temperatureOutput: INITIAL_STATE.temperatureOutput
      });

    case LOAD_FEEDS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        temperatureOutput: action.payload
      };

    case LOAD_FEEDS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
}

export default reducer;
