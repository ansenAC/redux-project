import * as types from  '../constants/actionTypes';

// notice模快
export function updateNotice(content) {
    return {
        type: types.UPDATE_NOTICE,
        content: content
    };
};


export function updateNoticeHeight(offset) {
    return {
        type: types.UPDATE_NOTICE_HEIGHT,
        offset: offset
    };
};

// chat模块
export function addChat(chat) {
    return {
        type: types.ADD_CHAT,
        chat: chat
    };
};

export function addChatList(chatList) {
    return {
        type: types.ADD_CHAT_LIST,
        chatList: chatList
    };
};

export function delChatList() {
    return {
        type: types.EMPTY_CHAT_LIST
    };
};


