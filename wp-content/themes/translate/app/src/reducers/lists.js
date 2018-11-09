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

export const listSingle = handleActions(
    {
        [fetchSingleListRequest]: () => null,
        [fetchSingleListSuccess]: (state, action) => action.payload,
        [fetchSingleListFailure]: () => null
    },
    null
);

export const listsCollection = handleActions(
    {
        [fetchMultipleListsRequest]: () => null,
        [fetchMultipleListsSuccess]: (state, action) => action.payload,
        [fetchMultipleListsFailure]: () => null
    },
    []
);

export default combineReducers({
    listSingle,
    listsCollection
});


