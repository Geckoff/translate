import { createActions } from "redux-actions";

const {
    generateColorsRequest,
    generateColorsSuccess,
} = createActions(
    "GENERATE_COLORS_REQUEST",
    "GENERATE_COLORS_SUCCESS",
);

export {
    generateColorsRequest,
    generateColorsSuccess
};
