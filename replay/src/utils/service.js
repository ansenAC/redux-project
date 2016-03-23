function post(url, data, options) {
    options = options || { };
    data = data || { };

    return $.ajax({
        url: url,
        data: data,
        method: 'post',
        dataType: 'json',
        async: options.sync ? false : true
    });
}


function get(url, data, options) {
    options = options || { };
    data = data || { };

    return $.ajax({
        url: url,
        data: data,
        method: 'get',
        dataType: 'json',
        async: options.sync ? false : true
    });
}


function jsonp(url, data) {
    return $.ajax({
        url: url,
        data: data,
        dataType: 'jsonp'
    });
}

function getJson(url, data) {
    return $.ajax({
        url: url,
        data: data,
        dataType: 'json'
    });
}

// 获取所有信令集合
export function getOrderList(urlPrefix) {
    return get(
        urlPrefix + '/all.json'
    );
};


export function getDocList(urlPrefix) {
    return get(
        urlPrefix + '/doc.json'
    );
};


export function getClassData(search) {
    return get(
        '/live/playbackInfo',
        search
    );
};


