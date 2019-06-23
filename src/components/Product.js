import React from 'react';
import ReactDOM from 'react-dom';
import Thumb from './Thumb';
import { includeToCart } from '../redux/actions/includeToCart';
import { cartQuantity } from '../redux/actions/cartQuantity';
import { totalCartPrice } from '../redux/actions/totalCartPrice';
import { cartInstallments } from '../redux/actions/cartInstallments';
import { connect } from 'react-redux';

class Product extends React.Component {
	constructor(props) {
		super(props);
		this.handleAddToCart = this.handleAddToCart.bind(this);
		this.state = {selectedProduct: {}}
	}

	addToCart(style, title, price, id, sku, installments, availableSizes) {
		let selectedProduct = {
			style: style,
			title: title,
			price: price,
			id: id,
			sku: sku,
			installments: installments,
			availableSizes: availableSizes
		};
		this.handleAddToCart(selectedProduct);
	};


	handleAddToCart(selectedProducts) {

	    let cartItems = [...this.props.cart];
	    let productID = selectedProducts.id;

	    //check in case the same product is added
	    if(this.checkProduct(productID)) {
	      let index = cartItems.findIndex(x => x.id == productID);
	      //item quantity counter
	      cartItems[index].quantity += 1;
	      let totalItemPrice = cartItems[index].price * cartItems[index].quantity;
	      cartItems[index].totalprice = totalItemPrice;

	    } else {
	      selectedProducts.quantity = 1;
	      selectedProducts.totalprice = selectedProducts.price; 

	      cartItems.push(selectedProducts);
		  this.props.includeToCart(selectedProducts);
		  console.log(cartItems);

	    }

	    //amount counter which represents cart quantity at all
	   	let amount = 0;
	    let cartPrice = 0;
	    cartItems.map(qty => {
	        amount += qty.quantity;
	        cartPrice += qty.totalprice;
	    });
	    //calculate cart price
	    let totalCartPrice = (Math.round(cartPrice*100)/100);
		
		this.props.totalCartPrice(totalCartPrice);
		this.props.cartInstallments(selectedProducts.installments);
  	};

  checkProduct(productID) {
    let cart = this.props.cart;
    return cart.some(function(item) {
      return item.id === productID;
    });
  };

	render() {
		
		const {id, sku, title, style, price, currency, installments} = this.props;
		const {productSku, currencyFormat, isFreeShipping, availableSizes} = this.props;
		const integer = parseInt(price);

		return(
			<div className="product" data-sku={productSku}>
				<div
					className={!isFreeShipping ? '' : 'free'}
				>
					{!isFreeShipping ? '' : 'Free shipping'}
				</div>
				<Thumb src={require(`../img/products/${productSku}_1.jpg`)} />
				<p className="product-title">{title}</p>
				<div className="value">
					<div className="price-wrapper">
						<div className="price-value">
							<small>{currencyFormat}</small>
							<b>{integer}</b>
					    <span>{this.props.getDecimal(price)}</span>
						</div>
					</div>
					<div className="installments-wrapper">
						<div className="installments-value">
							{installments > 0 ? 
								<React.Fragment>
									<span>or {installments} x</span>
									<b>{currencyFormat}{this.props.formatPrice(price, installments)}</b>
								</React.Fragment>
									:
								null
							}
						</div>
					</div>
				</div>
				<div 
					className="buy-btn"
					onClick={this.addToCart.bind(
						this,
						style,
						title,
						price,
						id,
						sku,
						installments,
						availableSizes,
					)}
				>
					Add to cart
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	let { cart } = state.includeToCart || {};
	return { cart };
};

export default connect(
	mapStateToProps,
	{ includeToCart, cartQuantity, totalCartPrice, cartInstallments } 
)(Product);