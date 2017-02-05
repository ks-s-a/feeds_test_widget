const initialState = {
  shops: new Map(),
  isInitialized: false,
  currentShop: null,
}

export default (state = initialState, action) => {
  console.log(action.type)
  switch (action.type) {
    case 'RECEIVE_INITIAL_SHOP_NAMES': {
      const shops = action.shopNames
        .map(shop => [shop.name, {}])

      return {
        ...state,
        shops: new Map(shops),
      }
    }
    case 'PICK_SHOP': {
      return {
        ...state,
        currentShop: action.shopName,
      }
    }
    case 'RECEIVE_SHOP_DATA': {
      const name = action.shopName

      if (!state.shops.has(name))
        return state

      return {
        ...state,
        shops: new Map(state.shops.set(name, action.shopData)),
        isInitialized: true
      }
    }
    default:
      return state
  }
}