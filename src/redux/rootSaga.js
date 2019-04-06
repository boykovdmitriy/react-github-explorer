import {fork, all} from 'redux-saga/effects';
import {repositoriesSaga} from './repositories';
import {issuesSaga} from './issues';

export default function* rootSaga() {
  yield all([
    fork(repositoriesSaga),
    fork(issuesSaga),
  ]);
}
