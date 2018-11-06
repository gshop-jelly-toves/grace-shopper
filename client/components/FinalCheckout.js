import React from 'react'
import { connect } from 'react-redux'
import {StripeForm} from './index'

class FinalCheckout extends React.Component {

  constructor(props) {
    super(props)
    this.isFilledOut = this.isFilledOut.bind(this)
  }

  isFilledOut() {
    const {address} = this.props
    if (address.firstName === '') return false
    if (address.lastName === '') return false
    if (address.street === '') return false
    if (address.state === '') return false
    if (address.city === '') return false
    if (address.zipcode === '') return false
    return true
  }  

  render() {
    return this.isFilledOut() 
      ? (
        <div>
          {this.props.cart.subTotal}
          <StripeForm />
        </div>
      ) : <div>No address on file!</div>
  }
}

const mapState = ({cart, user: {address}}) => ({
  cart, address
})

export default connect(mapState, {
  
})(FinalCheckout)