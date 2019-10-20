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
    const { dataType, response: { entries = [] } } = action;
    const { [dataType]: dataOfType = {}, ...restOfState} = state;

    // Convert the array of the entries to the object with entry ids as keys
    const entriesObj = entries.reduce((memo, entry) => {
        memo[entry.id] = entry;
        return memo;
    }, { });

    return {
        ...restOfState,
        loading: false,
        [dataType]: {
            ...dataOfType,
            ...entriesObj
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
