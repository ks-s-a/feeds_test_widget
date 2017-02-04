import { getInitialAppNames } from '../api'

const recieveInitialShopNames = (shopNames) => {
    console.log('shopNames', shopNames);
}

export const getInitialShops = () => {
  fetch('http://localhost:3000/')
    .then(console.log)

  return {
    type: 'GET_INITIAL_SHOPS',
  }
}

