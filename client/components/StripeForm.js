import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { connect } from 'react-redux'
import { handleToken } from '../store'

class StripeForm extends React.Component {


  render() {
    
    return (
      <StripeCheckout 
        name="Bellies' Jellies"
        description="Let's get these jellies in that belly."
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={STRIPE_PUB_KEY}
      />
    )
  }
}

export default connect(null, { handleToken })(StripeForm)