import React, {Component} from 'react'
import axios from 'axios'
import {priceCentsToString} from '../../utils'

class AllOrders extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: [],
      orderView: ''
    }
  }

  async componentDidMount() {
    const res = await axios.get('/api/orders/all')
    const allOrders = res.data
    this.setState({
      orders: [...allOrders]
    })

  }

  handleFilter = event => {
    this.setState({
      orderView: event.target.value
    })
  }





  render() {
    const orderFilter = orders =>
      this.state.orderView === ''
        ? orders
        : [...orders].filter(
            order =>
              order.status
                .toLowerCase()
                .indexOf(this.state.orderView.toLowerCase()) > -1
          )

    const cancelButton = (
      <button type="button" value="cancel" onClick={this.handleButton}>
        Cancel
      </button>
    )

    const markAsProcessing = (
      <button type="button" value="markAsProcessing" onClick={this.handleButton}>
        Mark as Procssing
      </button>
    )

    const markAsShipped = (
      <button type="button" value="markAsShipping" onClick={this.handleButton}>
        Mark as Shipped
      </button>
    )


    let renderButton
    if (this.state.orderView === 'created') {
      renderButton = markAsProcessing
    } else if (this.state.orderView === 'processing') {
      renderButton = markAsShipped
    }


    return (
      <div>
        <h4>Order Type Filter</h4>
        <button type="button" value="created" onClick={this.handleFilter}>
          Created
        </button>
        <button type="button" value="processing" onClick={this.handleFilter}>
          Processing
        </button>
        <button type="button" value="shipped" onClick={this.handleFilter}>
          Shipped
        </button>
        <button type="button" value="delivered" onClick={this.handleFilter}>
          Delivered
        </button>
        <button type="button" value="cancelled" onClick={this.handleFilter}>
          Cancelled
        </button>

        {orderFilter(this.state.orders).map(order => (
          <div key={order.id}>
            <h4>Order ID: {order.id}</h4>
            <p>Order Status: {order.status}</p>
            <p>Ordered on {order.createdAt}</p>
            {order.status === 'cart' ? (
              <div>Cart Total: {priceCentsToString(order.cartTotal)}</div>
            ) : (
              <div>Order Total: {priceCentsToString(order.orderTotal)}</div>
            )}
            <br />
            {cancelButton}
            {renderButton}
          </div>
        ))}
      </div>
    )
  }
}

export default AllOrders
