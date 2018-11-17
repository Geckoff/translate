import {
    translateWordRequest,
    translateWordSuccess,
    translateWordFailure,   
} from "../actions/words";
import {combineReducers} from 'redux';
import { handleActions } from "redux-actions";

export const translatingWord = handleActions(
    {
        [translateWordRequest]: () => null,
        [translateWordSuccess]: (state, action) => {console.log(action.payload);return action.payload},
        [translateWordFailure]: () => null
    },
    null
);

export default combineReducers({
    translatingWord
});


