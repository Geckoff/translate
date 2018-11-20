import {
    deleteWordRequest,
    deleteWordSuccess,
    deleteWordFailure,
} from "../../actions/words";
import {
    fetchMultipleListsRequest
} from "../../actions/lists";
import {addRedirect}  from "../../actions/redirects";
import {addMessage}  from "../../actions/messages";
import { takeLatest, call, put } from "redux-saga/effects";
import { deleteWord } from "../../api/api";
import requestFlow from "../request";

/**
 * Delete list
 * 
 * @param {Object} payload
 * @param {integer} payload.id - id of the word
 */
export function* deleteWordSaga({ payload }) {
    try {
        yield call(requestFlow, deleteWord, payload);
        yield put(deleteWordSuccess());
        yield put(fetchMultipleListsRequest());
        yield put(addRedirect('/lists'));       // redirect to the list page on success
        yield put(addMessage({                  // success message
            type: 'success',
            message: 'Word was deleted'
        }));
    } catch (error) {
        yield put(deleteWordFailure(error));
    }
}

export function* deleteWordWatch() {
    yield takeLatest(deleteWordRequest, deleteWordSaga);
}
