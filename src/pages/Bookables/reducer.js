const bookableReducer = (state, action) => {
  switch (action.type) {
    case 'SET_GROUP':
      return {
        ...state,
        group: action.payload,
        bookableIndex: 0,
      };
    case 'SET_BOOKABLE':
      return {
        ...state,
        bookableIndex: action.payload,
        isPresenting: false,
      }
    case 'TOGGLE_DETAILS':
      return {
        ...state,
        hasDetails: !state.hasDetails,
      }
    case 'NEXT_BOOKABLE':
      const count = state.bookables.filter(
        b => b.group === state.group
      ).length;
      return {
        ...state,
        bookableIndex: (state.bookableIndex + 1) % count,
        isPresenting: action.payload,
      }
    case 'FETCH_BOOKABLE_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        bookables: [],
      }
    case 'FETCH_BOOKABLE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: false,
        bookables: action.payload,
        isPresenting: true,
      }
    case 'FETCH_BOOKABLE_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    default:
      return state;
  }
};

export default bookableReducer;