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

const {
    editWordRequest,
    editWordSuccess,
    editWordFailure,
} = createActions(
    "EDIT_WORD_REQUEST",
    "EDIT_WORD_SUCCESS",
    "EDIT_WORD_FAILURE"
);

const {
    deleteWordRequest,
    deleteWordSuccess,
    deleteWordFailure,
} = createActions(
    "DELETE_WORD_REQUEST",
    "DELETE_WORD_SUCCESS",
    "DELETE_WORD_FAILURE"
);

const {
    getWordRequest,
    getWordSuccess,
    getWordFailure,
} = createActions(
    "GET_WORD_REQUEST",
    "GET_WORD_SUCCESS",
    "GET_WORD_FAILURE"
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
    editWordRequest,
    editWordSuccess,
    editWordFailure,
    deleteWordRequest,
    deleteWordSuccess,
    deleteWordFailure,
    getWordRequest,
    getWordSuccess,
    getWordFailure,
};