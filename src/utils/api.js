const FETCH_TIMEOUT = 10000;

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
  options.headers = options.headers || new Headers();
  options.headers.append('Accept', 'application/json, text/plain, */*');
  return timeoutPromise(
    FETCH_TIMEOUT,
    new Error('Server timeout'),
    fetch(fetchUrl, options))
    .then(checkStatus)
    .then(parseJSON);
}
