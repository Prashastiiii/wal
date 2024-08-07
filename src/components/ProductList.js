import React, { Component } from 'react';
import Product from "./Product";
import Title from "./Title";
import { ProductConsumer } from '../context';
import './ProductList.css';

export default class ProductList extends Component {
  state = {
    searchQuery: ''
  };

  handleSearch = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <div className="py-5">
          <div className="container">
            <Title name="our" title="products" />
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search products..."
                value={this.state.searchQuery}
                onChange={this.handleSearch}
                className="form-control"
              />
            </div>
            <div className="row">
              <ProductConsumer>
                {value => {
                  const filteredProducts = value.products.filter(product =>
                    product.title.toLowerCase().includes(this.state.searchQuery.toLowerCase())
                  );
                  return filteredProducts.map(product => {
                    return <Product key={product.id} product={product} />;
                  });
                }}
              </ProductConsumer>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
