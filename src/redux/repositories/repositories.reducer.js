import {repositoriesActions} from './repositories.actions';
import {defPaginatableReducer} from '../../utils/defReducer';

export const searchRepositoriesReducer = defPaginatableReducer(
  repositoriesActions.SEARCH_REPOSITORY,
  {
    calculateTotal: (state, action) => Math.ceil(action.payload.data.total_count / 30),
    dataCompensate: (data) => data.items,
  }
);
