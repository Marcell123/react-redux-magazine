const initialState = {
	quantity: 0
};

export default function(state = initialState, action) {
	switch(action.type) {
		case 'UPDATE_QUANTITY' :
		const { quantity } = action.payload;
			return {
				...state,
				quantity: quantity
			};
		default:
			return state;
	}
}