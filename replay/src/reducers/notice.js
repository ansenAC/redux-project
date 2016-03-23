import * as types from '../constants/actionTypes';

const initialState = {
    notice: '公告栏空空的，老师太懒了...'
};

export default function notice(state = initialState, action) {
    switch (action.type) {
        case types.UPDATE_NOTICE:
            return {
                ...state,
                notice: action.content

            };
        default:
            return state;
    }
}