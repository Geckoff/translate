import {
    fetchSingleListRequest,
    fetchSingleListSuccess,
    fetchSingleListFailure
} from '../../actions/lists';
import {takeLatest, call, put} from 'redux-saga/effects';
import {getList} from '../../api/api';
import requestFlow from '../request';

/**
 * Get single list
 * 
 * @param {Object} payload
 * @param {integer} payload.id - id of the list
 */
export function* fetchSingleListSaga({payload}) {
  try {
    let list = null;
    if (payload !== 'rand') {
      list = yield call(requestFlow, getList, {id: payload}); //fetching single list data only if id isn't rand
    }    
    yield put({type: fetchSingleListSuccess.toString(), payload: list});
  } catch (error) {
    yield put(fetchSingleListFailure(error));
  }
}

export function* fetchSingleListWatch() {
  yield takeLatest(fetchSingleListRequest, fetchSingleListSaga);
}  
