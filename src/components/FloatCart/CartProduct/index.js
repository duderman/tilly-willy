import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { removeItem } from '../../../services/cart/actions';
import Thumb from './../../Thumb';
import { formatPrice } from '../../../services/util';

class CartProduct extends Component {
  static propTypes = {
    cart_id: PropTypes.string.isRequired,
    products: PropTypes.array.isRequired,
    item: PropTypes.object.isRequired,
    removeItem: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isMouseOver: false
    };
  }

  handleMouseOver = () => {
    this.setState({ isMouseOver: true });
  };

  handleMouseOut = () => {
    this.setState({ isMouseOver: false });
  };

  handleRemoveItem = () => {
    const { cart_id, item, removeItem } = this.props;
    removeItem(cart_id, item.id)
  }

  render() {
    const { products, item } = this.props;
    const { isMouseOver } = this.state;
    const product = products.find(product => product.id === item.product_id);
    const isDiscounted = product.price !== item.price

    const classes = ['shelf-item'];

    if (!!isMouseOver) {
      classes.push('shelf-item--mouseover');
    }

    if (isDiscounted) {
      classes.push('shelf-item--discounted')
    }

    return (
      <div className={classes.join(' ')}>
        <div
          className="shelf-item__del"
          onMouseOver={() => this.handleMouseOver()}
          onMouseOut={() => this.handleMouseOut()}
          onClick={() => this.handleRemoveItem()}
        />
        <Thumb
          classes="shelf-item__thumb"
          src={require(`../../../static/products/${product.code}_2.jpg`)}
          alt={product.name}
        />
        <div className="shelf-item__details">
          <p className="title">{product.name}</p>
        </div>
        <div className="shelf-item__prices">
          {isDiscounted && <div>
            Original Price
            <b className="shelf-item__price shelf-item__price--original">
              {`￡ ${formatPrice(product.price)}`}
            </b>
          </div>}
          <div className="shelf-item__price">
            Price: <b>{`￡ ${formatPrice(item.price)}`}</b>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart_id: state.cart.cart.id,
  products: state.shelf.products
});

export default connect(
  mapStateToProps,
  { removeItem }
)(CartProduct);
