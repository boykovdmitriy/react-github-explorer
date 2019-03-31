import {all} from 'redux-saga/effects';
import {repositoriesActions} from './repositories.actions';
import {defRequestSaga} from '../../utils/defSaga';
import {toParams} from '../../utils/params';

export const urls = {
  index: (payload) => `search/repositories/${toParams(payload.params)}`,
  getRepositoryIssues: ({owner, repo, params}) => `/repos/${owner}/${repo}/issues/${toParams(params)}`,
  getAssignedToRRepositoryIssuesRepositoryIssues: ({owner, repo}) => `/repos/${owner}/${repo}/assignees`,
};

export function* repositoriesSaga() {
  yield all([
    defRequestSaga(repositoriesActions.SEARCH_REPOSITORY, urls.index, {
      method: 'GET',
      apiHost: 'https://api.github.com'
    }),
    defRequestSaga(repositoriesActions.GET_REPOSITORY_ISSUES, urls.getRepositoryIssues, {
      method: 'GET',
      apiHost: 'https://api.github.com'
    }),
    defRequestSaga(
      repositoriesActions.GET_ASSIGNED_TO_ISSUES_PERSONS,
      urls.getAssignedToRRepositoryIssuesRepositoryIssues,
      {method: 'GET', apiHost: 'https://api.github.com'}
    ),
  ]);
}
