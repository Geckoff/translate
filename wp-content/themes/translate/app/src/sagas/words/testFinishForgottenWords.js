import {    
    testForgottenWordsSuccess,
    testForgottenWordsFailure,
    testForgottenWordsRequest
} from "../../actions/words";
import { takeLatest, call, put } from "redux-saga/effects";
import { getWordsByIds } from "../../api/api";
import requestFlow from "../request";

/**
 * Save to state the words that were forgottent after the test ran
 * 
 * @param {Object} payload
 * @param {array} payload.words_ids - words ids
 * @param {integer} data.words_ids[] - words ids
 */
export function* testForgottenWordstSaga({ payload }) {
    try {
        const words = yield call(requestFlow, getWordsByIds, payload);    
        yield put(testForgottenWordsSuccess(words));
    } catch (error) {
        yield put(testForgottenWordsFailure(error));
    }
}

export function* testForgottenWordsWatch() {
    yield takeLatest(testForgottenWordsRequest, testForgottenWordstSaga);
}
