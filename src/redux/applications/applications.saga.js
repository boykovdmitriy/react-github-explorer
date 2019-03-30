import { all } from 'redux-saga/effects';
import { applicationsActions } from './applications.actions';
import { defRequestSaga } from '../../utils/defSaga';

export const urls = {
  index: () => `posts`,
  /*index: (payload -- здесь то, что передаешь в функцию) => `https://jsonplaceholder.typicode.com/posts`,*/
};

export function* applicationsSaga() {
  yield all([
    defRequestSaga(applicationsActions.FAKE, urls.index, {method: 'GET', apiHost: 'https://jsonplaceholder.typicode.com'}),
  ]);
}
