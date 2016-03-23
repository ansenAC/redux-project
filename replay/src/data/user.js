import * as service from '../utils/service';
import camelCaseObject from '../utils/camelCaseObject';
import {bisearch} from '../utils/bisearch';
import * as config from '../constants/config';


let userChangeList = [];


export function addUserData(userOrder) {
    userChangeList.push(userOrder);
};

/**
 * 返回改时间前所有的user信令
 */
export function getUserByTime(time) {
    let curIndex = bisearch(time, userChangeList);
    let userData = [];

    userChangeList.forEach(
        (changeItem, index) => {
            if (index <= curIndex) {
                userData.push(changeItem);
            }
        }
    );
    return userData.length ? userData : null;
};
