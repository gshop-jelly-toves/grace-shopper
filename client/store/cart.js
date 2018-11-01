import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
*/

const SERIALIZE_CART = 'SERIALIZE_CART'
const DESERIALIZE_CART = 'DESERIALIZE_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

/**
 * INITIAL STATE
 */
const initState = {
  cart: []
}

/**
 * ACTION CREATORS
 */

const deserializeCart = cart => ({
  type: DESERIALIZE_CART, cart
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
    const action = deserializeCart(data)
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
export default function(state = initState, action) {
  switch (action.type) {

    default:
      return state
  }
}
