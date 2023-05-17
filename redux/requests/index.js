import {
  getQuotesAPI,
  addToDatabase,
  fetchFromDatabase,
  removeFromDatabase,
} from "../actions";

export const fetchNotesAPI = (dispatch) => {
  dispatch(getQuotesAPI());
};

export const fetchNotesDB = (dispatch) => {
  dispatch(fetchFromDatabase());
};

export const removeNoteDB = (dispatch, id) => {
  dispatch(removeFromDatabase(id));
};

export const addNoteDB = (dispatch, note) => {
  dispatch(addToDatabase(note));
};
