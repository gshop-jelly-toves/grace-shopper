import axios from 'axios'
import history from '../history'
import { clearCartFromClient, fetchCart } from './cart'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const initState = {
  user: {},
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})

const removeUser = () => ({type: REMOVE_USER})


/**
 * THUNK CREATORS
 */
export const fetchUser = () => async dispatch => {
  try {
    const {data} = await axios.get('/auth/me')
    const action = getUser(data)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method, name) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password, name})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    dispatch(fetchCart())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}


/**
 * REDUCER
 */
export default function(state = initState, action) {
  switch (action.type) {
    case GET_USER:
      return {...state, user: action.user}
    case REMOVE_USER:
      return {...state, user: {}}
    default:
      return state
  }
}
