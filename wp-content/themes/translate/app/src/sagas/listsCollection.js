import {fetchMultipleListsRequest, fetchMultipleListsSuccess, fetchMultipleListsFailure} from '../actions/lists';
import {takeLatest, call, put} from 'redux-saga/effects';
import {getLists} from '../api';
import requestFlow from './request';

export function* fetchUserSaga(action) {
  try {
    const user = yield call(requestFlow, getUserInformation, action.payload);
    //yield put(fetchUserSuccess(user.data));
    yield put({type: fetchUserSuccess.toString(), payload: user.data});
  } catch (error) {
    yield put(fetchUserFailure(error));
  }
}

export function* fetchUserWatch() {
  yield takeLatest(fetchUserRequest, fetchUserSaga);
}  
