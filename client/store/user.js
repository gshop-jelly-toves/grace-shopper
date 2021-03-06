import axios from 'axios'
import history from '../history'
import {clearCartFromClient, fetchCart} from './cart'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const GET_USER_PROFILE = 'GET_USER_PROFILE'
const REMOVE_USER = 'REMOVE_USER'
const SET_ADDRESS = 'SET_ADDRESS'
const SET_ADDRESS_PROP = 'SET_ADDRESS_PROP'

/**
 * INITIAL STATE
 */
const initState = {
  userProfile: {},
  user: {},
  address: {
    firstName: '',
    lastName: '',
    street: '',
    state: '',
    city: '',
    zipcode: ''
  }
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})

const getUserProfile = userProfile => ({
  type: GET_USER_PROFILE,
  userProfile
})

const removeUser = () => ({type: REMOVE_USER})

export const setAddressProp = obj => ({
  type: SET_ADDRESS_PROP,
  obj
})

const setAddress = address => ({
  type: SET_ADDRESS,
  address
})

/**
 * THUNK CREATORS
 */
export const fetchUserProfile = userId => async dispatch => {
  try {
    const response = await axios.get(`/api/users/${userId}`)
    const userProfile = response.data
    dispatch(getUserProfile(userProfile))
  } catch (error) {
    console.error(error)
  }
}

export const fetchAddress = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users/address')
    const action = setAddress(data)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}

export const saveAddress = address => async dispatch => {
  try {
    await axios.post('/api/users/address', address)
    dispatch(setAddress(address))
  } catch (err) {
    console.error(err)
  }
}

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
    case GET_USER_PROFILE:
      return {...state, userProfile: action.userProfile}
    case REMOVE_USER:
      return {...state, user: {}}
    case SET_ADDRESS:
      return {...state, address: action.address}
    case SET_ADDRESS_PROP:
      return {
        ...state,
        address: {
          ...state.address,
          ...action.obj
        }
      }
    default:
      return state
  }
}
