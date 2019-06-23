import axios from 'axios';

const availableSizes = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];

export function thunkAction() {
	return function(dispatch) {
		return axios.get('https://res.cloudinary.com/dssum2bol/raw/upload/v1551822356/products.json')
		.then(response => {
	      dispatch(products(response.data, availableSizes));
	    });
	}
}

function products(data, availableSizes) {
	return {
		type: 'SET_PRODUCTS',
		payload: { data, availableSizes }
	};
};

