import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES'
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_SINGLE_PRODUCT ='GET_SINGLE_PRODUCT'

/**
 * INITIAL STATE
 */
const initState = {
  products: {},
  singleProduct: {},
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

const getSingleProduct = product => ({
  type: GET_SINGLE_PRODUCT, product
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

export const fetchSingleProduct = productId => async dispatch => {
  try {
    const { data } = await axios.get(`/api/products/${productId}`)
    const action = getSingleProduct(data)
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
      return { ...state, products: 
        action.products.reduce( (obj, item) => {
          obj[item.id] = item
          return obj
        }, {})
      }
    case GET_SINGLE_PRODUCT:
      return { ...state, singleProduct: action.product }
    case GET_CATEGORIES:
      return { ...state, categories: action.categories }
    default:
      return state
  }
}
