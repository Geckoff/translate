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
import {fetchSingleWordWatch} from './words/singleWord';
import {editWordWatch} from './words/editWord';
import {deleteWordWatch} from './words/deleteWord';
import {fetchWordsByListWatch} from './words/wordsByList';
import {finishTestWatch} from './words/finishTest';
import {shuffleListWordsWatch} from './words/shuffleWords';
import {testForgottenWordsWatch} from './words/testFinishForgottenWords';

export default function*() {
  yield fork(fetchMultipleListsWatch);
  yield fork(addListWatch);
  yield fork(fetchSingleListWatch);
  yield fork(editListWatch);
  yield fork(deleteListWatch);
  yield fork(translateWordWatch);
  yield fork(addWordWatch);
  yield fork(fetchSingleWordWatch);
  yield fork(editWordWatch);
  yield fork(deleteWordWatch);
  yield fork(fetchWordsByListWatch);
  yield fork(finishTestWatch);
  yield fork(shuffleListWordsWatch);
  yield fork(testForgottenWordsWatch);
}


