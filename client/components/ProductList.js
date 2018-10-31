import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProducts} from '../store'

class ProductList extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const { products } = this.props

    return (
      <div id="productList">
        {products.map(product => (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>
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
  const { products } = state.products
  return {
    products: Object.keys(products)
      .map( key => products[key] )
  }
}

const mapDispatch = {fetchProducts}

export default connect(mapState, mapDispatch)(ProductList)
