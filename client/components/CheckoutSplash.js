import React from 'react'
import { connect } from 'react-redux'
import {FinalCheckout} from './index'

const CheckoutSplash = props => props.isLoggedIn 
  ? <FinalCheckout />
  : <div>Please login/signup</div>


const mapState = ({ user: {user} }) => ({
  isLoggedIn: !!user.id
}
)
export default connect(mapState)(CheckoutSplash)