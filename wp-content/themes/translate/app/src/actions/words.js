import { createActions } from "redux-actions";

const {
    translateWordRequest,
    translateWordSuccess,
    translateWordFailure,
    translateWordNotFound,
} = createActions(
    "TRANSLATE_WORD_REQUEST",
    "TRANSLATE_WORD_SUCCESS",
    "TRANSLATE_WORD_FAILURE",
    "TRANSLATE_WORD_NOT_FOUND",
);

export {
    translateWordRequest,
    translateWordSuccess,
    translateWordFailure, 
    translateWordNotFound   
};