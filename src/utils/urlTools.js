import { flatMap, isEmpty } from 'lodash';
import qs from 'qs';

export const sliceUrl = (url, depth) => {
  if (typeof url !== 'string') {
    throw new Error(`sliceUrl: url should be a string. You passed url: ${typeof url}`);
  }
  if (typeof depth !== 'number') {
    throw new Error(`sliceUrl: depth should be a number. You passed depth: ${typeof depth}`);
  }
  const urlParts = url.split('/').filter(x => !isEmpty(x));
  if (depth > urlParts.length) {
    throw new Error(`sliceUrl: url can't be less when depth. You passed url: ${url} and depth: ${depth}`);
  }
  return `/${urlParts.slice(0, urlParts.length - depth).join('/')}`;
};

// This method implemented for joining urls parts without trailing and double slashes '/'
// see urlTools.tests for examples
export const joinUrlParts = (...urlParts) => `/${flatMap(urlParts, x => x.toString().split('/')).filter(x => !isEmpty(x)).join('/')}`;

export const joinUrlParams = (url, params, options = {arrayFormat: 'brackets'}) => `${url}?${qs.stringify(params, options)}`;
