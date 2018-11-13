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

export function* editListSaga({ payload }) {
    try {
        yield call(requestFlow, updateList, payload);
        yield put(editListSuccess());
        yield put(fetchMultipleListsRequest());
        yield put(addRedirect('/lists'));
        yield put(addMessage('List was updated'));
    } catch (error) {
        yield put(editListFailure(error));
    }
}

export function* editListWatch() {
    yield takeLatest(editListRequest, editListSaga);
}
