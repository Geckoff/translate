import {fork} from 'redux-saga/effects';
import {fetchMultipleListsWatch} from './lists/listsCollection';
import {fetchSingleListWatch} from './lists/singleList';
import {addListWatch} from './lists/addList';
import {editListWatch} from './lists/editList';

export default function*() {
  yield fork(fetchMultipleListsWatch);
  yield fork(addListWatch);
  yield fork(fetchSingleListWatch);
  yield fork(editListWatch);
}


