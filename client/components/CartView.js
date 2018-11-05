import React from 'react'
import { fetchCart, destroyCart } from '../store'
import { connect } from 'react-redux'
import { priceCentsToString } from '../utils'

class CartView extends React.Component {
  constructor(props) {
    super(props)
    this.clearCart = this.clearCart.bind(this)
  }

  clearCart() {
    this.props.destroyCart()
    this.props.fetchCart()
  }

  componentDidMount() {
    this.props.fetchCart()
  }

  render() {
    const jellyIds = Object.keys(this.props.cart.items)
    const {jellies, cart} = this.props

    // used to prevent rendering before all the jellies
    // in the cart make their way through redux
    const haveNeededJellies = () => {
      const propsJellyIds = Object.keys(jellies)
      for (let i=0; i < jellyIds.length; i++) {
        if (!propsJellyIds.includes(jellyIds[i]))
          return false
      }
      return true
    }
      
    return this.props.cart.cartTotal ? (
      <div>
        <button onClick={this.clearCart}>
          Clear cart
        </button>
        Total: {priceCentsToString(cart.cartTotal)} 
        { haveNeededJellies() && 
            jellyIds.map(id => (
              <div key={id}>
                {cart.items[id].quantity + ' '} 
                {jellies[id].name} 
              </div>
            )) 
        }
      </div>
    ) : <div>No Jellies here...</div>
  }
}

const mapState = ({ cart, jellies: {jellies} }) => ({
  cart, jellies
})

const mapDispatch = {
  fetchCart, destroyCart
}

export default connect(mapState, mapDispatch)(CartView)