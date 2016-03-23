import * as types from '../constants/actionTypes';
const initialState = {
    chatList: [
    ],
};

export default function chat(state = initialState, action) {
    switch (action.type) {

        case types.ADD_CHAT:
            return {
                ...state,
                chatList: [
                    ...state.chatList,
                    action.chat
                ]
            };

        case types.ADD_CHAT_LIST:
            return {
                ...state,
                chatList: [
                    ...state.chatList,
                    ...action.chatList
                ]
            };

        case types.EMPTY_CHAT_LIST:
            return {
                ...state,
                chatList: []
            };

        default:
            return state;
    }
}