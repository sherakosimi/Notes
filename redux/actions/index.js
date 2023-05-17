import axios from "axios";
import db from "../../db/db";

export const GET_QUOTES_API_SUCCESS = "GET_QUOTES_API";
export const GET_QUOTES_API_ERROR = "GET_QUOTES_API_ERROR";
export const ADD_TO_DATABASE_SUCCESS = "GET_QUOTES_API";
export const ADD_TO_DATABASE_ERROR = "GET_QUOTES_API_ERROR";
export const FETCH_QUOTES_DB_SUCCESS = "FETCH_QUOTES_DB_SUCCESS";
export const FETCH_QUOTES_DB_ERROR = "FETCH_QUOTES_DB_ERROR";

export const getQuotesAPI = () => {
  try {
    return async (dispatch) => {
      const res = await axios.get(
        "https://thesimpsonsquoteapi.glitch.me/quotes?count=10"
      );
      if (res.data) {
        dispatch({
          type: GET_QUOTES_API_SUCCESS,
        });
        dispatch(addToDatabase(res.data));
        return res.data;
      } else {
        console.log("Unable to fetch Sympsons quotes from API");
      }
    };
  } catch (error) {
    dispatch({
      type: GET_QUOTES_API_ERROR,
      payload: error,
    });
  }
};

export const addToDatabase = (notes) => {
  return async (dispatch) => {
    try {
      db.transaction((tx) => {
        notes.forEach((note) => {
          tx.executeSql(
            "INSERT INTO quotes (character, quote) VALUES (?, ?);",
            [note.character, note.quote],
            (_, result) => {
              console.log("Note inserted successfully");
            },
            (_, error) => {
              console.log("Error inserting note:", error);
            }
          );
        });
      });
      console.log("SUCCESS");
      dispatch({ type: "ADD_TO_DATABASE_SUCCESS" });
      dispatch(fetchFromDatabase());
    } catch (error) {
      console.log("ERROR");
      dispatch({ type: "ADD_TO_DATABASE_ERROR", payload: error.message });
    }
  };
};

export const fetchFromDatabase = () => {
  return async (dispatch) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM quotes;",
        [],
        (_, result) => {
          const items = result.rows._array; // Retrieve the items from the query result
          dispatch({
            type: "FETCH_QUOTES_DB_SUCCESS",
            payload: items,
          });
          return result;
        },
        (_, error) => {
          console.log("Error fetching items from the database:", error);
          dispatch({ type: "FETCH_QUOTES_DB_ERROR", payload: error.message });
          return null;
        }
      );
    });
  };
};

export const removeFromDatabase = (itemId) => {
  return (dispatch) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM quotes WHERE id = ?;",
        [itemId],
        (_, result) => {
          console.log("Item removed from the database successfully");
          dispatch(fetchFromDatabase()); // Fetch the updated items from the database
        },
        (_, error) => {
          console.log("Error removing item from the database:", error);
        }
      );
    });
  };
};
