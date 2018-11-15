import { createActions } from "redux-actions";

const {
    translateWordRequest,
    translateWordSuccess,
    translateWordFailure
} = createActions(
    "TRANSLATE_WORD_REQUEST",
    "TRANSLATE_WORD_SUCCESS",
    "TRANSLATE_WORD_FAILURE"
);

export {
    translateWordRequest,
    translateWordSuccess,
    translateWordFailure,    
};