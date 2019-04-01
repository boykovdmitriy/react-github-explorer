import {combineReducers} from 'redux';
import {searchRepositoriesReducer, indexRepositoryIssuesReducer, indexAssignedPersonsReducer} from './repositories';

export default combineReducers({
  searchRepositories: searchRepositoriesReducer,
  indexAssignedPersons: indexAssignedPersonsReducer,
  indexRepositoryIssues: indexRepositoryIssuesReducer,
});
