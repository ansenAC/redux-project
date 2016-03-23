import * as service from '../utils/service';
import camelCaseObject from '../utils/camelCaseObject';
import urlUtil from 'cobble/util/url';

let classData = {};

export function initData() {
    let deferred = $.Deferred();
    let search = urlUtil.parseQuery(location.search);

    let classId = search.classid;

    setClassId(classId);

    service
        .getClassData(search)
        .done(
            response => {
                if (response.code !== 0) {
                    deferred.reject(response);
                    return;
                }

                let data = camelCaseObject(response.data);

                setPrefix(data.signalFile.prefix);
                let urls = data.playInfo.urls;

                // 取高清视频
                let videoUrl;
                for (var key in urls) {
                    if (urls[key] == "std") {
                        videoUrl = urls[key].url;
                    }
                }

                if (!videoUrl) {
                    videoUrl = urls[0].url;
                }

                setVideoUrl(videoUrl);
                setTeacherInfo(data.teacher);

                deferred.resolve();
            }
        )
        .fail(
            () => {
                deferred.reject();
            }
        );

    return deferred;
};

export function setPrefix(prefix) {
    classData.prefix = prefix;
};

// 视频请求地址前缀
export function getPrefix() {
    return classData.prefix;
};

export function setVideoUrl(videoUrl) {
    classData.videoUrl = videoUrl;
};

// 视频播放地址
export function getVideoUrl() {
    return classData.videoUrl;
};

export function setTeacherInfo(teacherInfo) {
    classData.teacherInfo = teacherInfo;
};

// 老师信息
export function getTeacherInfo() {
    return classData.teacherInfo;
};

export function setClassId(classId) {
    classData.classId = classId;
};

export function getClassId() {
    return classData.classId;
};

export function getData() {
    return classData;
};

export function setData(data) {
    classData = data;
};


