export default (state, action) => {
  switch (action.type) {
    case "GET_HOUSES":
      return {
        ...state,
        loading: false,
        houses: action.payload,
      };
    case "GET_HOUSE":
      return {
        ...state,
        loading: false,
        house: action.payload,
      };
    case "POST_HOUSE":
      return {
        ...state,
        loading: false,
        houses: action.payload,
      };
    default:
      return state;
  }
};
