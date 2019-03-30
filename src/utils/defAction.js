import {camelCase} from 'lodash';

const requestStates = Object.freeze([
  'REQUEST',
  'SUCCESS',
  'FAILURE',
]);

function makeActionName(parts) {
  return parts.filter(x => !!x).join('/');
}

/**
 * Defining request actions helpers.
 * @function
 * @param {string} base - name of actions group.
 *
 * @result
 *  [base]: {
 *    REQUEST: string,
 *    request: action,
 *    SUCCESS: string,
 *    success: action,
 *    FAILURE: string,
 *    failure: action,
 *  }
 */
export function defRequestActions(base) {
  return {
    [base]: requestStates.reduce((acc, state) => {
      const actionName = makeActionName([base, state]);
      const result = {
        [state]: actionName,
        [camelCase(state)]: (payload = {}) => ({
          type: actionName,
          payload,
        }),
      };
      return {
        ...acc,
        ...result,
      };
    }, {}),
  };
}
