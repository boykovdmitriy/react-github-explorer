import {
  takeEvery, put, call
} from 'redux-saga/effects';
import * as _ from 'lodash';
import { apiFetch } from './api';
import { toFormData } from './formData';

const GET = 'GET';

export function buildFetch(
  requestActions,
  url,
  method,
  apiHost,
) {
  return function* fetchRequest(action) {
    const {payload} = action;
    const {
      isFormData, ...restPayload
    } = payload;
    const baseResultPayload = { requestParams: restPayload};
    const baseUrl = _.isFunction(url) ? url(payload) : url;
    const {reqUrl, params} =  method === 'GET'
      ? {
        reqUrl: baseUrl,
        params: { method, apiHost },
      } : {
      reqUrl: baseUrl,
      params: {
        method,
        apiHost,
        body: isFormData ? toFormData(restPayload) : restPayload,
      },
    };

    const data = {};
    try {
      data.response = yield call(authApiFetch, reqUrl, params);
      data.ok = true;
    } catch (error) {
      data.error = error;
      data.ok = false;
    }
    if (data.ok) {
      const successPayload = {...data.response, ...baseResultPayload};
      yield put(requestActions.success(successPayload));
    }
    if (!data.ok) {
      console.warn(data.error); // tslint-disable-line no-console
      const errorPayload = {...data.error, ...baseResultPayload};
      yield put(requestActions.failure(errorPayload));
    }
  };
}

export function* defRequestSaga(
  requestActions,
  url,
  options = {},
) {
  const fetchRequest = buildFetch(
    requestActions,
    url,
    options.method,
    options.apiHost,
  );

  yield takeEveryRequest(requestActions, fetchRequest);
}

export function takeEveryRequest(actions, fetch) {
  return takeEvery(actions.REQUEST, fetch);
}

export function* authApiFetch(
  url,
  options = {method: GET},
) {
  const headers = new Headers();
  return yield call(apiFetch, url, {...options, headers});
}
