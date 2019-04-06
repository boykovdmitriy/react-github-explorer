import {repositoriesActions} from './repositories.actions';

const initialState = {
  error: '',
  isError: false,
  isLoading: false,
  isLoaded: false,
  data: {},
  params: {},
};

export const searchRepositoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case repositoriesActions.SEARCH_REPOSITORY.REQUEST:
      const {payload: {params}} = action;
      return {
        ...state,
        params: params,
        isError: false,
        isLoading: true,
      };
    case repositoriesActions.SEARCH_REPOSITORY.SUCCESS:
      const {payload: {data}} = action;

      return {
        ...state,
        data: action.payload.data,
        totalPages: Math.ceil(data.total_count / 30),
        isError: false,
        isLoading: false,
        isLoaded: true,
      };
    case repositoriesActions.SEARCH_REPOSITORY.FAILURE:
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
