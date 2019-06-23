const initialState = {
	products: {products: []},
	price: [],
	sort: [],
	availableSizes: [],
};

export default function(state = initialState, action) {
	switch(action.type) {
		case 'SET_PRODUCTS' : {
			const { data, availableSizes } = action.payload;
			return {
				...state,
				products: {
					...data
				},
				price: [...data.products],
				sort: [...data.products],
				availableSizes: [...availableSizes]
			}; 
		}
		case 'UPDATE_SORT' : {
			const sorted = action.payload;
			return {
				...state,
				sort: [...sorted]
			}
		}
		default:
			return state;
	}
}