import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";
import api from "./api";

const persistConfig = {
    key: "demo",
    blacklist: [ "api" ],
    storage,
    transforms: []
};

export default persistCombineReducers(persistConfig, {
    api
});