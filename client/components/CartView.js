import React from 'react'
import {fetchCart, destroyCart} from '../store'
import {connect} from 'react-redux'
import {priceCentsToString} from '../utils'
import { Link } from 'react-router-dom'
import {StripeForm} from './index'

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
      for (let i = 0; i < jellyIds.length; i++) {
        if (!propsJellyIds.includes(jellyIds[i])) return false
      }
      return true
    }

    return this.props.cart.cartTotal ? (
      <div id="cart-container">
        <button type="button" onClick={
          () => this.props.history.push('/cart/checkout')
        }>
          Checkout
        </button>
        <button type="button" onClick={this.clearCart}>
          Clear cart
        </button>
        <div>Total: {priceCentsToString(cart.cartTotal)}</div>
        {haveNeededJellies() &&
          jellyIds.map(id => (
            <div className="cart-item-container" key={id}>

              <p>{'Quantity: ' + cart.items[id].quantity + ' '}</p>
              <Link to={`/jellies/${id}`}>
              <p>{jellies[id].name}</p>
              </Link>

              <img src={jellies[id].photo} />
            </div>
          ))}
      </div>
    ) : (
      <div>Your cart is currently empty, add some jellies!</div>
    )
  }
}

const mapState = ({cart, jellies: {jellies}}) => ({
  cart,
  jellies
})

const mapDispatch = {
  fetchCart,
  destroyCart
}

export default connect(mapState, mapDispatch)(CartView)
