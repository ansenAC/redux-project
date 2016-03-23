import * as types from '../constants/actionTypes';
import * as config from '../constants/config';
import * as classData from '../data/class';

import {syncStepDoc, syncSeekDoc} from './doc';
import {syncStepUsers, syncSeekUsers} from './userList';
import {completeLoading} from './status';
import {updateSource, updateAvatar, updateVideo, updateAudio, syncStepMedia} from './player';

import {getOrderByTime, refreshOrderIndex} from '../data/order';
import {getCurrentPageByTime} from '../data/page';
import {getUserByTime} from '../data/user';
import {getMediaByTime} from '../data/media';


// sync step
export function syncStepData(currentTime) {
    return dispatch => {
        dispatch(syncStepOrder(currentTime));
    };
};

function syncStepOrder(currentTime) {
    return dispatch => {
        const orderList = getOrderByTime(currentTime);
        refreshOrderIndex(currentTime)
console.log('sync step orderList: ', orderList, currentTime);
        dispatch(syncStepDoc(orderList, currentTime));
        dispatch(syncStepUsers(orderList, currentTime));
        dispatch(syncStepMedia(orderList, currentTime));
    };
}

// sync seek
export function syncSeekData(currentTime) {

    return dispatch => {
        const userData = getUserByTime(currentTime);
        const pageData = getCurrentPageByTime(currentTime);
        const media = getMediaByTime(currentTime);

        if (pageData) {
            const {docId, page, url} = pageData;

            dispatch(syncSeekDoc(docId, page, url, currentTime));
        }

        if (userData) {
            dispatch(syncSeekUsers(userData, currentTime));
        }

        dispatch(updateVideo(media.videoOn));
        dispatch(updateAudio(media.audioOn));

        refreshOrderIndex(currentTime);
    }
};

export function allDataComplete() {
    return dispatch => {
        const data = classData.getData();
        const {videoUrl, teacherInfo} = data;
        let avatar = teacherInfo.avatar;

        dispatch(completeLoading());

        if (videoUrl) {
            dispatch(updateSource(videoUrl));
        }
        if (avatar) {
            dispatch(updateAvatar(avatar));
        }
    };
};

