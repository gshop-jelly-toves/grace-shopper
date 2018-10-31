import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProducts} from '../store'

class ProductList extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const {products} = this.props.state.products
    console.log(this.props.state)

    return (
      <div id="productList">
        {products.map(product => (
          <div key={product.id}>
            <Link to={`/${product.id}`}>
              <img src={product.photo} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => {
  return {
    state
  }
}

const mapDispatch = {fetchProducts}

export default connect(mapState, mapDispatch)(ProductList)
