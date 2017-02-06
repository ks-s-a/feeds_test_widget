import { combineReducers } from 'redux'

import app from './app'
import modal from './modal'

const App = combineReducers({
  app,
  modal
})

export default App