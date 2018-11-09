import {combineReducers} from 'redux';
import lists from "./lists";
import fetch from "./fetch";
import isNetworkErrorPresent from "./network";

export default combineReducers({
    fetch,
    lists,
});

export const getIsFetching = state => state.fetch.isFetching;
export const getIsFetched = state => state.fetch.isFetched;
export const getError = state => state.fetch.error;
export const getSingleList = state => state.lists.listSingle;
export const getListsCollection = state => state.lists.listsCollection;
export const getIsNetworkErrorPresent = state => state.isNetworkErrorPresent;