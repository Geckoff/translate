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
    editListFailure,
    deleteListRequest,
    deleteListSuccess,
    deleteListFailure
} from "../actions/lists";
import {
    translateWordRequest,
    translateWordSuccess,
    translateWordFailure, 
} from "../actions/words";
import {combineReducers} from 'redux';
import { handleActions } from "redux-actions";

export const isFetching = handleActions(
    {
        [fetchSingleListRequest]: () => true,
        [fetchMultipleListsRequest]: () => true,
        [addListRequest]: () => true,
        [editListRequest]: () => true,
        [deleteListRequest]: () => true,
        [translateWordRequest]: () => true,

        [fetchSingleListSuccess]: () => false,
        [fetchMultipleListsSuccess]: () => false,
        [addListSuccess]: () => false,
        [editListSuccess]: () => false,
        [deleteListSuccess]: () => false,
        [translateWordSuccess]: () => false,

        [fetchSingleListFailure]: () => false,
        [fetchMultipleListsFailure]: () => false,
        [addListFailure]: () => false,
        [editListFailure]: () => false,
        [deleteListFailure]: () => false,
        [translateWordFailure]: () => false,
    },
    false
);

export const isFetched = handleActions(
    {
        [fetchSingleListRequest]: () => false,
        [fetchMultipleListsRequest]: () => false,
        [addListRequest]: () => false,
        [editListRequest]: () => false,
        [deleteListRequest]: () => false,
        [translateWordRequest]: () => false,

        [fetchSingleListSuccess]: () => true,
        [fetchMultipleListsSuccess]: () => true,
        [addListSuccess]: () => true,
        [editListSuccess]: () => true,
        [deleteListSuccess]: () => true,
        [translateWordSuccess]: () => true,

        [fetchSingleListFailure]: () => true,
        [fetchMultipleListsFailure]: () => true,
        [addListFailure]: () => true,
        [editListFailure]: () => true,
        [deleteListFailure]: () => true,
        [translateWordFailure]: () => true,
    },
    false
);

export const error = handleActions(
    {
        [fetchSingleListRequest]: () => null,
        [fetchMultipleListsRequest]: () => null,
        [addListRequest]: () => null,
        [editListRequest]: () => null,
        [deleteListRequest]: () => null,
        [translateWordRequest]: () => null,

        [fetchSingleListSuccess]: () => null,
        [fetchMultipleListsSuccess]: () => null,
        [addListSuccess]: () => null,
        [editListSuccess]: () => null,
        [deleteListSuccess]: () => null,
        [translateWordSuccess]: () => null,

        [fetchSingleListFailure]: (state, action) => action.payload,
        [fetchMultipleListsFailure]: (state, action) => action.payload,
        [addListFailure]: (state, action) => action.payload,
        [editListFailure]: (state, action) => action.payload,
        [deleteListFailure]: (state, action) => action.payload,
        [translateWordFailure]: (state, action) => action.payload,
    },
    null
);

export default combineReducers({
    isFetching,
    isFetched,
    error
});


