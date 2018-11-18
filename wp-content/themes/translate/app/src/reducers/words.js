import {
    translateWordRequest,
    translateWordSuccess,
    translateWordFailure,   
    translateWordReset,
} from "../actions/words";
import {combineReducers} from 'redux';
import { handleActions } from "redux-actions";

export const translatingWord = handleActions(
    {
        [translateWordRequest]: () => null,
        [translateWordSuccess]: (state, action) => action.payload,
        [translateWordFailure]: () => null,
        [translateWordReset]: () => null
    },
    null
);

export default combineReducers({
    translatingWord
});


