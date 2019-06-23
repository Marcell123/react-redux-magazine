const initialState = {
	totalCartPrice: 0,
};

export default function(state = initialState, action) {
	switch(action.type) {
		case 'TOTAL_CART_PRICE' :
		const { totalCartPrice } = action.payload;
			return {
				...state,
				totalCartPrice: totalCartPrice
			};
		default:
			return state;
	}
}