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

const {
    fetchWordsByListRequest,
    fetchWordsByListSuccess,
    fetchWordsByListFailure,
} = createActions(
    "FETCH_WORDS_BY_LIST_REQUEST",
    "FETCH_WORDS_BY_LIST_SUCCESS",
    "FETCH_WORDS_BY_LIST_FAILURE"
);

const {
    startTest,
    cancelTest,
    finishTest,
    finishTestSuccess,
    finishTestFailure
} = createActions(
    "START_TEST",
    "CANCEL_TEST",
    "FINISH_TEST",
    "FINISH_TEST_SUCCESS",
    "FINISH_TEST_FAILURE"
);

const {
    shuffleListWordsRequest,
    shuffleListWordsSuccess,
    shuffleListWordsResetList,
} = createActions(
    "SHUFFLE_LIST_WORDS_REQUEST",
    "SHUFFLE_LIST_WORDS_SUCCESS",
    "SHUFFLE_LIST_WORDS_RESET_LIST",
);

const {
    testForgottenWordsRequest,
    testForgottenWordsSuccess,
    testForgottenWordsFailure,
    testForgottenWordsReset
} = createActions(
    "TEST_FORGOTTEN_WORDS_REQUEST",
    "TEST_FORGOTTEN_WORDS_SUCCESS",
    "TEST_FORGOTTEN_WORDS_FAILURE",
    "TEST_FORGOTTEN_WORDS_RESET",
);

const {
    fetchWordsStatsRequest,
    fetchWordsStatsSuccess,
    fetchWordsStatsFailure,
} = createActions(
    "FETCH_WORDS_STATS_REQUEST",
    "FETCH_WORDS_STATS_SUCCESS",
    "FETCH_WORDS_STATS_FAILURE"
);

const {
    resetWordStatsRequest,
    resetWordStatsSuccess,
    resetWordStatsFailure,
} = createActions(
    "RESET_WORD_STATS_REQUEST",
    "RESET_WORD_STATS_SUCCESS",
    "RESET_WORD_STATS_FAILURE"
);

const {
    setRandWordsQuant
} = createActions(
    "SET_RAND_WORDS_QUANT"
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
    fetchWordsByListRequest,
    fetchWordsByListSuccess,
    fetchWordsByListFailure,
    startTest,
    cancelTest,
    finishTest,
    finishTestSuccess,
    finishTestFailure,
    shuffleListWordsRequest,
    shuffleListWordsSuccess,
    shuffleListWordsResetList,
    testForgottenWordsRequest,
    testForgottenWordsSuccess,
    testForgottenWordsFailure,
    testForgottenWordsReset,
    fetchWordsStatsRequest,
    fetchWordsStatsSuccess,
    fetchWordsStatsFailure,
    resetWordStatsRequest,
    resetWordStatsSuccess,
    resetWordStatsFailure,
    setRandWordsQuant
};