import {
    shuffleListWordsRequest,
    shuffleListWordsSuccess,
    shuffleListWordsResetList
} from "../../actions/words";
import { takeLatest, put, select } from "redux-saga/effects";
import { getWordsByList } from "../../reducers";
import shuffle from "shuffle-array";

/**
 * Shuffle words
 */
export function* shuffleListWordsSaga() {
    try {
        let wordsList = yield select(getWordsByList);   
        shuffle(wordsList);
        yield put(shuffleListWordsResetList());
        yield put(shuffleListWordsSuccess(wordsList));
    } catch (error) {
        console.error(error);
    }
}

export function* shuffleListWordsWatch() {
    yield takeLatest(shuffleListWordsRequest, shuffleListWordsSaga);
}
