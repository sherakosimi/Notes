import {
  GET_QUOTES_API_SUCCESS,
  GET_QUOTES_API_ERROR,
  ADD_TO_DATABASE_ERROR,
  ADD_TO_DATABASE_SUCCESS,
  FETCH_QUOTES_DB_ERROR,
  FETCH_QUOTES_DB_SUCCESS,
} from "../actions";

const initialState = {
  database: null,
  error: null,
};

function quotesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_QUOTES_API_SUCCESS:
      return { ...state };
    case GET_QUOTES_API_ERROR:
      return { ...state, error: action.payload };
    case ADD_TO_DATABASE_SUCCESS:
      return { ...state };
    case ADD_TO_DATABASE_ERROR:
      return { ...state, error: action.payload };
    case FETCH_QUOTES_DB_SUCCESS:
      return { ...state, database: action.payload };
    case FETCH_QUOTES_DB_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
export default quotesReducer;
