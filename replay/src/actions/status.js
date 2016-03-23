import * as types from '../constants/actionTypes';
import * as classData from '../data/class';

export function completeLoading() {
    return {
        type: types.COMPLETE_LOADING
    }
};

export function updateLoadingPercent(percentage) {
    return {
        type: types.UPDATE_LOADING_PERCENTAGE,
        percentage: percentage
    }
};

export function updateMediaPanelFold(fold) {
    return {
        type: types.UPDATE_MEDIA_PANEL_FOLD,
        fold: fold
    };
};

export function updateMessagePanelFold(fold) {
    return {
        type: types.UPDATE_MESSAGE_PANEL_FOLD,
        fold: fold
    };
};


export function updateUserTabStaus(userListShow) {
    return {
        type: types.UPDATE_USER_TAB,
        userListShow: userListShow
    };
};
