import {fork} from 'redux-saga/effects';

// Lists sagas import
import {fetchMultipleListsWatch} from './lists/listsCollection';
import {fetchSingleListWatch} from './lists/singleList';
import {addListWatch} from './lists/addList';
import {editListWatch} from './lists/editList';
import {deleteListWatch} from './lists/deleteList';

// Words sagas import
import {translateWordWatch} from './words/translateWord';
import {addWordWatch} from './words/addWord';

export default function*() {
  yield fork(fetchMultipleListsWatch);
  yield fork(addListWatch);
  yield fork(fetchSingleListWatch);
  yield fork(editListWatch);
  yield fork(deleteListWatch);
  yield fork(translateWordWatch);
  yield fork(addWordWatch);
}


