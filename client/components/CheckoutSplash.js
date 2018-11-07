import React from 'react'
import {connect} from 'react-redux'
import {AddressForm} from './index'
import {Link} from 'react-router-dom'

const CheckoutSplash = props =>
  props.isLoggedIn ? (
    <div className="container">
      <AddressForm />
    </div>
  ) : (
    <div className="container">
      <div className="row p-5">
        <div className="col">
          <Link to="/signup">
            <h2 className="text-center">Please sign-up to continue.</h2>
          </Link>
        </div>
      </div>
    </div>
  )

const mapState = ({user: {user}}) => ({
  isLoggedIn: !!user.id
})
export default connect(mapState)(CheckoutSplash)
