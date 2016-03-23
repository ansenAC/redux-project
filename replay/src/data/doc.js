import * as service from '../utils/service';
import camelCaseObject from '../utils/camelCaseObject';
import * as classData from './class';

let docList = [];
export function initData() {

    let deferred = $.Deferred();
    let urlPrefix = classData.getPrefix();

    service
        .getDocList(urlPrefix)
        .done(
            data => {
                if (data.length) {
                    docList = camelCaseObject(data);
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



export function getDocImage(docId, page) {

    let doc;

    docList.forEach(
        docItem => {
            if (docItem.id == docId) {
                doc = docItem;
            };
        }
    );

    let pageList = doc.pageList;
    return pageList[page];
};

