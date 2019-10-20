import { API_DATA_REQUEST, API_DATA_SUCCESS, API_DATA_FAILURE } from "./actions";

export const CALL_API = "Call API";

// Make the API call
async function callApi(endpoint, options = {}) {
    try {
        const response = await fetch(endpoint, { ...options, credentials: "include" });
        return await response.json();
    }
    catch(e) {
        return Promise.reject(e);
    }    
}

/// The new API redux middleware
export default store => next => async (action) => {
    const callAPI = action[CALL_API];

    if (typeof callAPI === "undefined") {
        return next(action);
    }

    const { options, types, endpoint } = callAPI;

    // Set deafult action types
    let [requestType, successType, failureType] = [ 
        API_DATA_REQUEST, 
        API_DATA_SUCCESS, 
        API_DATA_FAILURE 
     ];

    // Identify the redux action types with defaults

    if(Array.isArray(types)) {
        [requestType, successType, failureType] = types;
    }
    else if (typeof types == "string") {
        successType = types;
    }
    else if (typeof types == "object") {
        ({
            requestType = API_DATA_REQUEST, 
            successType = API_DATA_SUCCESS, 
            failureType = API_DATA_FAILURE 
        } = types);
    }

    // Identify the action endpoint

    if (typeof endpoint === "function") {
        endpoint = endpoint(store.getState());
    }

    if (typeof endpoint !== "string") {
        throw new Error("Specify a string endpoint URL.");
    }

    const actionWith = (data) => {
        const finalAction = Object.assign({}, action, data);
        delete finalAction[CALL_API];
        return finalAction;
    };

    next(actionWith({ type: requestType, endpoint }));

    try {
        const response = await callApi(endpoint, options || { });
        return await next(actionWith({ response, type: successType, ...callAPI }));
    }
    catch(error) {
        return await next(actionWith({ type: failureType, error, ...callAPI }));
    }
}