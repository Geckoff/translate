import {
    fetchWordsByListRequest,
    fetchWordsByListSuccess,
    fetchWordsByListFailure,
} from '../../actions/words';
import {takeLatest, call, put} from 'redux-saga/effects';
import {getWordsByList} from '../../api/api';
import requestFlow from '../request';

/**
 * Get all words assigned to a list or lists
 * 
 * @param {Object} payload
 * @param {array} payload.id - lists ids
 * @param {integer} payload.id[] - lists ids
 */
export function* fetchWordsByListSaga({payload}) {
  try {    
    const lists = yield call(requestFlow, getWordsByList, payload);
    yield put({type: fetchWordsByListSuccess.toString(), payload: lists});
  } catch (error) {
    yield put(fetchWordsByListFailure(error));
  }
}

export function* fetchWordsByListWatch() {
  yield takeLatest(fetchWordsByListRequest, fetchWordsByListSaga);
}  
