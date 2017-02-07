const initialState = {
  shops: new Map(),
  isInitialized: false,
  currentShop: null,
  isLoading: false,

  notifyMessage: '',
  notifyType: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_INITIAL_SHOP_NAMES': {
      const shops = action.shopNames
        .map(shop => [shop.name, {}])

      return {
        ...state,
        shops: new Map(shops),
        isInitialized: true
      }
    }
    case 'PICK_SHOP': {
      return {
        ...state,
        currentShop: action.shopName,
      }
    }
    case 'RECEIVE_SHOP_DATA': {
      const { shopName, shopData: { products } } = action
      const shop = state.shops.get(shopName)
      shop.products = products

      return {
        ...state,
        shops: new Map(state.shops.set(shopName, shop)),
      }
    }
    case 'SET_LOADING_STATE': {
      return {
        ...state,
        isLoading: action.isLoading,
      }
    }
    case 'SAVE_FEED_SETTINGS': {
      const { settings, settings: { name } } = action
      let shop = state.shops.get(name) || {}
      shop.settings = settings

      return {
        ...state,
        shops: new Map(state.shops.set(name, shop)),
      }
    }

    case 'TOGGLE_NOTIFY': {
      return {
        ...state,
        notifyMessage: action.message,
        notifyType: action.messageType,
      }
    }

    default:
      return state
  }
}