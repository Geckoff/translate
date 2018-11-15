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

export function* deleteListSaga({ payload }) {
    try {
        yield call(requestFlow, deleteList, payload);
        yield put(deleteListSuccess());
        yield put(fetchMultipleListsRequest());
        yield put(addRedirect('/lists'));
        yield put(addMessage('List was deleted'));
    } catch (error) {
        yield put(deleteListFailure(error));
    }
}

export function* deleteListWatch() {
    yield takeLatest(deleteListRequest, deleteListSaga);
}
