import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES'
const GET_PRODUCTS = 'GET_PRODUCTS'

/**
 * INITIAL STATE
 */
const initState = {
  products: [],
  categories: []
}

/**
 * ACTION CREATORS
 */
const getProducts = products => ({
  type: GET_PRODUCTS, products
})

const getCategories = categories => ({
  type: GET_CATEGORIES, categories
})

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/products')
    const action = getProducts(data)
    dispatch(action)
  } catch (e) {
    console.error(e)
  }
}

export const fetchCategories = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/products/categories')
    const action = getCategories(data)
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
    case GET_PRODUCTS:
      return { ...state, products: action.products }
    case GET_CATEGORIES:
      return { ...state, categories: action.categories }
    default:
      return state
  }
}
