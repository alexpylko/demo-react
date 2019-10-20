import { CALL_API } from "../middleware/api";
import { API_ORDERS_URL } from "../api/routing";

// Make a API call to fetch the deals

function requestEvents(params, options) {
    const { endpoint } = options;

    return {
        [CALL_API]: {
            ...options
        }
    };
}

// Load the deals either from the API endpoint or the local cache

export const makeOrder = (params) => (dispatch, getState) => {
    const options = { 
        endpoint: API_ORDERS_URL,
    };

    return dispatch(requestEvents(params, options));
};