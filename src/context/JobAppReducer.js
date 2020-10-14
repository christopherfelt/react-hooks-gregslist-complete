export default (state, action) => {
  switch (action.type) {
    case "GET_JOBS":
      return {
        ...state,
        loading: false,
        jobs: action.payload,
      };
    case "GET_JOB":
      return {
        ...state,
        loading: false,
        job: action.payload,
      };
    case "POST_JOB":
      return {
        ...state,
        loading: false,
        jobs: action.payload,
      };
    default:
      return state;
  }
};
