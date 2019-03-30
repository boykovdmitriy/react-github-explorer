import { fork, all } from 'redux-saga/effects';
import { applicationsSaga } from './applications';

export default function* rootSaga() {
  yield all([
    fork(applicationsSaga),
  ]);
}
