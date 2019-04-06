import {all} from 'redux-saga/effects';
import {issuesActions} from './issues.actions';
import {defRequestSaga} from '../../utils/defSaga';
import {toParams} from '../../utils/params';

export const urls = {
  getRepositoryIssues: ({owner, repo, params}) => `repos/${owner}/${repo}/issues${toParams(params)}`,
  getAssignedToRepositoryIssuesRepositoryIssues: ({owner, repo, params}) => `repos/${owner}/${repo}/assignees${toParams(params)}`,
};

export function* issuesSaga() {
  yield all([
    defRequestSaga(
      issuesActions.GET_REPOSITORY_ISSUES,
      urls.getRepositoryIssues,
      {method: 'GET', apiHost: 'https://api.github.com'}),
    defRequestSaga(
      issuesActions.GET_ASSIGNED_TO_ISSUES_PERSONS,
      urls.getAssignedToRepositoryIssuesRepositoryIssues,
      {method: 'GET', apiHost: 'https://api.github.com'}
    ),
  ]);
}
