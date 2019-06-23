import { combineReducers } from 'redux';
import products from './products';
import includeToCart from './includeToCart';
import cartQuantity from './cartQuantity';
import totalCartPrice from './totalCartPrice';
import cartInstallments from './cartInstallments';


export default combineReducers({ 
	products, 
	includeToCart, 
	cartQuantity, 
	totalCartPrice, 
	cartInstallments 
});