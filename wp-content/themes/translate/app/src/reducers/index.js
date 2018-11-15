import {combineReducers} from 'redux';
import lists from "./lists";
import words from "./words";
import fetch from "./fetch";
import redirects from "./redirects";
import message from "./messages";
import isNetworkErrorPresent from "./network";

export default combineReducers({
    fetch,
    lists,
    words,
    redirects,
    message
});

export const getIsFetching = state => state.fetch.isFetching;
export const getIsFetched = state => state.fetch.isFetched;
export const getError = state => state.fetch.error;
export const getIsNetworkErrorPresent = state => state.isNetworkErrorPresent;
export const getRedirect = state => state.redirects.redirect;
export const getMessage = state => state.message.message;
export const getMessageSeen = state => state.message.messageSeen;

//Lists
export const getSingleList = state => state.lists.listSingle;
export const getListsCollection = state => state.lists.listsCollection;

//Words
export const getTranslatingWord = state => state.words.translatingWord;