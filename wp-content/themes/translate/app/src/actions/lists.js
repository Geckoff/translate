import { createActions } from "redux-actions";

const {
    fetchSingleListRequest,
    fetchSingleListSuccess,
    fetchSingleListFailure
} = createActions(
    "FETCH_SINGLE_LIST_REQUEST",
    "FETCH_SINGLE_LIST_SUCCESS",
    "FETCH_SINGLE_LIST_FAILURE"
);
const {
    fetchMultipleListsRequest,
    fetchMultipleListsSuccess,
    fetchMultipleListsFailure
} = createActions(
    "FETCH_MULTIPLE_LISTS_REQUEST",
    "FETCH_MULTIPLE_LISTS_SUCCESS",
    "FETCH_MULTIPLE_LISTS_FAILURE"
);

export {
    fetchSingleListRequest,
    fetchSingleListSuccess,
    fetchSingleListFailure,
    fetchMultipleListsRequest,
    fetchMultipleListsSuccess,
    fetchMultipleListsFailure
};
