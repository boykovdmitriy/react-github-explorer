import {all} from 'redux-saga/effects';
import {repositoriesActions} from './repositories.actions';
import {defRequestSaga} from '../../utils/defSaga';
import {toParams} from '../../utils/params';

export const urls = {
  index: (payload) => `search/repositories${toParams(payload.params)}`,
};

export function* repositoriesSaga() {
  yield all([
    defRequestSaga(repositoriesActions.SEARCH_REPOSITORY, urls.index, {
      method: 'GET',
      apiHost: 'https://api.github.com'
    }),
  ]);
}
