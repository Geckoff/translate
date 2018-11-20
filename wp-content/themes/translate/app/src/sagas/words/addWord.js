import {
    addWordRequest,
    addWordSuccess,
    addWordFailure,
    translateWordReset
} from "../../actions/words";
import {
    fetchMultipleListsRequest
} from "../../actions/lists";
import {addMessage}  from "../../actions/messages";
import { takeLatest, call, put } from "redux-saga/effects";
import { addUpdateWord } from "../../api/api";
import requestFlow from "../request";
import {addRedirect}  from "../../actions/redirects";

/**
 * Add word.
 * 
 * @param {Object} payload
 * @param {string} payload.word - translated word
 * @param {string} payload.prim_trans - primary translation
 * @param {string} payload.prim_trans_pos - part of the spich for the primary translation
 * @param {array} payload.sec_trans - array if secondary translations
 * @param {array} payload.sec_trans[].translation - single secondary translation
 * @param {array} payload.sec_trans[].pos - part of the spich for the single secondary translation
 * @param {array} payload.lists - array of lists the word is assigned to
 * @param {integer} payload.lists[] - id of the list
 */
export function* addWordSaga({ payload }) {
    try {
        yield call(requestFlow, addUpdateWord, payload);
        yield put(addWordSuccess());
        yield put(fetchMultipleListsRequest());
        yield put(translateWordReset());        // reset translation form
        yield put(addRedirect('/add-word'));    // redirect to translatino form. helps to reset input of input text field
        yield put(addMessage({                  // success message
            type: 'success',
            message: 'Word was added'
        }));
    } catch (error) {
        yield put(addWordFailure(error));
    }
}

export function* addWordWatch() {
    yield takeLatest(addWordRequest, addWordSaga);
}
