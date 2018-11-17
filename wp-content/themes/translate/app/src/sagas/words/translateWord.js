import {
    translateWordRequest,
    translateWordSuccess,
    translateWordFailure, 
    translateWordNotFound
} from '../../actions/words';
import {takeLatest, call, put} from 'redux-saga/effects';
import {translate} from '../../api/yandexApi';
import requestFlow from '../request';
import {addMessage}  from "../../actions/messages";

export function* translateWordSaga({payload}) {
  try {
    const wordData = yield call(requestFlow, translate, payload);
    if (wordData.def.length < 1) {
      console.log(translateWordFailure, 'translateWordSaga');
      yield put(addMessage({
          type: 'warning',
          message: 'No translation found for this word'
      }));
      yield put(translateWordNotFound());
    }
    else {
      const normWordData = wordData.def.reduce((prevTrSet, curTrSet) => {
          return [...prevTrSet, ...curTrSet.tr];
      }, []);
      yield put({type: translateWordSuccess.toString(), payload: {
          word: payload.word,
          translations: normWordData
      }});
    }    
  } catch (error) {
    yield put(translateWordFailure(error));
  }
}

export function* translateWordWatch() {
  yield takeLatest(translateWordRequest, translateWordSaga);
}  
