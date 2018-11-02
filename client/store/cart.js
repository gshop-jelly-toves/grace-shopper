import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
*/

const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

/**
 * INITIAL STATE
 */
const cart = {
  items: {}
}

/**
 * ACTION CREATORS
 */

const getCart = cart => ({
  type: GET_CART, cart
})

const addToCart = jelly => ({
  type: ADD_TO_CART, jelly
})

const removeFromCart = jellyId => ({
  type: REMOVE_FROM_CART, jellyId
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
    const { data } = await axios.get('/api/cart')
    const action = getCart(data)
    dispatch(action)
  } catch (e) { console.error(e) }
}

export const addJellyById = jellyId => async dispatch => {
  try {
    const { data } = await axios.get('/api/cart/add')//, jellyId)
    const action = addToCart(data)
    dispatch(action)
  } catch (e) { console.error(e) }
}

export const removeJellyById = jellyId => async dispatch => {
  try {
    const { data } = await axios.get('/api/cart/remove')//, jellyId)
    const action = removeFromCart(data)
    dispatch(action)
  } catch (e) { console.error(e) }
}


/**
 * REDUCER
 */
export default function(state = cart, action) {
  switch (action.type) {
    case GET_CART: 
      return action.cart
    case ADD_TO_CART: 
      return {
        ...state,
        items: {
          ...state.items,
          [action.jelly.id]: action.jelly
        }
      }
    case REMOVE_FROM_CART: 
      return {
        ...state,
        items: {
          ...state.items,
          [action.jellyId]: null
        }
      }
    default:
      return state
  }
}
