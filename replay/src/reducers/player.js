import * as types from '../constants/actionTypes';
import * as config from '../constants/config';

const initialState = {
    source: '/mock/test.mp4',
    duration: 0,
    currentTime: -1,
    status: config.PLAYER_STATUS_PAUSE,
    volume: 100,
    muted: false,
    seekTime: -1,
    videoOn: false,
    audioOn: false,
    avatar: 'http://img.gsxservice.com/30528_q43svo9t.jpeg'
};

export default function player(state = initialState, action) {
    switch (action.type) {
        case types.UPDATE_CURRENT_TIME:
            return {
                ...state,
                currentTime: action.currentTime
            };

        case types.UPDATE_PLAYER_STATUS:
            return {
                ...state,
                status: action.status,
                seekTime: action.seekTime
            };

        case types.UPDATE_DURATION:
            return {
                ...state,
                duration: action.duration
            };

        case types.UPDATE_MUTED_STATUS:
            return {
                ...state,
                muted: action.muted
            };

        case types.UPDATE_VOLUME:
            return {
                ...state,
                volume: action.volume
            };

        case types.UPDATE_PLAYER_SOURCE:
            return {
                ...state,
                source: action.source
            };

        case types.UPDATE_PLAYER_AVATAR:
            return {
                ...state,
                avatar: action.avatar
            };

        case types.UPDATE_PLAYER_VIDEO:
            return {
                ...state,
                videoOn: action.videoOn
            };

        case types.UPDATE_PLAYER_AUDIO:
            return {
                ...state,
                audioOn: action.audioOn
            };

        default:
            return state;
    }
};
