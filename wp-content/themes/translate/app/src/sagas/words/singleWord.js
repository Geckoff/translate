import {
    getWordRequest,
    getWordSuccess,
    getWordFailure,
} from '../../actions/words';
import {takeLatest, call, put} from 'redux-saga/effects';
import {getWord} from '../../api/api';
import requestFlow from '../request';

/**
 * Get single word
 * 
 * @param {Object} payload
 * @param {integer} payload.id - id of the word
 */
export function* fetchSingleWordSaga({payload}) {
  try {
    const list = yield call(requestFlow, getWord, payload);
    yield put({type: getWordSuccess.toString(), payload: list});
  } catch (error) {
    yield put(getWordFailure(error));
  }
}

export function* fetchSingleWordWatch() {
  yield takeLatest(getWordRequest, fetchSingleWordSaga);
}  
