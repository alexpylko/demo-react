import { handleActions } from "redux-actions";
import { apiDataRequest, apiDataSuccess, apiDataFailure } from "../middleware/actions";

// Initial state

const initialState = {
    meta: { }
};

// To handle the API request action

function handleApiDataRequest(state, action) {
    return {
        ...state,
        loading: true
    };
}

// To handle the API success action

function handleApiDataSuccess(state, action) {
    const { endpoint, response } = action;

    return {
        ...state,
        loading: false,
        meta: {
            [endpoint]: response
        }
    };
}

// To handle the API failure action

function handleApiDataFailure(state, action) {
    return {
        ...state,
        loading: false
    };
}

// Generate the reducer

export default handleActions({
    [apiDataRequest]: handleApiDataRequest,
    [apiDataSuccess]: handleApiDataSuccess,
    [apiDataFailure]: handleApiDataFailure
}, initialState);
