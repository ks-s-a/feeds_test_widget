const initialState = {
  isOpen: false,
  isDataLoading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_MODAL': {
      return {
        ...state,
        isOpen: action.state,
      }
    }
    case 'SET_LOADING_DATA_STATE': {
      return {
        ...state,
        isDataLoading: action.state,
      }
    }
    default:
      return state
  }
}