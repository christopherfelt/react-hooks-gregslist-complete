export default (state, action) => {
    switch (action.type){
        case "GET_CARS":
            return {
                ...state,
                loading: false,
                cars: action.payload
            };
        case "GET_CAR":
            return {
                ...state,
                loading: false,
                car: action.payload
            };
        case "POST_CARS":
            return {
                ...state,
                loading: false,
                cars: action.payload
            }
        default:
            return state;
    }
}