import {
    translateWordRequest,
    translateWordSuccess,
    translateWordFailure, 
} from '../../actions/words';
import {takeLatest, call, put} from 'redux-saga/effects';
import {translate} from '../../api/yandexApi';
import requestFlow from '../request';
import { normalize, schema } from 'normalizr';

export function* translateWordSaga({payload}) {
  try {
    const wordData = yield call(requestFlow, translate, payload);
    const transSchema = new schema.Entity('translations');
    const wordSchema = new schema.Entity('posts', {
        tr: transSchema
      });
    console.log(normalize(wordData, wordSchema)); 
    console.log(wordData) 
    yield put({type: translateWordSuccess.toString(), payload: wordData});
  } catch (error) {
    yield put(translateWordFailure(error));
  }
}

export function* translateWordWatch() {
  yield takeLatest(translateWordRequest, translateWordSaga);
}  
