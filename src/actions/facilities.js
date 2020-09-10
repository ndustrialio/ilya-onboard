import actionTypes from '../constants/actionTypes';
import contxtService from '../services/contxt';

function loadFacilities() {
  return function(dispatch) {
    dispatch({
      type: actionTypes.LOAD_FACILITIES_START
    });

    return contxtService.facilities
      .getAll()
      .then((facilities) => {
        dispatch({
          type: actionTypes.LOAD_FACILITIES_SUCCESS,
          payload: facilities
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.LOAD_FACILITIES_FAILURE,
          error: true,
          payload: err
        });

        throw err;
      });
  };
}

export { loadFacilities };
