/**
 * @file 全体信令数据
 */
import camelCaseObject from '../utils/camelCaseObject';
import {bisearch} from '../utils/bisearch';
import * as config from '../constants/config';
import * as service from '../utils/service';

import * as classData from './class';
import * as userData from './user';
import * as mediaData from './media';
import * as pageData from './page';
import * as shapeData from './shape';

// 所有信令集合
let orderList = [];

// 当前节点
let curIndex = -1;

/**
 * 初始化数据
 */
export function initData() {
    let deferred = $.Deferred();
    let urlPrefix = classData.getPrefix();
    service
        .getOrderList(urlPrefix)
        .done(
            data => {

                if (data.length) {
                    // 主数据先不转驼峰，避免遍历耗时
                    parseData(data);
                    deferred.resolve();
                }
                else {
                    deferred.reject();
                }
            }
        )
        .fail(
            () => {
                deferred.reject();
            }
        );

    return deferred;
};

export function isUserOrder(messageType) {
    return messageType === config.MESSAGE_TYPE_USER_IN
        || messageType === config.MESSAGE_TYPE_USER_OUT;
};

export function isMediaOrder(order) {
    let messageType = order.messageType;
    return messageType === config.MESSAGE_TYPE_MEDIA_PUBLISH
        && order.user.type === config.USER_ROLE_TEACHER;
};

export function isPageOrder(messageType) {
    return messageType === config.MESSAGE_TYPE_PAGE_CHANGE
        || messageType === config.MESSAGE_TYPE_DOC_ADD
        || messageType === config.MESSAGE_TYPE_DOC_DEL;
};

export function isShapeOrder(messageType) {
    return messageType === config.MESSAGE_TYPE_SHAPE_ADD
        || messageType === config.MESSAGE_TYPE_SHAPE_DEL
        || messageType === config.MESSAGE_TYPE_SHAPE_UPDATE;
};

export function parseData(orderData) {

    console.log('startParse:', new Date().getTime());
    orderData.forEach(
        order => {
            let camelOrder = camelCaseObject(order);

            let orderMessageType = camelOrder.messageType;

            orderList.push(camelOrder);

            if (isUserOrder(orderMessageType)) {
                userData.addUserData(camelOrder);
            }
            if (isMediaOrder(camelOrder)) {
                mediaData.addMediaData(camelOrder);
            }

            if (isPageOrder(orderMessageType)) {
                pageData.addPageData(camelOrder);
            }

            if (isShapeOrder(orderMessageType)) {
                let docId = camelOrder.docId;
                let page = camelOrder.page;

                let shapeKey = docId + '-' +page;

                shapeData.addShapeData(shapeKey, camelOrder);
            }

        }
    );
    console.log('endParse:', new Date().getTime());
};

/**
 * 根据时间戳获取数据
 * @param {number} time 相对上课开始的时间
 * @return {Array} 一秒内的信令集合
 */
export function getOrderByTime(time) {

    // 每秒的信令集
    let orderListBySecond = [];
    let len = orderList.length;

    for (let i = curIndex + 1; i < len; i++) {
        let orderItem = orderList[i];
        let orderTime = orderItem.offsetTimestamp;

        if (orderTime > time) {
            break;
        }

        if (orderTime == time) {
            curIndex = i;
            orderListBySecond.push(orderItem);
        }
    }

    return orderListBySecond;
};

/**
 * seek操作后需要根据时间点跟新index
 * @param {number} time
 */
export function refreshOrderIndex(time) {
    curIndex = bisearch(time, orderList);
};


