import {combineReducers} from 'redux';
import {applicationsReducer} from './applications';
import {repositoriesReducer} from './repositories';

export default combineReducers({
  applications: applicationsReducer,
  repositories: repositoriesReducer,

});
