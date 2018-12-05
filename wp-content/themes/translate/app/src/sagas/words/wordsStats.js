import {
    fetchWordsStatsRequest,
    fetchWordsStatsSuccess,
    fetchWordsStatsFailure,
} from '../../actions/words';
import {
    getListsCollection
} from '../../reducers';
import {takeLatest, call, put, select} from 'redux-saga/effects';
import {getWordsStats} from '../../api/api';
import requestFlow from '../request';

/**
 * Get words statistics
 */
export function* fetchWordsStatsSaga() {
  try { 
    let wordStats = []
    const lists = yield select(getListsCollection);  
    if (lists.length > 0) { // if there are no lists in the account write empty array to stats
        const listsIds = lists.map(list => list.id);   
        const data = {
            words_count: 99999,
            lists: listsIds
        }
        wordStats = yield call(requestFlow, getWordsStats, data);
    }    
    yield put({type: fetchWordsStatsSuccess.toString(), payload: wordStats});
  } catch (error) {
    yield put(fetchWordsStatsFailure(error));
  }
}

export function* fetchWordsStatsWatch() {
  yield takeLatest(fetchWordsStatsRequest, fetchWordsStatsSaga);
}  
