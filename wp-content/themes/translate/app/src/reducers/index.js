import {combineReducers} from 'redux';
import lists from "./lists";
import words from "./words";
import fetch from "./fetch";
import redirects from "./redirects";
import message from "./messages";
import colors from "./colors";

export default combineReducers({
    fetch,
    lists,
    words,
    redirects,
    message,
    colors
});

export const getIsFetching = state => state.fetch.isFetching;
export const getIsFetched = state => state.fetch.isFetched;
export const getError = state => state.fetch.error;
export const getIsNetworkErrorPresent = state => state.isNetworkErrorPresent;
export const getRedirect = state => state.redirects.redirect;
export const getMessage = state => state.message.message;
export const getMessageSeen = state => state.message.messageSeen;
export const getColors = state => state.colors.colors;

//Lists
export const getSingleList = state => state.lists.listSingle;
export const getListsCollection = state => state.lists.listsCollection;

//Words
export const getTranslatingWord = state => state.words.translatingWord;
export const getEditedWord = state => state.words.editedWord;
export const getWordsByList = state => state.words.wordsByList;
export const getTestInProgress = state => state.words.testInProgress;
export const getTestPath = state => state.words.testPath;
export const getTestForgottenWords = state => state.words.testForgottenWords;
export const getWordsStats = state => state.words.wordsStats;
export const getRandWordsQuant = state => state.words.randWordsQuant;