import {
    fetchSingleListRequest,
    fetchSingleListSuccess,
    fetchSingleListFailure
} from '../../actions/lists';
import {takeLatest, call, put} from 'redux-saga/effects';
import {getList, getAllLists} from '../../api/api';
import requestFlow from '../request';

export function* fetchSingleListSaga({payload}) {
  try {
    const list = yield call(requestFlow, getList, payload);
    yield put({type: fetchSingleListSuccess.toString(), payload: list});
  } catch (error) {
    yield put(fetchSingleListFailure(error));
  }
}

export function* fetchSingleListWatch() {
  yield takeLatest(fetchSingleListRequest, fetchSingleListSaga);
}  
