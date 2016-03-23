/**
 * @file shape图形数据
 */
import * as service from '../utils/service';
import camelCaseObject from '../utils/camelCaseObject';
import {bisearch} from '../utils/bisearch';

let shapeChangeData = {};


export function addShapeData(key, data) {
    if (!shapeChangeData[key]) {
        shapeChangeData[key] = [];
    }
    shapeChangeData[key].push(data);
};


/**
 * 根据相对时间获取当前docId及page
 *
 * @param {string} docPage 由doc-page组成的key
 * @param {number} time 相对时间
 */
export function getShapeListByPage(docPage, time) {
    let shapeList = [];
    let curDocPage = shapeChangeData[docPage];

    if (!curDocPage) {
        return shapeList;
    }

    let curIndex = bisearch(time, curDocPage);

    // 没找到
    if (curIndex == -1) {
        return shapeList;
    }

    // 这里必须是等于curIndex, 相同时间戳会给出最后一个index
    for (let i = 0; i <= curIndex; i++) {
        shapeList.push(curDocPage[i])
    };
    return shapeList;
};


