import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProducts} from '../store'

class ProductList extends Component {
  componentDidMount() {
    // this.props.fetchProducts()

    console.log('///////')
  }

  render() {
    const products = [
      {
        id: 1,
        name: 'grape tho',
        photo: './glassjar.jpg',
        price: 4.99
      },
      {
        id: 2,
        name: 'grape again tho',
        photo: './glassjar.jpg',
        price: 4.99
      },
      {
        id: 3,
        name: 'le jelly tho',
        photo: './glassjar.jpg',
        price: 4.99
      }
    ]
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

// const mapState = state => {
//   return {
//     state
//   }
// }

// const mapDispatch = {fetchProducts}

// export default connect(mapState, mapDispatch)(ProductList)

export default ProductList
