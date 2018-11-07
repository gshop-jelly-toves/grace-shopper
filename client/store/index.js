import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import jellies from './jellies'
import reviews from './reviews'
import cart from './cart'

const reducer = combineReducers({
  user,
  cart,
  jellies,
  reviews
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, /*createLogger({collapsed: true})*/)
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './jellies'
export * from './reviews'
export * from './cart'
