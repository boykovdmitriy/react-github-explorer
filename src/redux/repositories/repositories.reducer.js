import { repositoriesActions } from './repositories.actions';

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
    case repositoriesActions.FAKE.REQUEST:
      return {
        ...state,
        data: {},
        isError: false,
        isLoading: true,
        isLoaded: false,
      };
    case repositoriesActions.FAKE.SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        isError: false,
        isLoading: false,
        isLoaded: true,
      };
    case repositoriesActions.FAKE.FAILURE:
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