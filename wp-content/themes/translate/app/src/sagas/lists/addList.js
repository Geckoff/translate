import {
    addListRequest,
    addListSuccess,
    addListFailure,
    fetchMultipleListsRequest
} from "../../actions/lists";
import {addRedirect}  from "../../actions/redirects";
import {addMessage}  from "../../actions/messages";
import { takeLatest, call, put } from "redux-saga/effects";
import { createList } from "../../api/api";
import requestFlow from "../request";

/**
 * Create list
 * 
 * @param {Object} payload
 * @param {string} payload.listName - name of the list
 */
export function* addListSaga({ payload }) {
    try {
        yield call(requestFlow, createList, payload);
        yield put(addListSuccess());
        yield put(fetchMultipleListsRequest()); // pull in an updated lists of all word lists
        yield put(addRedirect('/lists'));       // redirect to the list page on success
        yield put(addMessage({                  // success message
            type: 'success',
            message: 'List was created'
        }));
    } catch (error) {
        yield put(addListFailure(error));
    }
}

export function* addListWatch() {
    yield takeLatest(addListRequest, addListSaga);
}
