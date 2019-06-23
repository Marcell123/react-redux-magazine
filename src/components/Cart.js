import React from 'react';
import ReactDOM from 'react-dom';
import EmptyCart from '../empty/EmptyCart';
import Thumb from './Thumb';
import CartClosed from './CartClosed.js';
import CartScrollBar from './CartScrollBar.js';
import InstallmentsPrice from './InstallmentsPrice.js';
import { itemRemove } from '../redux/actions/itemRemove';
import { totalCartPrice } from '../redux/actions/totalCartPrice';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { findDOMNode } from "react-dom";
import { connect } from 'react-redux';

class Cart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showCart: true
		};
		this.openCart = this.openCart.bind(this);
		this.removeProduct = this.removeProduct.bind(this);
	};

	openCart(e) {
		this.setState({
			showCart: !this.state.showCart
		});
	}

	removeProduct(id) {
		let cartItems = this.props.cart;
		let index = cartItems.findIndex(x => x.id == id);
		this.props.itemRemove(index);
	}


	render() {
		let amount = 0;
	    let cartPrice = 0;
	    this.props.cart.map(qty => {
	        amount += qty.quantity;
	        cartPrice += qty.totalprice;
	    });
	    let cartAmount = (Math.round(cartPrice*100)/100);

		this.props.totalCartPrice(cartAmount);


		const {cart, itemRemove, cartQuantity, totalCartPrice, installments} = this.props;
		let cartItems;
		cartItems = this.props.cart.map(product => {
			return(
				
			<CSSTransition key={product.id} classNames={'fade'} timeout={{enter:300, exit: 100}}>		
				<div className="product-item-wrapper">
					<div className="product-item">
						<div 
							className="item-remove"
							onClick={this.removeProduct.bind(this, product.id)}
						>
						</div>
						<Thumb
				          classes="shelf-item__thumb"
				          src={require(`../img/products/${product.sku}_2.jpg`)}
				          alt={product.title}
				        />
						<div className="item-info">
							<p className="item-name">{product.title}</p>
							<p className="item-desc">{product.availableSizes[0]} | {product.style}</p>
							<p className="item-quantity">Quantity: {product.quantity}</p>
						</div>
						<div className="price">
							<p>$ {product.price.toFixed(2)}</p>
						</div>
					</div>
				</div>
			</CSSTransition>		
			);
		});
		let view;
		if(cartItems.length <= 0) {
			view = <EmptyCart />
		} else {
			view = (
				<TransitionGroup component="ul" style={{paddingBottom: 200 + 'px'}}>
					{cartItems}
				</TransitionGroup>
			)
		}

		return(
			<div 
				className={!this.state.showCart ? "whole-wrapper" : "whole-wrapper closed"} ref="cartList"
			>
				<div className="item-list">
					<div 
						className={!this.state.showCart ? 'open' : 'close'}
						onClick={this.openCart}
					>
					{this.state.showCart ? <CartClosed quantity={amount}/> : 'X'}
					</div>

					<CartScrollBar>
						<div className="cart-header">
							<span className="cart">
								<span className="cart-quantity">{amount}</span>
							</span>
							<span className="header-title">Cart</span>
						</div>
						<React.Fragment>{view}</React.Fragment>
					</CartScrollBar>

					<div className="cart-footer">
						<div className="subtotal">subtotal</div>
						<div className="subprice">
							<p className="subprice-value">${(cartAmount).toFixed(2)}</p>
							{cartAmount == 0 ? null : <InstallmentsPrice installments={installments}
							 totalCartPrice={cartAmount}/>}
						</div>
						<div className="checkout">checkout</div>
					</div>
				</div>
			</div>
		);

		
	}
};

const mapStateToProps = (state) => {
	const { cart } = state.includeToCart;
	const { quantity } = state.cartQuantity;
	const { totalCartPrice } = state.totalCartPrice;
	const { installments } = state.cartInstallments;

	return { cart, quantity, totalCartPrice, installments };
};

export default connect(
	mapStateToProps,
	{ itemRemove, totalCartPrice }
)(Cart);