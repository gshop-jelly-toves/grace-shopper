import axios from 'axios'
import history from '../history'
import {fetchSingleJelly} from './jellies'

/**
 * ACTION TYPES
 */

const GET_CART = 'GET_CART'
const CLEAR_CART_FROM_CLIENT = 'CLEAR_CART_FROM_CLIENT'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

/**
 * INITIAL STATE
 */
const initCart = {
  cartTotal: 0,
  orderTotal: 0,
  items: {}
}

/**
 * ACTION CREATORS
 */

const getCart = cart => ({
  type: GET_CART,
  cart
})

const clearCartFromClient = () => ({
  type: clearCartFromClient
})

const addToCart = item => ({
  type: ADD_TO_CART,
  item
})

const removeFromCart = item => ({
  type: REMOVE_FROM_CART,
  item
})

/**
 * THUNK CREATORS
 */

// no thunk-actions should care whether or not the
// user is logged in. all of this logic should be
// handled in express so that components can remain
// completely agnostic to all db/session logic

export const fetchCart = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cart')

    // makes sure all of the jellies in your cart
    // are on state.jellies
    // fix this...
    Object.keys(data.items).forEach(
      async id => await dispatch(fetchSingleJelly(id))
    )

    const action = getCart(data)
    dispatch(action)
  } catch (e) {
    console.error(e)
  }
}

export const handleCheckout = (token, address) => async dispatch => {
  try {
    await axios.post('/api/cart/checkout', {token, address})
    dispatch(clearCartFromClient())
  } catch (err) {
    console.error(err)
  }
}

export const destroyCart = () => async dispatch => {
  try {
    await axios.delete('/api/cart')
    dispatch(clearCartFromClient())
  } catch (e) {
    console.error(e)
  }
}

export const addJellyById = (jellyId, quantity) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/cart/add/${jellyId}`, {quantity})
    const action = addToCart(data)
    dispatch(action)
  } catch (e) {
    console.error(e)
  }
}

export const removeJellyById = jellyId => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/cart/remove/${jellyId}`)
    const action = removeFromCart(data)
    dispatch(action)
  } catch (e) {
    console.error(e)
  }
}

/**
 * REDUCER
 */
export default function(state = initCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case CLEAR_CART_FROM_CLIENT:
      return initCart
    case ADD_TO_CART:
      return {
        ...state,
        cartTotal:
          state.cartTotal + action.item.priceCents * action.item.quantity,
        items: {
          ...state.items,
          [action.item.jellyId]: action.item
        }
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartTotal:
          state.cartTotal - action.item.priceCents * action.item.quantity,
        items: {
          ...state.items,
          [action.item.jellyId]: undefined
        }
      }
    default:
      return state
  }
}
