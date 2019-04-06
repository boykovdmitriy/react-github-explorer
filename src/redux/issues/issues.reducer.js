import {issuesActions} from './issues.actions';
import {defPaginatableReducer} from '../../utils/defReducer';

const calculateTotal = (state, action) => {
  const links = action.payload.raw.headers.get('Link');
  const {params: {page}} = state;
  return page === 1 ? calculateTotalByLinks(links) : state.totalPages;
};

export const indexRepositoryIssuesReducer = defPaginatableReducer(
  issuesActions.GET_REPOSITORY_ISSUES,
  {
    calculateTotal
  }
);

export const indexAssignedPersonsReducer = defPaginatableReducer(
  issuesActions.GET_ASSIGNED_TO_ISSUES_PERSONS,
  {
    calculateTotal
  }
);

function calculateTotalByLinks(links) {
  if (!links) return 1;

  const parts = links.split(',');
  const lastLink = parts.find(x => x.includes('rel="last"'));
  const total = lastLink.substring(
    lastLink.indexOf('='),
    lastLink.indexOf('>'))
    .replace('=', '');
  return parseInt(total, 10);
}