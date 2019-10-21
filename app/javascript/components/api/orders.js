import { CALL_API } from "../middleware/api";
import { API_ORDERS_URL } from "../api/routing";

function requestEvents(params, options) {
    const { endpoint } = options;

    return {
        [CALL_API]: {
            ...options,
            options: {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify(params)
            }
        }
    };
}

// Make a order request

export const makeOrder = (params) => (dispatch, getState) => {
    const options = { 
        endpoint: API_ORDERS_URL,
    };

    return dispatch(requestEvents(params, options));
};