import { applicationsActions } from './applications.actions';

const initialState = {
  error: '',
  isError: false,
  isLoading: false,
  isLoaded: false,
  data: {},
};

export const applicationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case applicationsActions.FAKE.REQUEST:
      return {
        ...state,
        data: {},
        isError: false,
        isLoading: true,
        isLoaded: false,
      };
    case applicationsActions.FAKE.SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        isError: false,
        isLoading: false,
        isLoaded: true,
      };
    case applicationsActions.FAKE.FAILURE:
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