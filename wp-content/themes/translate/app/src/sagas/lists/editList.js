import {
    editListRequest,
    editListSuccess,
    editListFailure,
    fetchMultipleListsRequest
} from "../../actions/lists";
import {addRedirect}  from "../../actions/redirects";
import {addMessage}  from "../../actions/messages";
import { takeLatest, call, put } from "redux-saga/effects";
import { updateList } from "../../api/api";
import requestFlow from "../request";

/**
 * Update lisr
 * 
 * @param {Object} payload
 * @param {integer} payload.id - id of the list
 * @param {string} payload.name - new name of the list
 */
export function* editListSaga({ payload }) {
    try {
        yield call(requestFlow, updateList, payload);
        yield put(editListSuccess());
        yield put(fetchMultipleListsRequest()); // pull in an updated lists of all word lists
        yield put(addRedirect('/lists'));       // redirect to the list page on success
        yield put(addMessage({                  // success message
            type: 'success',
            message: 'List was updated'
        }));
    } catch (error) {
        yield put(editListFailure(error));
    }
}

export function* editListWatch() {
    yield takeLatest(editListRequest, editListSaga);
}
