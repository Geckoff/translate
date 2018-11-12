import {combineReducers} from 'redux';
import lists from "./lists";
import fetch from "./fetch";
import redirects from "./redirects";
import isNetworkErrorPresent from "./network";

export default combineReducers({
    fetch,
    lists,
    redirects
});

export const getIsFetching = state => state.fetch.isFetching;
export const getIsFetched = state => state.fetch.isFetched;
export const getError = state => state.fetch.error;
export const getSingleList = state => state.lists.listSingle;
export const getListsCollection = state => state.lists.listsCollection;
export const getIsNetworkErrorPresent = state => state.isNetworkErrorPresent;
export const getRedirect = state => state.redirects.redirect;