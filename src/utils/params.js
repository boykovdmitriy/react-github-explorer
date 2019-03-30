import qs from 'qs';

export function toParams(object) {
  return qs.stringify(object, { addQueryPrefix: true });
}

export function toObject(params) {
  return qs.parse(params, { ignoreQueryPrefix: true });
}
