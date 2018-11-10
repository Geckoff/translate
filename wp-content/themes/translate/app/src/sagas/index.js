import {fork} from 'redux-saga/effects';
import {fetchMultipleListsWatch} from './listsCollection';

export default function*() {
  yield fork(fetchMultipleListsWatch);
}


