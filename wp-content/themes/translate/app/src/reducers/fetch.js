import {
    fetchSingleListRequest,
    fetchSingleListSuccess,
    fetchSingleListFailure,
    fetchMultipleListsRequest,
    fetchMultipleListsSuccess,
    fetchMultipleListsFailure,
    addListRequest,
    addListSuccess,
    addListFailure,
    editListRequest,
    editListSuccess,
    editListFailure
} from "../actions/lists";
import {combineReducers} from 'redux';
import { handleActions } from "redux-actions";

export const isFetching = handleActions(
    {
        [fetchSingleListRequest]: () => true,
        [fetchMultipleListsRequest]: () => true,
        [addListRequest]: () => true,
        [editListRequest]: () => true,

        [fetchSingleListSuccess]: () => false,
        [fetchMultipleListsSuccess]: () => false,
        [addListSuccess]: () => false,
        [editListSuccess]: () => false,

        [fetchSingleListFailure]: () => false,
        [fetchMultipleListsFailure]: () => false,
        [addListFailure]: () => false,
        [editListFailure]: () => false,
    },
    false
);

export const isFetched = handleActions(
    {
        [fetchSingleListRequest]: () => false,
        [fetchMultipleListsRequest]: () => false,
        [addListRequest]: () => false,
        [editListRequest]: () => false,

        [fetchSingleListSuccess]: () => true,
        [fetchMultipleListsSuccess]: () => true,
        [addListSuccess]: () => true,
        [editListSuccess]: () => true,

        [fetchSingleListFailure]: () => true,
        [fetchMultipleListsFailure]: () => true,
        [addListFailure]: () => true,
        [editListFailure]: () => true,
    },
    false
);

export const error = handleActions(
    {
        [fetchSingleListRequest]: () => null,
        [fetchMultipleListsRequest]: () => null,
        [addListRequest]: () => null,
        [editListRequest]: () => null,

        [fetchSingleListSuccess]: () => null,
        [fetchMultipleListsSuccess]: () => null,
        [addListSuccess]: () => null,
        [editListSuccess]: () => null,

        [fetchSingleListFailure]: (state, action) => action.payload,
        [fetchMultipleListsFailure]: (state, action) => action.payload,
        [addListFailure]: (state, action) => action.payload,
        [editListFailure]: (state, action) => action.payload,
    },
    null
);

export default combineReducers({
    isFetching,
    isFetched,
    error
});


