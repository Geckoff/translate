import {
    addRedirect,
    resetRedirect
} from "../actions/redirects";
import {combineReducers} from 'redux';
import { handleActions } from "redux-actions";

export const redirect = handleActions(
    {
        [resetRedirect]: () => false,
        [addRedirect]: (state, action) => action.payload,
    },
    false
);

export default combineReducers({
    redirect
});


