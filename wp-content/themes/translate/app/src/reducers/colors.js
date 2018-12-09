import {
    generateColorsSuccess
} from "../actions/colors";
import {combineReducers} from 'redux';
import { handleActions } from "redux-actions";

export const colors = handleActions(
    {
        [generateColorsSuccess]: (state, action) => action.payload,
    },
    false
);

export default combineReducers({
    colors
});


