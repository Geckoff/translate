import {
    translateWordRequest,
    translateWordSuccess,
    translateWordFailure,   
    translateWordReset,
    getWordRequest,
    getWordSuccess,
    getWordFailure,
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

export default combineReducers({
    translatingWord,
    editedWord
});


