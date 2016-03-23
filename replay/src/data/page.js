/**
 * @file 分页数据
 */
import * as service from '../utils/service';
import camelCaseObject from '../utils/camelCaseObject';
import {bisearch} from '../utils/bisearch';
import * as config from '../constants/config';
import * as docData  from './doc';


let pageChangeList = [];


export function addPageData(pageOrder) {
    pageChangeList.push(pageOrder);
};


/**
 * 根据相对时间获取当前docId及page
 *
 * @param {number} time 相对时间
 */
export function getCurrentPageByTime(time) {
    let curIndex = bisearch(time, pageChangeList);
    let whiteImage = docData.getDocImage(0, 0);
    let whiteImageInfo = Object.assign(
        {
            docId: '0',
            page: 0
        },
        whiteImage
    );

    if (curIndex < 0) {
        return whiteImageInfo;
    }

    let pageChangeItem = pageChangeList[curIndex];
    let messageType = pageChangeItem.messageType;
    let imageInfo;

    if (messageType === config.MESSAGE_TYPE_PAGE_CHANGE) {
        let docId = pageChangeItem.docId;
        let page = pageChangeItem.page;
        let image= docData.getDocImage(docId, page);

        imageInfo = Object.assign(
            {
                docId: docId,
                page: page
            },
            image
        );
    }
    else if (messageType === config.MESSAGE_TYPE_DOC_ADD
        || messageType === config.MESSAGE_TYPE_DOC_DEL
    ){
        imageInfo = whiteImageInfo;
    }


    return imageInfo;
};

