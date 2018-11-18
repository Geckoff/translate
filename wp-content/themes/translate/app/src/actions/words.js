import { createActions } from "redux-actions";

const {
    translateWordRequest,
    translateWordSuccess,
    translateWordFailure,
    translateWordNotFound,
    translateWordReset,
} = createActions(
    "TRANSLATE_WORD_REQUEST",
    "TRANSLATE_WORD_SUCCESS",
    "TRANSLATE_WORD_FAILURE",
    "TRANSLATE_WORD_NOT_FOUND",
    "TRANSLATE_WORD_RESET",
);

const {
    addWordRequest,
    addWordSuccess,
    addWordFailure,
} = createActions(
    "ADD_WORD_REQUEST",
    "ADD_WORD_SUCCESS",
    "ADD_WORD_FAILURE"
);

export {
    translateWordRequest,
    translateWordSuccess,
    translateWordFailure, 
    translateWordNotFound,
    translateWordReset,
    addWordRequest,
    addWordSuccess,
    addWordFailure,
};