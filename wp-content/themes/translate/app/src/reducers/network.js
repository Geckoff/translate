import {
    networkError,
    clearNetworkErrors
} from "../actions/network";
import { handleActions } from "redux-actions";

export const isNetworkErrorPresent = handleActions(
    {
        [networkError]: (state, action) => action.payload,
        [clearNetworkErrors]: () => null,
    },
    null
);

export default isNetworkErrorPresent;