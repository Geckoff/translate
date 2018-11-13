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

export function* addListSaga({ payload }) {
    try {
        yield call(requestFlow, createList, payload);
        yield put(addListSuccess());
        yield put(fetchMultipleListsRequest());
        yield put(addRedirect('/lists'));
        yield put(addMessage('List was created'));
    } catch (error) {
        yield put(addListFailure(error));
    }
}

export function* addListWatch() {
    yield takeLatest(addListRequest, addListSaga);
}
