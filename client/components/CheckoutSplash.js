import React from 'react'
import { connect } from 'react-redux'
import {AddressForm} from './index'

const CheckoutSplash = props => (
  <div className='center'>{ props.isLoggedIn 
    ? <AddressForm />
    : <div>Please login/signup</div>}
  </div>
  )


const mapState = ({ user: {user} }) => ({
  isLoggedIn: !!user.id
}
)
export default connect(mapState)(CheckoutSplash)