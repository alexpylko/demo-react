import { createAction } from "redux-actions";

// The API base actions

// The API request started
export const API_DATA_REQUEST = "API_DATA_REQUEST";
export const apiDataRequest = createAction(API_DATA_REQUEST);

// The API request succeeded
export const API_DATA_SUCCESS = "API_DATA_SUCCESS";
export const apiDataSuccess = createAction(API_DATA_SUCCESS);

// The API request failed
export const API_DATA_FAILURE = "API_DATA_FAILURE";
export const apiDataFailure = createAction(API_DATA_FAILURE);