import * as types from '../constants/actionTypes';

const initialState = {
    loading: true,
    percentage: 0,
    mediaPanelFold: false,
    messagePanelFold: true,
    userListShow: true
};

export default function status(state = initialState, action) {
    switch (action.type) {
        case types.UPDATE_LOADING_PERCENTAGE:
            return {
                ...state,
                percentage: action.percentage
            };

        case types.COMPLETE_LOADING:
            return {
                ...state,
                loading: false,
                percentage: 100
            };

        case types.UPDATE_MEDIA_PANEL_FOLD:
            return {
                ...state,
                mediaPanelFold: action.fold
            };

        case types.UPDATE_MESSAGE_PANEL_FOLD:
            return {
                ...state,
                messagePanelFold: action.fold
            };

        case types.UPDATE_USER_TAB:
            return {
                ...state,
                userListShow: action.userListShow
            };
        default:
            return state;
    }
};
