import * as types from '../constants/actionTypes';
import * as config from '../constants/config';
import * as mediaData from '../data/media';

export function updateCurrentTime(currentTime) {
    return {
        type: types.UPDATE_CURRENT_TIME,
        currentTime: currentTime
    };
};

export function updateDuration(duration) {
    return {
        type: types.UPDATE_DURATION,
        duration: duration
    };
};

export const play = {
    type: types.UPDATE_PLAYER_STATUS,
    status: config.PLAYER_STATUS_PLAYING
};

export const pause = {
    type: types.UPDATE_PLAYER_STATUS,
    status: config.PLAYER_STATUS_PAUSE
};

export const stop = {
    type: types.UPDATE_PLAYER_STATUS,
    status: config.PLAYER_STATUS_STOP
};

export function seek(seekTime) {
    return {
        type: types.UPDATE_PLAYER_STATUS,
        status: config.PLAYER_STATUS_SEEKING,
        seekTime: seekTime
    };
};

export const mute = {
    type: types.UPDATE_MUTED_STATUS,
    muted: true
};

export const up = {
    type: types.UPDATE_MUTED_STATUS,
    muted: false
};

export function updateVolume(volume) {
    return {
        type: types.UPDATE_VOLUME,
        volume: volume
    }
};

export function updateSource(source) {
    return {
        type: types.UPDATE_PLAYER_SOURCE,
        source: source
    };
};

export function updateAvatar(avatar) {
    return {
        type: types.UPDATE_PLAYER_AVATAR,
        avatar: avatar
    };
};

export function updateVideo(videoOn) {
    return {
        type: types.UPDATE_PLAYER_VIDEO,
        videoOn: videoOn
    };
};

export function updateAudio(audioOn) {
    return {
        type: types.UPDATE_PLAYER_AUDIO,
        audioOn: audioOn
    };
};

export function syncStepMedia(orderData, currentTime) {
    return dispatch => {
        orderData.forEach(
            order => {
                if (order.messageType === config.MESSAGE_TYPE_MEDIA_PUBLISH
                    && order.user.type === config.USER_ROLE_TEACHER
                ) {
                    let userId = order.userId;
                    let prevId = mediaData.getPrevUserId();

                    console.log('userId:' + userId, 'prevId:' + prevId);
                    // 老师中途掉线，id会变
                    if (userId !== prevId && prevId !== '') {
                        dispatch(updateVideo(config.TEACHER_INITIAL_VIDEO_ON));
                        dispatch(updateAudio(config.TEACHER_INITIAL_AUDIO_ON));
                    }
                    else {
                        if ('videoOn' in order) {
                            dispatch(updateVideo(order.videoOn));
                        }

                        if ('audioOn' in order) {
                            dispatch(updateAudio(order.audioOn));
                        }
                    }

                    mediaData.setPrevUserId(userId);
                }
            }
        );
    };
};


