import {fork, all} from 'redux-saga/effects';
import {applicationsSaga} from './applications';
import {repositoriesSaga} from './repositories';

export default function* rootSaga() {
  yield all([
    fork(applicationsSaga),
    fork(repositoriesSaga),
  ]);
}
