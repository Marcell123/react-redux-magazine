const initialState = {
	cart: []
};

export default function(state = initialState, action) {
	switch(action.type) {
		case 'ADD_TO_CART' :
		const { product } = action.payload;
			return {
				...state,
				cart: [...state.cart, product ]
			};
		case 'ITEM_REMOVE' :
			const { index }  = action.payload;
			let newState = {
				...state,
				cart: [...state.cart]
			};
			newState.cart.splice(index, 1);
			return newState;
			
		default:
			return state;
	}
}