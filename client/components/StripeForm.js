import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { connect } from 'react-redux'
import { handleCheckout, saveAddress } from '../store'

class StripeForm extends React.Component {


  render() {
    console.log('total',this.props.orderTotal)
    return this.props.orderTotal ? (
      <StripeCheckout 
        name="Bellies' Jellies"
        description="Let's get these jellies in that belly."
        amount={this.props.orderTotal}
        token={token => this.props.handleCheckout(token)}
        stripeKey={STRIPE_PUB_KEY}
      >
        <button className="btn btn-primary">
          Checkout
        </button>
      </StripeCheckout>
    ) : <div>You have no cart!</div>
  }
}

// const mapDispatch = dispatch => ({
//   handleCheckout: token => dispatch(handleCheckout(token))
// })

const mapState = ({cart: {orderTotal}}) => ({
  orderTotal
})

export default connect(mapState, { handleCheckout })(StripeForm)