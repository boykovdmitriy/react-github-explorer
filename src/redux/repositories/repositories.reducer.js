import {repositoriesActions} from './repositories.actions';

const initialState = {
  error: '',
  isError: false,
  isLoading: false,
  isLoaded: false,
  loadedPages: 0,
  data: {},
};

export const repositoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case repositoriesActions.SEARCH_REPOSITORY.REQUEST:
      const {payload: {params}} = action;
      return {
        ...state,
        params: params,
        isError: false,
        isLoading: true,
        isLoaded: false,
      };
    case repositoriesActions.SEARCH_REPOSITORY.SUCCESS:
      const {payload: {data}} = action;

      return {
        ...state,
        data: action.payload.data,
        totalPage: Math.ceil(data.total_count / 30),
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