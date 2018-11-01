import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
*/

const SERIALIZE_CART = 'SERIALIZE_CART'
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

/**
 * INITIAL STATE
 */
const cart = {}

/**
 * ACTION CREATORS
 */

const getCart = cart => ({
  type: GET_CART, cart
})

const addToCart = jelly => ({
  type: ADD_TO_CART, jelly
})

const removeFromCart = jelly => ({
  type: REMOVE_FROM_CART, jelly
})

/**
 * THUNK CREATORS
 */

export const fetchCart = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/cart')
    const action = getCart(data)
    dispatch(action)
  } catch (e) { console.error(e) }
}

export const addJelly = jellyId => async dispatch => {
  try {
    const { data } = await axios.put('/api/cart', jellyId)
    const action = addToCart(data)
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
        ...state //todo
      }
    default:
      return state
  }
}
