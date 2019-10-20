import { applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import api from "./api";

const middleware = [
    thunk,
    api
];

if(process.env.NODE_ENV === "development") {
	// middleware.push(logger);
}

export default applyMiddleware(...middleware);