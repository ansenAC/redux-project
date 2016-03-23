import * as types from  '../constants/actionTypes';
import * as config from '../constants/config';

// 最多展示多少个
const maxLength = 200;

export function addUser(user) {
    return {
        type: types.ADD_USER,
        user: user
    };
};

export function addUserList(userList) {
    return {
        type: types.ADD_USER_LIST,
        userList: userList
    };
};

export function updateUserList(userList) {
    return {
        type: types.UPDATE_USER_LIST,
        userList: userList
    };
};

export function delUserList(userIds) {
    return {
        type: types.DELETE_USER_LIST,
        userIds: userIds
    };
};

export function deleteUser(id) {
    return {
        type: types.DELETE_USER,
        userId: id
    };
};

export function emptyUserList() {
    return {
        type: types.EMPTY_USER_LIST
    };
};

export function syncStepUsers(orderData, currentTime) {
    return dispatch => {
        if (!orderData.length) {
            return;
        }

        // 去重一下，一秒还是有可能进来又出去
        let userUniqueMap = {};
        // 存user
        let addUsers = [];
        // 存id
        let delUserIds = [];

        orderData.forEach(
            order => {
                if (order.messageType === config.MESSAGE_TYPE_USER_IN) {
                    let orderUser = order.user;

                    delUserIds = delUserIds.filter(
                        id => {
                            return id !== orderUser.id;
                        }
                    );
                    addUsers.push(orderUser);
                    userUniqueMap[orderUser.id] = true;
                }
                else if (order.messageType === config.MESSAGE_TYPE_USER_OUT) {

                    let orderUserId = order.userId;
                    if (userUniqueMap[orderUserId]) {
                        addUsers = addUsers.filter(
                            user => {
                                return user.id !== orderUserId;
                            }
                        );
                    }
                    else {
                        delUserIds.push(orderUserId);
                    }
                }
            }
        );

        if (addUsers.length) {
            dispatch(addUserList(addUsers));
        }

        if (delUserIds.length) {
            dispatch(delUserList(delUserIds));
        }
    };
};

export function syncSeekUsers(userData, currentTime) {
    return dispatch => {

        if (!userData.length) {
            return;
        }
        // 去重map
        let userUniqueMap = {};
        // 用number和id建立一个映射
        let mapNumberToId = {};
        let userList = [];

        userData.forEach(
            userItem => {
                if (userItem.messageType === config.MESSAGE_TYPE_USER_IN) {
                    let user= userItem.user;
                    let userId = user.id;
                    let userNumber = user.number;

                    if (userUniqueMap[userId]) {
                        return;
                    }

                    // 老师被老师挤掉，有可能出现老师先user_in 后user_out
                    if (mapNumberToId[userNumber]) {
                        userList = userList.filter(
                            user => {
                                return user.number != userNumber
                            }
                        );
                    }

                    mapNumberToId[userNumber] = userId;

                    userUniqueMap[userId] = true;
                    userList.push(user);
                }

                else if (userItem.messageType === config.MESSAGE_TYPE_USER_OUT) {
                    let userId = userItem.userId;
                    if (userUniqueMap[userId]) {
                        delete userUniqueMap[userId];
                        userList = userList.filter(
                            user =>  {
                                return user.id != userId;
                            }
                        );
                    }
                }
            }
        );
        dispatch(emptyUserList());
        dispatch(addUserList(userList));
    };
};

