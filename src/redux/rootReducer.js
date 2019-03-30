import { combineReducers } from 'redux';
import { applicationsReducer } from './applications';

export default combineReducers({
  applications: applicationsReducer,
});
