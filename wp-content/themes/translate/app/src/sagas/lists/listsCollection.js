import {fetchMultipleListsRequest, fetchMultipleListsSuccess, fetchMultipleListsFailure} from '../../actions/lists';
import {takeLatest, call, put} from 'redux-saga/effects';
import {getAllLists} from '../../api/api';
import requestFlow from '../request';

export function* fetchMultipleListsSaga(action) {
  try {    
    const lists = yield call(requestFlow, getAllLists);
    yield put({type: fetchMultipleListsSuccess.toString(), payload: lists});
  } catch (error) {
    yield put(fetchMultipleListsFailure(error));
  }
}

export function* fetchMultipleListsWatch() {
  yield takeLatest(fetchMultipleListsRequest, fetchMultipleListsSaga);
}  
