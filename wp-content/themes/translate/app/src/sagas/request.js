import {call, put, select} from 'redux-saga/effects';
import {clearNetworkErrors, networkError} from '../actions/network';
import {getIsNetworkErrorPresent} from '../reducers';

export default function*(fn, args) {
  try {
    const response = yield call(fn, args);
    //const response = yield fn(args);
    console.log(response);
    //const response = yield fn(args);
    if (yield select(getIsNetworkErrorPresent)) yield put(clearNetworkErrors());
    //console.log(response);
    return response.data;
  } catch (error) {
    yield put(networkError(error));
    throw error;
  } 
}