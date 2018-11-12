import {
    addMessage,
    deleteMessage
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

export default combineReducers({
    message
});


