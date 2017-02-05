const receiveShopNames = (shopNames, firstShopName) => ({
  type: 'RECEIVE_INITIAL_SHOP_NAMES',
  shopNames,
})

const receiveShopData = (shopName, shopData) => ({
  type: 'RECEIVE_SHOP_DATA',
  shopName,
  shopData,
})

export const pickShop = (shopName) => (dispatch, getState) => {
  const { shops, currentShop } = getState()

  if (shopName === currentShop)
    return

  dispatch({
    type: 'PICK_SHOP',
    shopName,
  })
  
  if (!shops.get(shopName).products)
    dispatch(getShopData(shopName))
}

const getShopData = shopName => dispatch => {
  return fetch(`http://localhost:3000/?shop=${shopName}`)
    .then(response => response.json())
    .then(shopData => 
      dispatch(receiveShopData(shopName, shopData)))
}

export const getInitialShops = () => (dispatch) => {
  return fetch('http://localhost:3000/')
    .then(response => response.json())
    .then(results => {
      const firstShopName = results && results[0] && results[0].name

      dispatch(receiveShopNames(results))
      dispatch(pickShop(firstShopName))
    })
}

