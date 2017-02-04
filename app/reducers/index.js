const initialState = {
  shops: new Map()
}

export default (state = initialState, action) => {
  console.log(action.type)
  switch (action.type) {
    case 'GET_INITIAL_SHOPS': {
      state.shops.set('first', 'first_data')
      return state
    }
    default:
      return state
  }
}