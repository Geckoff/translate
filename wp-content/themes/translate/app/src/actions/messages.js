import { createActions } from "redux-actions";

const {
    addMessage,
    deleteMessage,
    seeMessage,
} = createActions(
    "ADD_MESSAGE",
    "DELETE_MESSAGE",
    "SEE_MESSAGE"
);

export {
    addMessage,
    deleteMessage,
    seeMessage
};
