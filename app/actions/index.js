import { API_ENDPOINT } from '../config'

const RECEIVE_INITIAL_SHOP_NAMES = 'RECEIVE_INITIAL_SHOP_NAMES'
const RECEIVE_SHOP_DATA = 'RECEIVE_SHOP_DATA'
const PICK_SHOP = 'PICK_SHOP'

const receiveShopNames = (shopNames, firstShopName) => ({
  type: RECEIVE_INITIAL_SHOP_NAMES,
  shopNames,
})

const receiveShopData = (shopName, shopData) => ({
  type: RECEIVE_SHOP_DATA,
  shopName,
  shopData,
})

export const pickShop = (shopName) => (dispatch, getState) => {
  const { app: { shops, currentShop } } = getState()

  if (shopName === currentShop)
    return

  dispatch({
    type: PICK_SHOP,
    shopName,
  })
  
  if (!shops.get(shopName).products) {
    dispatch(setLoadingState(true))
    dispatch(getShopData(shopName))
  }
}

const getShopData = shopName => (dispatch, getState) => {
  return fetch(`${API_ENDPOINT}?shop=${shopName}`)
    .then(response => response.json())
    .then(shopData => {
      dispatch(receiveShopData(shopName, shopData))
      dispatch(setLoadingState(false))
    })
    .catch(e => {
      dispatch(showNotify('error', `Error: ${e.message}`))
    })
}

export const getInitialShops = () => (dispatch) => {
  dispatch(setLoadingState(true))

  return fetch(API_ENDPOINT)
    .then(response => response.json())
    .then(results => {
      dispatch(receiveShopNames(results))

      const firstShopName = results && results[0] && results[0].name
      if (firstShopName)
        dispatch(pickShop(firstShopName))
      else
        dispatch(setLoadingState(false))
    })
    .catch(e => {
      dispatch(showNotify('error', `Error: ${e.message}`))
    })
}

const SET_LOADING_STATE = 'SET_LOADING_STATE'

const setLoadingState = (state) => ({
  type: SET_LOADING_STATE,
  isLoading: state,
})

const TOGGLE_NOTIFY = 'TOGGLE_NOTIFY'

const setNotify = (messageType, message) => ({
  type: 'TOGGLE_NOTIFY',
  message,
  messageType,
})

const showNotify = (messageType, message) => dispatch => {
  setTimeout(() => {
    dispatch(setNotify('', ''))
  }, 4000)

  return dispatch(setNotify(messageType, message))
}

const SAVE_FEED_SETTINGS = 'SAVE_FEED_SETTINGS'

const saveFeedSettings = (settings) => ({
  type: SAVE_FEED_SETTINGS,
  settings,
})

const TOGGLE_MODAL = 'TOGGLE_MODAL'
const SET_LOADING_DATA_STATE = 'SET_LOADING_DATA_STATE'

export const toggleModal = newState => ({
  type: TOGGLE_MODAL,
  state: newState,
})

export const setModalLoadingState = newState => ({
  type: SET_LOADING_DATA_STATE,
  state: newState,
})

export const addFeed = (params) => (dispatch, getState) => {
  const formData = new FormData()
  for (let key in params) {
    formData.append(key, params[key])
  }

  dispatch(saveFeedSettings(params))
  dispatch(setModalLoadingState(true))


  fetch(API_ENDPOINT, {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(products => {
      dispatch(setModalLoadingState(false))
      dispatch(toggleModal(false))
      dispatch(receiveShopData(params.name, { products }))
      dispatch(pickShop(params.name))
      dispatch(showNotify('success', 'Feed added!'))
    })
    .catch(e => {
      dispatch(setModalLoadingState(false))
      dispatch(showNotify('error', `Error: ${e.message}`))
    })
}

