import React from 'react'
import {connect} from 'react-redux'
import {StripeForm} from './index'
import {priceCentsToString} from '../utils'

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

    return this.isFilledOut() ? (
      <div className="container">
        <div className="row p-3">
          <div className="col">
            <h2 className="text-center">
              Order Total:{priceCentsToString(this.props.cart.orderTotal)}
            </h2>
          </div>
        </div>
        <div className="row p-3 justify-content-center">
          <div className="col-4">
            <StripeForm />
          </div>
        </div>
      </div>
    ) : (
      <div>No address on file!</div>
    )
  }
}

const mapState = ({cart, user: {address}}) => ({
  cart,
  address
})

export default connect(mapState, {})(FinalCheckout)
