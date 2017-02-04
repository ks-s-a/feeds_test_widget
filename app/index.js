import React from 'react'
import { applyMiddleware, createStore } from 'redux'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import App from './containers/App'
import reducer from './reducers'

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

render(<Provider store={store}>
    <App />
  </Provider>, document.getElementById('entry-point'))
