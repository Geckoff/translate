import { createActions } from "redux-actions";

const {
    addMessage,
    deleteMessage,
} = createActions(
    "ADD_MESSAGE",
    "DELETE_MESSAGE"
);

export {
    addMessage,
    deleteMessage
};
