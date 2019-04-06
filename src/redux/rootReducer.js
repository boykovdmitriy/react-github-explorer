import {combineReducers} from 'redux';
import {searchRepositoriesReducer} from './repositories';
import {indexRepositoryIssuesReducer, indexAssignedPersonsReducer} from './issues';

export default combineReducers({
  searchRepositories: searchRepositoriesReducer,
  indexAssignedPersons: indexAssignedPersonsReducer,
  indexRepositoryIssues: indexRepositoryIssuesReducer,
});
