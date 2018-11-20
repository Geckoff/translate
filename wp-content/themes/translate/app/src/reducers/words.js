import {
    translateWordRequest,
    translateWordSuccess,
    translateWordFailure,   
    translateWordReset,
    getWordRequest,
    getWordSuccess,
    getWordFailure,
    fetchWordsByListRequest,
    fetchWordsByListSuccess,
    fetchWordsByListFailure,
} from "../actions/words";
import {combineReducers} from 'redux';
import { handleActions } from "redux-actions";

export const translatingWord = handleActions(
    {
        [translateWordRequest]: () => null,
        [translateWordSuccess]: (state, action) => action.payload,
        [translateWordFailure]: () => null,
        [translateWordReset]: () => null
    },
    null
);

export const editedWord = handleActions(
    {
        [getWordRequest]: () => null,
        [getWordSuccess]: (state, action) => action.payload,
        [getWordFailure]: () => null
    },
    null
);

export const wordsByList = handleActions(
    {
        [fetchWordsByListRequest]: () => [],
        [fetchWordsByListSuccess]: (state, action) => action.payload,
        [fetchWordsByListFailure]: () => []
    },
    []
);

export default combineReducers({
    translatingWord,
    editedWord,
    wordsByList
});


