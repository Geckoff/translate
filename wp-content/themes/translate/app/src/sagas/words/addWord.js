import {
    addWordRequest,
    addWordSuccess,
    addWordFailure,
    translateWordReset
} from "../../actions/words";
import {addMessage}  from "../../actions/messages";
import { takeLatest, call, put } from "redux-saga/effects";
import { addUpdateWord } from "../../api/api";
import requestFlow from "../request";
import {addRedirect}  from "../../actions/redirects";

export function* addWordSaga({ payload }) {
    try {
        console.log('addWordSaga');
        yield call(requestFlow, addUpdateWord, payload);
        yield put(addWordSuccess());
        yield put(translateWordReset());
        yield put(addRedirect('/add-word'));
        yield put(addMessage({
            type: 'success',
            message: 'Word was added'
        }));
    } catch (error) {
        yield put(addWordFailure(error));
    }
}

export function* addWordWatch() {
    yield takeLatest(addWordRequest, addWordSaga);
}
