import {
    editWordRequest,
    editWordSuccess,
    editWordFailure,
    getWordRequest,
    fetchWordsByListRequest
} from "../../actions/words";
import {addMessage}  from "../../actions/messages";
import { takeLatest, call, put, select } from "redux-saga/effects";
import { addUpdateWord } from "../../api/api";
import requestFlow from "../request";
import { getSingleList } from "../../reducers";

/**
 * Add word.
 * 
 * @param {Object} payload
 * @param {string} payload.id - updated word id
 * @param {string} payload.word - translated word
 * @param {string} payload.prim_trans - primary translation
 * @param {string} payload.prim_trans_pos - part of the spich for the primary translation
 * @param {array} payload.sec_trans - array if secondary translations
 * @param {array} payload.sec_trans[].translation - single secondary translation
 * @param {array} payload.sec_trans[].pos - part of the spich for the single secondary translation
 * @param {array} payload.lists - array of lists the word is assigned to
 * @param {integer} payload.lists[] - id of the list
 */
export function* editWordSaga({ payload }) {
    try {
        yield call(requestFlow, addUpdateWord, payload);
        yield put(editWordSuccess());
        yield put(addMessage({                  // success message
            type: 'success',
            message: 'Word was updated'
        }));
        yield put(getWordRequest({id: payload.id})); // fetch updated word
        const singleList = yield select(getSingleList);
        if (singleList) {
            yield put(fetchWordsByListRequest({lists: [singleList.id]}));    
        }
    } catch (error) {
        yield put(editWordFailure(error));
    }
}

export function* editWordWatch() {
    yield takeLatest(editWordRequest, editWordSaga);
}
