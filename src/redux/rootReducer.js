import {combineReducers} from 'redux';
import {applicationsReducer} from './applications';
import {searchRepositoriesReducer, indexRepositoryIssuesReducer, indexAssignedPersonsReducer} from './repositories';

export default combineReducers({
  applications: applicationsReducer,
  searchRepositories: searchRepositoriesReducer,
  indexAssignedPersons: indexAssignedPersonsReducer,
  indexRepositoryIssues: indexRepositoryIssuesReducer,
});
