import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_REVIEWS = 'GET_REVIEWS'
const GET_SINGLE_REVIEW = 'GET_SINGLE_REVIEW'

/**
 * INITIAL STATE
 */
const initState = {
  reviews: {},
  singleReview: {}
}

/**
 * ACTION CREATORS
 */
const getReviews = reviews => ({
  type: GET_REVIEWS,
  reviews
})

const getSingleReview = review => ({
  type: GET_SINGLE_REVIEW,
  review
})

/**
 * THUNK CREATORS
 */
export const fetchReviews = jellyId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/jellies/${jellyId}/reviews`)
    const action = getReviews(data.reviews)
    dispatch(action)
  } catch (e) {
    console.error(e)
  }
}

export const fetchSingleReview = (jellyId, reviewId) => async dispatch => {
  try {
    const {data} = await axios.get(
      `/api/jellies/${jellyId}/reviews/${reviewId}`
    )
    const action = getSingleReview(data)
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
    case GET_REVIEWS:
      return {
        ...state,
        reviews: {
          ...state.reviews,
          ...action.reviews.reduce((obj, item) => {
            obj[item.id] = item
            return obj
          }, {})
        }
      }
    case GET_SINGLE_REVIEW:
      return {...state, singleReview: action.review}

    default:
      return state
  }
}
