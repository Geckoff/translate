import {
    fetchWordsByListRequest,
    fetchWordsByListSuccess,
    fetchWordsByListFailure
} from "../../actions/words";
import { takeLatest, call, put, select } from "redux-saga/effects";
import { 
	getWordsByList,
	getWordsByNumber
} from "../../api/api";
import {
	getRandWordsQuant
} from "../../reducers";
import requestFlow from "../request";

/**
 * Get all words assigned to a list or lists
 *
 * @param {Object} payload
 * @param {array} payload.id - lists ids 
 * @param {integer||string} payload.id[] - lists ids or rand
 */
export function* fetchWordsByListSaga({ payload }) {
    try {
        let words = [];
        if (payload !== 'rand') { // if not random swlwction, fetch by id, otherwise fetch by words quantity
            words = yield call(requestFlow, getWordsByList, {lists: [payload]}); // payload - {lists: [listId]}
        } else {
			
			const quant = yield select(getRandWordsQuant); 
			words = yield call(requestFlow, getWordsByNumber, {words_count: quant});
		}
        yield put({ type: fetchWordsByListSuccess.toString(), payload: words });
    } catch (error) {
        yield put(fetchWordsByListFailure(error));
    }
}

export function* fetchWordsByListWatch() {
    yield takeLatest(fetchWordsByListRequest, fetchWordsByListSaga);
}
