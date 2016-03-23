import * as types from '../constants/actionTypes';

const initialState = {
    page: 0,
    docId: '0',
    rawUrl: 'http://img.gsxservice.com/0cms/d/file/content/2015/03/5509710c8081c.png',
    url: 'http://img.gsxservice.com/0cms/d/file/content/2015/03/5509710c8081c.png@1e_746w_1c_0i_1o_90Q_1x.jpg',
    retinaUrl: 'http://img.gsxservice.com/0cms/d/file/content/2015/03/5509710c8081c.png@1e_1492w_1c_0i_1o_90Q_1x.webp',
    loading: false,
    height: 0,
    width: 0
};

export default function doc(state = initialState, action) {
    switch (action.type) {
        case types.START_DOC_LOADING:
            return {
                ...state,
                loading: true
            };

        case types.COMPLETE_DOC_LOADING:
            return {
                ...state,
                loading: false
            };

        case types.UPDATE_DOC:
            return {
                ...state,
                docId: action.docId,
                page: action.page
            };

        case types.UPDATE_DOC_URL:
            return {
                ...state,
                rawUrl: action.rawUrl,
                url: action.url,
                retinaUrl: action.retinaUrl
            };

        case types.UPDATE_DOC_DIMENSION:
            return {
                ...state,
                width: action.width,
                height: action.height
            };

        default:
            return state;
    }
};
