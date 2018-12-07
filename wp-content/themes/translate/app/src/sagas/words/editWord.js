import {
    editWordRequest,
    editWordSuccess,
    editWordFailure,
    getWordRequest,
    fetchWordsByListRequest,
    testForgottenWordsRequest
} from "../../actions/words";
import {addMessage}  from "../../actions/messages";
import { takeLatest, call, put, select } from "redux-saga/effects";
import { addUpdateWord } from "../../api/api";
import requestFlow from "../request";
import { 
    getSingleList,
    getTestForgottenWords,
    getWordsByList
} from "../../reducers";

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
            const singleListWords = yield select(getWordsByList);
            if (checkIfIdInList(payload.id, singleListWords)) {            
                yield put(fetchWordsByListRequest({lists: [singleList.id]})); // fetch list of words if the word is a part of the list
            }
        }       

        const testForgottenWords = yield select(getTestForgottenWords);
        if (testForgottenWords && checkIfIdInList(payload.id, testForgottenWords)) {
            const forgottenWordsIds = testForgottenWords.map(forgottenWord => forgottenWord.id);
            yield put(testForgottenWordsRequest({words_ids: forgottenWordsIds})); // fetch list of test results if the word is a part of the test result
        }
    } catch (error) {
        yield put(editWordFailure(error));
    }
}


/**
 * Check id current word id is a part of a word list
 * 
 * @param {integer} id - id of the word
 * @param {array} list - list od words
 */
const checkIfIdInList = (id, list) => {
    let inList = false;
    list.forEach(elem => {
        if (elem.id == id) {
            inList = true;   
        }
    })   
    return inList;
}

export function* editWordWatch() {
    yield takeLatest(editWordRequest, editWordSaga);
}
