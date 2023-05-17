import { createStore, combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import quotesReducer from "./reducers";

export const store = configureStore({
  reducer: {
    quotes: quotesReducer,
  },
});
