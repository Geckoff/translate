import {fork} from 'redux-saga/effects';
import {fetchMultipleListsWatch} from './listsCollection';
import {addListWatch} from './addList';

export default function*() {
  yield fork(fetchMultipleListsWatch);
  yield fork(addListWatch);
}


