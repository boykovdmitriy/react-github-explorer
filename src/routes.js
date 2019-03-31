import { formatRoute } from 'react-router-named-routes';
import { toParams } from './utils/params';
import { joinUrlParts } from './utils/urlTools';

export function defRoute(pattern) {
  return {
    pattern,
    url: (params, search) => formatRoute(pattern, params) + toParams(search),
  };
}

export const ROOT = defRoute('/');
export const REPOSITORY_ISSUES = defRoute(joinUrlParts(ROOT.pattern, ':owner/:repo/issues'));
