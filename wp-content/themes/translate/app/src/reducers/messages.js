import {
    addMessage,
    deleteMessage,
    seeMessage
} from "../actions/messages";
import {combineReducers} from 'redux';
import { handleActions } from "redux-actions";

export const message = handleActions(
    {
        [addMessage]: (state, action) => action.payload,
        [deleteMessage]: () => false
    },
    false
);

export const messageSeen = handleActions(
    {
        [addMessage]: () => false,
        [seeMessage]: () => true
    },
    false
);

export default combineReducers({
    message,
    messageSeen
});


