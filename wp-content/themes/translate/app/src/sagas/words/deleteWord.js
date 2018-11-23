import {
    deleteWordRequest,
    deleteWordSuccess,
    deleteWordFailure,
    fetchWordsByListRequest
} from "../../actions/words";
import {
    fetchMultipleListsRequest
} from "../../actions/lists";
import {addRedirect}  from "../../actions/redirects";
import {addMessage}  from "../../actions/messages";
import { takeLatest, call, put, select } from "redux-saga/effects";
import { deleteWord } from "../../api/api";
import requestFlow from "../request";
import { getSingleList } from "../../reducers";

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
        const redirectPath = payload.redirectPath ? payload.redirectPath : '/lists';
        yield put(addRedirect(redirectPath));   // redirect on success
        yield put(addMessage({                  // success message
            type: 'success',
            message: 'Word was deleted'
        }));
        const singleList = yield select(getSingleList);
        if (singleList) {
            yield put(fetchWordsByListRequest({lists: [singleList.id]}));    
        }
    } catch (error) {
        yield put(deleteWordFailure(error));
    }
}

export function* deleteWordWatch() {
    yield takeLatest(deleteWordRequest, deleteWordSaga);
}
