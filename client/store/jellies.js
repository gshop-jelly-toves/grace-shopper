import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES'
const GET_JELLIES = 'GET_JELLIES'
const GET_SINGLE_JELLY ='GET_SINGLE_JELLY'

/**
 * INITIAL STATE
 */
const initState = {
  jellies: {},
  singleJelly: {},
  categories: []
}

/**
 * ACTION CREATORS
 */
const getJellies = jellies => ({
  type: GET_JELLIES, jellies
})

const getCategories = categories => ({
  type: GET_CATEGORIES, categories
})

const getSingleJelly = jelly => ({
  type: GET_SINGLE_JELLY, jelly
})

/**
 * THUNK CREATORS
 */
export const fetchJellies = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/jellies')
    const action = getJellies(data)
    dispatch(action)
  } catch (e) {
    console.error(e)
  }
}

export const fetchCategories = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/jellies/categories')
    const action = getCategories(data)
    dispatch(action)
  } catch (e) {
    console.error(e)
  }
}

export const fetchSingleJelly = jellyId => async dispatch => {
  try {
    console.log('jellyId:', jellyId)
    const { data } = await axios.get(`/api/jellies/${jellyId}`)
    const action = getSingleJelly(data)
    dispatch(action)
  } catch (e) {
    console.error(e)
  }
}

/**
 * REDUCER
 */
export default function(state = initState, action) {
  switch (action.type) {
    case GET_JELLIES:
      return { ...state, jellies: 
        action.jellies.reduce( (obj, item) => {
          obj[item.id] = item
          return obj
        }, {})
      }
    case GET_SINGLE_JELLY:
      return { ...state, singleJelly: action.jelly }
    case GET_CATEGORIES:
      return { ...state, categories: action.categories }
    default:
      return state
  }
}
