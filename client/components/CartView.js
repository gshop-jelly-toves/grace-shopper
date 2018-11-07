import React from 'react'
import {
  fetchCart,
  destroyCart,
  removeJellyById,
  addJellyById,
  decrementCartJelly
} from '../store'
import {connect} from 'react-redux'
import {priceCentsToString} from '../utils'
import {Link} from 'react-router-dom'
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
      <div className="container">
        {/*
        CART HEADERS
        */}
        <div className="row p-3">
          <div className="col-8 col-md-8">
            <h2>Your Items</h2>
          </div>
          <div className="col-2 col-md-2">
            <h2>Price</h2>
          </div>
          <div className="col-2 col-md-2">
            <h2>Quantity</h2>
          </div>
        </div>
        {/* MAPPING TO CREATE CART ITEM ROWS */}
        {haveNeededJellies() &&
          jellyIds.map(
            id =>
              cart.items[id] ? (
                <div
                  className="row py-3 border-bottom align-items-center"
                  key={id}
                >
                  <div className="col-2 col-md-2">
                    <img
                      src={jellies[id].photo}
                      alt={jellies[id].name}
                      height="100"
                    />
                  </div>
                  <div className="col-6 col-md-6">
                    <Link to={`/jellies/${id}`}>
                      <p id="jelly-in-cart">{jellies[id].name}</p>
                    </Link>
                    <p id="maker-in-cart">{jellies[id].maker}</p>
                    {/*
                    NEEDS
                    DELETE
                    FUNCTIONALITY
                */}
                    <a
                      href="#"
                      id="delete-cart-item"
                      onClick={() => this.props.removeJellyById(id)}
                    >
                      Delete
                    </a>
                  </div>
                  <div className="col-2 col-md-2">
                    <h5>{priceCentsToString(jellies[id].priceCents)}</h5>
                  </div>

                  <div className="col-2 col-md-2">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        {/*
                        NEEDS
                        CONNECTION TO
                        REMOVE ITEM ROUTE
                    */}
                        <button
                          className="btn btn-secondary"
                          type="button"
                          id="button-addon1"
                          onClick={() => this.props.decrementCartJelly(id)}
                        >
                          -
                        </button>
                      </div>
                      <p
                        type="text"
                        className="form-control"
                        placeholder={
                          cart.items[id] ? cart.items[id].quantity : 1337
                        }
                        aria-label="Quantity"
                        aria-describedby="button-addon1"
                      >
                        {cart.items[id] ? cart.items[id].quantity : 1337}
                      </p>
                      <div className="input-group-append">
                        {/*
                        NEEDS
                        CONNECTION TO
                        ADD ITEM ROUTE
                    */}
                        <button
                          className="btn btn-secondary"
                          type="button"
                          id="button-addon1"
                          onClick={() => this.props.addJellyById(id, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                false
              )
          )}
        {/* CHECKOUT FUNCTIONALITY */}
        <div className="row py-3 align-items-center">
          <div className="col-8 col-md-8">
            <button
              type="button"
              className="btn-lg btn-warning"
              onClick={this.clearCart}
            >
              Clear cart
            </button>
          </div>
          <div className="col-2 col-md-2">
            <h5>{priceCentsToString(cart.cartTotal)}</h5>
          </div>
          <div className="col-1 col-md-1">
            <button onClick={() => this.props.history.push('/cart/checkout')}>
              Checkout
            </button>
          </div>
        </div>
        {/* END OF CART CONTAINER */}
      </div>
    ) : ( <div className='center column'>
      <h1 className='center'>Your cart is currently empty, add some jellies!</h1>
      <button className='center' style={{width: 500}} onClick={() => this.props.history.push('/jellies')}>
        Show me the jellies!
      </button>
    </div>)
  }
}

const mapState = ({cart, jellies: {jellies}}) => ({
  cart,
  jellies
})

const mapDispatch = {
  fetchCart,
  destroyCart,
  removeJellyById,
  addJellyById,
  decrementCartJelly
}

export default connect(mapState, mapDispatch)(CartView)
