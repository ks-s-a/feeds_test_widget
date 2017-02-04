import { getInitialAppNames } from '../api'

const receiveInitialShopNames = (shopNames, firstShopName) => ({
  type: 'RECEIVE_INITIAL_SHOP_NAMES',
  shopNames,
})

const pickShop = (shopName) => ({
  type: 'PICK_SHOP',
  shopName,
})

const receiveShopData = (shopName, shopData) => ({
  type: 'RECEIVE_SHOP_DATA',
  shopName,
  shopData,
})

const getFirstShopData = (firstShopName) => (dispatch) => {
  return fetch(`http://localhost:3000/?shop=${firstShopName}`)
    .then(response => response.json())
    .then(shopData => {
      dispatch(receiveShopData(firstShopName, shopData))
    })
}

export const getInitialShops = () => (dispatch) => {
  return fetch('http://localhost:3000/')
    .then(response => response.json())
    .then(results => {
      const firstShopName = results && results[0] && results[0].name

      dispatch(receiveInitialShopNames(results))
      dispatch(pickShop(firstShopName))
      dispatch(getFirstShopData(firstShopName))
    })
}

