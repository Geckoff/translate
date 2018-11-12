import {
    fetchSingleListRequest,
    fetchSingleListSuccess,
    fetchSingleListFailure,
    fetchMultipleListsRequest,
    fetchMultipleListsSuccess,
    fetchMultipleListsFailure,
    addListRequest,
    addListSuccess,
    addListFailure
} from "../actions/lists";
import {combineReducers} from 'redux';
import { handleActions } from "redux-actions";

export const isFetching = handleActions(
    {
        [fetchSingleListRequest]: () => true,
        [fetchMultipleListsRequest]: () => true,
        [addListRequest]: () => true,

        [fetchSingleListSuccess]: () => false,
        [fetchMultipleListsSuccess]: () => false,
        [addListSuccess]: () => false,

        [fetchSingleListFailure]: () => false,
        [fetchMultipleListsFailure]: () => false,
        [addListFailure]: () => false,
    },
    false
);

export const isFetched = handleActions(
    {
        [fetchSingleListRequest]: () => false,
        [fetchMultipleListsRequest]: () => false,
        [addListRequest]: () => false,

        [fetchSingleListSuccess]: () => true,
        [fetchMultipleListsSuccess]: () => true,
        [addListSuccess]: () => true,

        [fetchSingleListFailure]: () => true,
        [fetchMultipleListsFailure]: () => true,
        [addListFailure]: () => true,
    },
    false
);

export const error = handleActions(
    {
        [fetchSingleListRequest]: () => null,
        [fetchMultipleListsRequest]: () => null,
        [addListRequest]: () => null,

        [fetchSingleListSuccess]: () => null,
        [fetchMultipleListsSuccess]: () => null,
        [addListSuccess]: () => null,

        [fetchSingleListFailure]: (state, action) => action.payload,
        [fetchMultipleListsFailure]: (state, action) => action.payload,
        [addListFailure]: (state, action) => action.payload
    },
    null
);

export default combineReducers({
    isFetching,
    isFetched,
    error
});


