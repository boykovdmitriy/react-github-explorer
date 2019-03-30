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
export const HOME = defRoute(joinUrlParts(ROOT.pattern, 'home'));
export const HOME_ITEM = defRoute(joinUrlParts(ROOT.pattern, 'home/:itemId'));
export const ABOUT_US = defRoute(joinUrlParts(ROOT.pattern, 'about-us'));
