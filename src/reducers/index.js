import { combineReducers } from 'redux';
import facilities from './facilities';
import feeds from './feeds';

export default combineReducers({
  facilities,
  feeds
});
