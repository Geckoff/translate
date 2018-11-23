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
    startTest,
    cancelTest,
    finishTest,
    shuffleListWordsSuccess,
    shuffleListWordsResetList,
    testForgottenWordsRequest,
    testForgottenWordsSuccess,
    testForgottenWordsFailure,
    testForgottenWordsReset
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
        [fetchWordsByListFailure]: () => [],
        [shuffleListWordsSuccess]: (state, action) => action.payload,
        [shuffleListWordsResetList]: () => [],
    },
    []
);

export const testInProgress = handleActions(
    {
        [startTest]: () => true,
        [cancelTest]: () => false,
        [finishTest]: () => false
    },
    false
);

export const testPath = handleActions(
    {
        [startTest]: (state, action) => action.payload,
        [cancelTest]: () => null,
        [finishTest]: () => null
    },
    null
);

export const testForgottenWords = handleActions(
    {
        [testForgottenWordsRequest]: () => [],
        [testForgottenWordsSuccess]: (state, action) => action.payload,
        [testForgottenWordsFailure]: () => [],
        [testForgottenWordsReset]: () => [],
    },
    []
);

export default combineReducers({
    translatingWord,
    editedWord,
    wordsByList,
    testInProgress,
    testPath,
    testForgottenWords
});


