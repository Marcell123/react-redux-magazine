const initialState = {
	installments: 0,
};

export default function(state = initialState, action) {
	switch(action.type) {
		case 'UDDATE_INSTALLMENTS' :
		const { installments } = action.payload;
			return {
				...state,
				installments: installments
			};
		default:
			return state;
	}
}