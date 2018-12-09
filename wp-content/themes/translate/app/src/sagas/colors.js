import {
    generateColorsRequest,
    generateColorsSuccess,
} from "../actions/colors";
import { takeLatest, put } from "redux-saga/effects";
import generateColors from "../api/colorApi";

export function* generateColorsSaga() {
    try {
        const colors = generateColors(50);
        yield put({type: generateColorsSuccess.toString(), payload: colors});
    } catch (error) {
        console.log('colors errot');
    }
}

export function* generateColorsWatch() {
    yield takeLatest(generateColorsRequest, generateColorsSaga);
}
