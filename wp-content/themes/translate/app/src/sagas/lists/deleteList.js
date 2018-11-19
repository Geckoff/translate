import {
    deleteListRequest,
    deleteListSuccess,
    deleteListFailure,
    fetchMultipleListsRequest
} from "../../actions/lists";
import {addRedirect}  from "../../actions/redirects";
import {addMessage}  from "../../actions/messages";
import { takeLatest, call, put } from "redux-saga/effects";
import { deleteList } from "../../api/api";
import requestFlow from "../request";

/**
 * Delete list
 * 
 * @param {Object} payload
 * @param {integer} payload.id - id of the list
 */
export function* deleteListSaga({ payload }) {
    try {
        yield call(requestFlow, deleteList, payload);
        yield put(deleteListSuccess());
        yield put(fetchMultipleListsRequest()); // pull in an updated lists of all word lists
        yield put(addRedirect('/lists'));       // redirect to the list page on success
        yield put(addMessage({                  // success message
            type: 'success',
            message: 'List was deleted'
        }));
    } catch (error) {
        yield put(deleteListFailure(error));
    }
}

export function* deleteListWatch() {
    yield takeLatest(deleteListRequest, deleteListSaga);
}
