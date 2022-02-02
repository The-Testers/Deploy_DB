// STORE

import { createStore, combineReducers } from "redux";
import loginReducer from "./login";
import articlesReducer from "./articles";

const reducers = combineReducers({ loginReducer, articlesReducer });

const store = createStore(reducers);

export default store;
