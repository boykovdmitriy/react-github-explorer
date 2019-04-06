const initialState = {
  error: '',
  isError: false,
  isLoading: false,
  isLoaded: false,
  data: [],
  params: {}
};

const doNothing = (data) => data;

export function defPaginatableReducer(actions, {
  calculateTotal = () => {},
  dataCompensate = doNothing
}) {
  return (state = initialState, action) => {
    switch (action.type) {
      case actions.REQUEST:
        const {payload: {params}} = action;
        return {
          ...state,
          data: params.page === 1 ? [] : state.data,
          params: params,
          isError: false,
          isLoading: true,
          isLoaded: false,
        };
      case actions.SUCCESS:
        const data = dataCompensate(action.payload.data);
        return {
          ...state,
          data: [...state.data, ...data],
          totalPages: calculateTotal(state, action),
          isError: false,
          isLoading: false,
          isLoaded: true,
        };
      case actions.FAILURE:
        return {
          ...state,
          isError: true,
          error: action.payload,
          isLoading: false,
        };
      default:
        return state;
    }
  }
}
