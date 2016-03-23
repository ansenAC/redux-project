import * as types from '../constants/actionTypes';
import * as config from '../constants/config';

import {getCompressedImageUrl} from '../utils/docImage';

import {syncStepShapes, syncSeekShapes} from './shapes';

import {getShapeListByPage} from '../data/shape';
import {getDocImage} from '../data/doc';

export const startLoading = {
    type: types.START_DOC_LOADING
};

export const completeLoading = {
    type: types.COMPLETE_DOC_LOADING
};

export function updateDoc(docId, page, url) {
    return (dispath, getState) => {
        const state = getState();
        const {doc} = state;
        const {width, rawUrl} = doc;

        dispath({
            type: types.UPDATE_DOC,
            docId: docId,
            page: page
        });

        dispath(updateDocImage(width, url));
    }
};

export function updateDocImage(width, rawUrl) {
    const url = getCompressedImageUrl({
        width,
        rawUrl,
        isRetina: false
    });

    const retinaUrl = getCompressedImageUrl({
        width,
        rawUrl,
        isRetina: true
    });

    return updateDocUrl({
        rawUrl,
        url,
        retinaUrl
    });
};

function updateDocUrl(urlObject) {
    return {
        type: types.UPDATE_DOC_URL,
        ...urlObject
    };
}

export function updateDocDimension(dimension) {
    return {
        type: types.UPDATE_DOC_DIMENSION,
        ...dimension
    };
};

export function syncStepDoc(orderList = [], currentTime) {
    return dispatch => {

        let docOrderList = orderList
            .filter(
                order => {
                    let orderType = order.messageType;
                    return orderType === config.MESSAGE_TYPE_PAGE_CHANGE
                        || orderType === config.MESSAGE_TYPE_DOC_ADD
                        || orderType === config.MESSAGE_TYPE_DOC_DEL;
                }
            );

        let docOrder = docOrderList[docOrderList.length - 1];

        if (docOrder) {

            let docId, page;

            if (docOrder.messageType === config.MESSAGE_TYPE_DOC_ADD
                || docOrder.messageType === config.MESSAGE_TYPE_DOC_DEL
            ) {
                docId = '0';
                page = 0;
            }
            else {
                docId = docOrder.docId;
                page = docOrder.page;
            }

            const url = getDocImage(docId, page).url;

            dispatch(updateDoc(docId, page, url));

            const shapOrderList
                = getShapeListByPage(`${docId}-${page}`, currentTime);

            dispatch(syncStepShapes(shapOrderList, docId, page));
        }
        else {
            dispatch(syncStepShapes(orderList));
        }
    }
};

export function syncSeekDoc(docId, page, url, currentTime) {
    return dispatch => {
        dispatch(updateDoc(docId, page, url));

        const shapOrderList
        = getShapeListByPage(`${docId}-${page}`, currentTime);
        dispatch(syncSeekShapes(shapOrderList));
    }
};
