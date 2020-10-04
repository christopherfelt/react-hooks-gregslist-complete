export default (state, action) => {
    switch (action.type){
        case "GET_CARS":
            return {
                ...state,
                loading: false,
                cars: action.payload
            };
        default:
            return state;
    }
}