import {repositoriesActions} from './repositories.actions';

const initialState = {
  error: '',
  isError: false,
  isLoading: false,
  isLoaded: false,
  data: [],
  params: {},
};

export const searchRepositoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case repositoriesActions.SEARCH_REPOSITORY.REQUEST:
      const {payload: {params}} = action;
      return {
        ...state,
        data: params.page === 1 ? [] : state.data,
        params: params,
        isError: false,
        isLoaded: false,
        isLoading: true,
      };
    case repositoriesActions.SEARCH_REPOSITORY.SUCCESS:
      const {payload: {data}} = action;

      return {
        ...state,
        data: [...state.data, ...data.items],
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
