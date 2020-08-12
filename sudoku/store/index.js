import React from "react";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

const initialState = {
  sudokuData: [],
  dataEditSudoku: [],
  leaderBoard: [],
  status: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TABLE":
      return {
        ...state,
        sudokuData: action.payload,
      };
    case "SET_EDIT_TABLE":
      return {
        ...state,
        dataEditSudoku: action.payload,
      };

    case "SET_STATUS":
      return {
        ...state,
        status: action.payload,
      };

    case "ADD_LEADERBOARD":
      return {
        ...state,
        leaderBoard: state.leaderBoard.concat(action.payload),
      };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
