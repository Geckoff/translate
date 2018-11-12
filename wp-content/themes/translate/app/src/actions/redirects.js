import { createActions } from "redux-actions";

const {
    addRedirect,
    resetRedirect,
} = createActions(
    "ADD_REDIRECT",
    "RESET_REDIRECT"
);

export {
    addRedirect,
    resetRedirect
};
