import {
    finishTest,
    finishTestSuccess,
    finishTestFailure,
    testForgottenWordsReset,
    testForgottenWordsRequest
} from "../../actions/words";
import {resetSingleList} from "../../actions/lists";
import {addRedirect}  from "../../actions/redirects";
import { takeLatest, call, put } from "redux-saga/effects";
import { 
    updateWordForgot,
    updateWordRan
} from "../../api/api";
import requestFlow from "../request";

/**
 * Update statistics if the word was forgotten
 * 
 * @param {Object} payload
 * @param {array} payload.forgotWords - words ids
 * @param {integer} data.forgotWords[] - words ids
 * @param {array} payload.allWords - words ids
 * @param {integer} data.allWords[] - words ids
 */
export function* finishTestSaga({ payload }) {
    try {
        yield put(testForgottenWordsReset());
        if (payload.forgotWords.length > 0) {
            yield call(requestFlow, updateWordForgot, {words_ids: payload.forgotWords});
            yield call(requestFlow, updateWordRan, {words_ids: payload.allWords});
            yield put(finishTestSuccess());
            yield put(testForgottenWordsRequest({words_ids: payload.forgotWords}));
        } 
        else {
            yield call(requestFlow, updateWordRan, {words_ids: payload.allWords});
            yield put(finishTestSuccess());
        }                
        yield put(addRedirect('/test-results')); // redirect on success        
        yield put(resetSingleList());     // reset single list info
    } catch (error) {
        yield put(finishTestFailure(error));
    }
}

export function* finishTestWatch() {
    yield takeLatest(finishTest, finishTestSaga);
}
