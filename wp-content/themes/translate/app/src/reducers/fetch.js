import {
    fetchSingleListRequest,
    fetchSingleListSuccess,
    fetchSingleListFailure,
    fetchMultipleListsRequest,
    fetchMultipleListsSuccess,
    fetchMultipleListsFailure
} from "../actions/lists";
import {combineReducers} from 'redux';
import { handleActions } from "redux-actions";

export const isFetching = handleActions(
    {
        [fetchSingleListRequest]: () => true,
        [fetchMultipleListsRequest]: () => true,
        [fetchSingleListSuccess]: () => false,
        [fetchMultipleListsSuccess]: () => false,
        [fetchSingleListFailure]: () => false,
        [fetchMultipleListsFailure]: () => false,
    },
    false
);

export const isFetched = handleActions(
    {
        [fetchSingleListRequest]: () => false,
        [fetchMultipleListsRequest]: () => false,
        [fetchSingleListSuccess]: () => true,
        [fetchMultipleListsSuccess]: () => true,
        [fetchSingleListFailure]: () => true,
        [fetchMultipleListsFailure]: () => true,
    },
    false
);

export const error = handleActions(
    {
        [fetchSingleListRequest]: () => null,
        [fetchMultipleListsRequest]: () => null,
        [fetchSingleListSuccess]: () => null,
        [fetchMultipleListsSuccess]: () => null,
        [fetchSingleListFailure]: (state, action) => action.payload,
        [fetchMultipleListsFailure]: (state, action) => action.payload
    },
    null
);

export default combineReducers({
    isFetching,
    isFetched,
    error
});


