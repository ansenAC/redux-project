/**
 * @file 分页数据
 */
import {bisearch} from '../utils/bisearch';
import * as config from '../constants/config';

let mediaChangeData = [];
// 存储前一个userId
let prevUserId = '';


export function addMediaData(mediaOrder) {
    mediaChangeData.push(mediaOrder);
};



// 存取老师userId的接口，判断老师掉线
export function getPrevUserId() {
    return prevUserId;
};

export function setPrevUserId(userId) {
    prevUserId = userId;
};


/**
 * 根据相对时间获取当前video audio状态
 *
 * @param {number} time 相对时间
 */
export function getMediaByTime(time) {

    let curIndex = bisearch(time, mediaChangeData);

    let videoOn = false;
    let audioOn = false;


    for (let i = 0; i <= curIndex; i++) {

        let mediaData = mediaChangeData[i];
        let userId = mediaData.userId;
        let prevIndex = Math.max(i - 1, 0);
        let prevData = mediaChangeData[prevIndex];

        let prevId = prevData.userId;

        // 如果两个userId不一样 则代表有掉线重连，恢复默认配置
        if (prevIndex > 0 && prevId !== userId) {
            videoOn = config.TEACHER_INITIAL_VIDEO_ON;
            audioOn = config.TEACHER_INITIAL_AUDIO_ON;
        }
        else {
            if ('videoOn' in mediaData) {
                videoOn = mediaData.videoOn;
            }

            if ('audioOn' in mediaData) {
                audioOn = mediaData.audioOn;
            }
        }
    }

    if (mediaChangeData[curIndex]) {
        // 存一下当前media_publish的userId;
        setPrevUserId(mediaChangeData[curIndex].userId);
    }

    return {
        videoOn,
        audioOn
    };
};
