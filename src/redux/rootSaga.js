import {fork, all} from 'redux-saga/effects';
import {repositoriesSaga} from './repositories';

export default function* rootSaga() {
  yield all([
    fork(repositoriesSaga),
  ]);
}
