import _ from 'lodash';

const FETCH_TIMEOUT = 20000;

function parseJSON(response) {
  return response
    .json()
    .then((data) => ({ raw: response, data }))
    .catch((error) => ({ raw: response, notJson: true, error }));
}

/* istanbul ignore next: mocked function */
function checkStatus(response) {
  if (response.ok) { return response; }
  return parseJSON(response)
    .then((payload) => {
      throw payload;
    });
}

function timeoutPromise(timeout, err, promise) {
  let timeoutId;
  const promiseMethodWrapper = (method) => (...values) => {
    clearTimeout(timeoutId);
    return method(...values);
  };
  return new Promise((resolve, reject) => {
    promise.then(promiseMethodWrapper(resolve), promiseMethodWrapper(reject));
    timeoutId = setTimeout(() => {
      reject(err);
    }, timeout);
  });
}

export function apiFetch(path, customOptions) {
  const { apiHost, ...options } = customOptions;
  const fetchUrl = `${apiHost || ''}/${path}`;
  const isFormData = Object.prototype.toString.call(options.body) === '[object FormData]';
  options.headers = options.headers || new Headers();
  options.headers.append('Accept', 'application/json, text/plain, */*');
  if (!isFormData && !_.isEmpty(options.body)) {
    options.headers.append('Content-Type', 'application/json');
    options.body = JSON.stringify(options.body);
  }
  return timeoutPromise(
    FETCH_TIMEOUT,
    // @ts-ignore: ts offers to import Error from material UI, but it's wrong
    new Error('Server timeout'),
    fetch(fetchUrl, options))
    .then(checkStatus)
    .then(parseJSON);
}
