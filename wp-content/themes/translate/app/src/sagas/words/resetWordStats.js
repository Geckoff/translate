import {
    resetWordStatsRequest,
    resetWordStatsSuccess,
    resetWordStatsFailure,
    fetchWordsByListRequest
} from "../../actions/words";
import {addMessage}  from "../../actions/messages";
import { takeLatest, call, put, select } from "redux-saga/effects";
import { resetWordStats } from "../../api/api";
import requestFlow from "../request";
import { getSingleList } from "../../reducers";

/**
 * Reset word's statistics
 * 
 * @param {Object} payload
 * @param {integer} payload.id - id of the word
 */
export function* resetWordStatsSaga({ payload }) {
    try {
        yield call(requestFlow, resetWordStats, payload);
        yield put(resetWordStatsSuccess());
        yield put(addMessage({                  // success message
            type: 'success',
            message: 'Statistics was reset'
        }));
        const singleList = yield select(getSingleList);
        if (singleList) {
            yield put(fetchWordsByListRequest({lists: [singleList.id]}));    
        }
    } catch (error) {
        yield put(resetWordStatsFailure(error));
    }
}

export function* resetWordStatsWatch() {
    yield takeLatest(resetWordStatsRequest, resetWordStatsSaga);
}
