import { defRequestActions } from '../../utils/defAction';

export const repositoriesActions = {
  ...defRequestActions('SEARCH_REPOSITORY'),
  ...defRequestActions('GET_REPOSITORY_ISSUES'),
  ...defRequestActions('GET_ASSIGNED_TO_ISSUES_PERSONS'),
};
