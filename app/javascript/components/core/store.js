import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import middleware from "../middleware/index";
import reducer from "../reducers/index";
import initialState from "./initialState";

export const AppStore = createStore(reducer, initialState, middleware);
export const AppPersistor = persistStore(AppStore);
