import * as types from '../constants/actionTypes';

const initialState = {
    users: [
    ],
    count: 0
};

export default function userList(state = initialState, action) {
    switch (action.type) {
        case types.ADD_USER:
            let userList = [
                ...state.users,
                action.user
            ];

            return {
                ...state,
                users: userList,
                count: userList.length
            };

        case types.ADD_USER_LIST:

            let addUserList = [
                ...state.users,
                ...action.userList
            ];

            return {
                ...state,
                users: addUserList,
                count: addUserList.length
            };

        case types.DELETE_USER:
            let count = state.count;
            return {
                ...state,
                users: state.users.filter(
                    user => {
                        return user.id != action.userId;
                    }
                ),
                count: count - 1
            };
        case types.DELETE_USER_LIST:
            // 拷贝一份
            let delMap = {};
            let targetUsers = [];

            action.userIds.forEach(
                id => {
                    delMap[id] = true;
                }
            );

            state.users.forEach(
                (user, index) => {
                    if (!delMap[user.id]) {
                        targetUsers.push(user);
                    }
                }
            );
            return {
                ...state,
                users: targetUsers,
                count: targetUsers.length
            }


        case types.EMPTY_USER_LIST:
            return {
                ...state,
                users: [],
                count: 0
            };

        default:
            return state;
    }
};