import actionTypes from '../constants/actionTypes';

const INITIAL_STATE = {
  isLoading: true,
  items: [],
  error: null
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.LOAD_FACILITIES_START:
      return {
        ...state,
        isLoading: true,
        error: INITIAL_STATE.error,
        items: INITIAL_STATE.items
      };

    case actionTypes.LOAD_FACILITIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: action.payload
      };

    case actionTypes.LOAD_FACILITIES_FAILURE:
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
