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
    translateWordNotFound,
    addWordRequest,
    addWordSuccess,
    addWordFailure,
    editWordRequest,
    editWordSuccess,
    editWordFailure,
    deleteWordRequest,
    deleteWordSuccess,
    deleteWordFailure,
    getWordRequest,
    getWordSuccess,
    getWordFailure,
    fetchWordsByListRequest,
    fetchWordsByListSuccess,
    fetchWordsByListFailure,
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
        [addWordRequest]: () => true,
        [editWordRequest]: () => true,
        [deleteWordRequest]: () => true,
        [getWordRequest]: () => true,
        [fetchWordsByListRequest]: () => true,

        [fetchSingleListSuccess]: () => false,
        [fetchMultipleListsSuccess]: () => false,
        [addListSuccess]: () => false,
        [editListSuccess]: () => false,
        [deleteListSuccess]: () => false,
        [translateWordSuccess]: () => false,
        [addWordSuccess]: () => false,
        [editWordSuccess]: () => false,
        [deleteWordSuccess]: () => false,
        [getWordSuccess]: () => false,
        [fetchWordsByListSuccess]: () => false,

        [fetchSingleListFailure]: () => false,
        [fetchMultipleListsFailure]: () => false,
        [addListFailure]: () => false,
        [editListFailure]: () => false,
        [deleteListFailure]: () => false,
        [translateWordFailure]: () => false,
        [translateWordNotFound]: () => false,
        [addWordFailure]: () => false,
        [editWordFailure]: () => false,
        [deleteWordFailure]: () => false,
        [getWordFailure]: () => false,
        [fetchWordsByListFailure]: () => false,
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
        [addWordRequest]: () => false,
        [editWordRequest]: () => false,
        [deleteWordRequest]: () => false,
        [getWordRequest]: () => false,
        [fetchWordsByListRequest]: () => false,

        [fetchSingleListSuccess]: () => true,
        [fetchMultipleListsSuccess]: () => true,
        [addListSuccess]: () => true,
        [editListSuccess]: () => true,
        [deleteListSuccess]: () => true,
        [translateWordSuccess]: () => true,
        [addWordSuccess]: () => true,
        [editWordSuccess]: () => true,
        [deleteWordSuccess]: () => true,
        [getWordSuccess]: () => true,
        [fetchWordsByListSuccess]: () => true,

        [fetchSingleListFailure]: () => true,
        [fetchMultipleListsFailure]: () => true,
        [addListFailure]: () => true,
        [editListFailure]: () => true,
        [deleteListFailure]: () => true,
        [translateWordFailure]: () => true,
        [translateWordNotFound]: () => true,
        [addWordFailure]: () => true,
        [editWordFailure]: () => true,
        [deleteWordFailure]: () => true,
        [getWordFailure]: () => true,
        [fetchWordsByListFailure]: () => true,
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
        [addWordRequest]: () => null,
        [editWordRequest]: () => null,
        [deleteWordRequest]: () => null,
        [getWordRequest]: () => null,
        [fetchWordsByListRequest]: () => null,

        [fetchSingleListSuccess]: () => null,
        [fetchMultipleListsSuccess]: () => null,
        [addListSuccess]: () => null,
        [editListSuccess]: () => null,
        [deleteListSuccess]: () => null,
        [translateWordSuccess]: () => null,
        [addWordSuccess]: () => null,
        [editWordSuccess]: () => null,
        [deleteWordSuccess]: () => null,
        [getWordSuccess]: () => null,
        [fetchWordsByListSuccess]: () => null,

        [fetchSingleListFailure]: (state, action) => action.payload,
        [fetchMultipleListsFailure]: (state, action) => action.payload,
        [addListFailure]: (state, action) => action.payload,
        [editListFailure]: (state, action) => action.payload,
        [deleteListFailure]: (state, action) => action.payload,
        [translateWordFailure]: (state, action) => action.payload,
        [addWordFailure]: (state, action) => action.payload,
        [editWordFailure]: (state, action) => action.payload,
        [deleteWordFailure]: (state, action) => action.payload,
        [getWordFailure]: (state, action) => action.payload,
        [fetchWordsByListFailure]: (state, action) => action.payload,
    },
    null
);

export default combineReducers({
    isFetching,
    isFetched,
    error
});


