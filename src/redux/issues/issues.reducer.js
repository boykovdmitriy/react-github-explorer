import {issuesActions} from './issues.actions';

const initialState = {
  error: '',
  isError: false,
  isLoading: false,
  isLoaded: false,
  data: [],
  params: {}
};

export const indexRepositoryIssuesReducer = (state = initialState, action) => {
  switch (action.type) {
    case issuesActions.GET_REPOSITORY_ISSUES.REQUEST:
      const {payload: {params}} = action;
      return {
        ...state,
        data: params.page === 1 ? [] : state.data,
        params: params,
        isError: false,
        isLoading: true,
        isLoaded: params.page !== 1,
      };
    case issuesActions.GET_REPOSITORY_ISSUES.SUCCESS:
      const links = action.payload.raw.headers.get('Link');
      const {params: {page}} = state;
      const totalPages = page === 1 ? calculateTotal(links) : state.totalPages;
      return {
        ...state,
        data: [...state.data, ...action.payload.data],
        totalPages,
        isError: false,
        isLoading: false,
        isLoaded: true,
      };
    case issuesActions.GET_REPOSITORY_ISSUES.FAILURE:
      return {
        ...state,
        isError: true,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const indexAssignedPersonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case issuesActions.GET_ASSIGNED_TO_ISSUES_PERSONS.REQUEST:
      return {
        ...state,
        params: action.payload.params,
        isError: false,
        isLoading: true,
        isLoaded: false,
      };
    case issuesActions.GET_ASSIGNED_TO_ISSUES_PERSONS.SUCCESS:
      const links = action.payload.raw.headers.get('Link');
      const {params: {page}} = state;
      const totalPages = page === 1 ? calculateTotal(links) : state.totalPages;
      const newData = page === 1 ? action.payload.data : [...state.data, ...action.payload.data];
      return {
        ...state,
        data: newData,
        totalPages,
        isError: false,
        isLoading: false,
        isLoaded: true,
      };
    case issuesActions.GET_ASSIGNED_TO_ISSUES_PERSONS.FAILURE:
      return {
        ...state,
        isError: true,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

function calculateTotal(links) {
  if (!links) return 1;

  const parts = links.split(',');
  const lastLink = parts.find(x => x.includes('rel="last"'));
  const total = lastLink.substring(
    lastLink.indexOf('='),
    lastLink.indexOf('>'))
    .replace('=', '');
  return parseInt(total, 10);
}