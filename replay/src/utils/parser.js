import {emotionMap} from '../constants/emotionConfig';
import stringUtil  from 'cobble/util/string';

// 暂时用一个地址解析一下
import cryImage from '../image/emotion/cry.png';
const imageDir = cryImage.slice(0, -7);

const urlExpr = /(?=http[s]?:\/\/|www)[-~!@#$%^&*_+=.:?\/a-z0-9]+/i;


export function getEmotionByCode(code) {
    let emotion = emotionMap[code];
    let html = '';
    if (emotion) {
        html = `'<img src="`
         + `${imageDir}${emotion.name}.png"`
         + `srcset="${imageDir}${emotion.name}@2x.png 2x"`
         + `data-code="${emotion.code}" data-title="${emotion.text}"`
         + `ondragstart="return false" />`;
    }

    return html;
};

export function parseEmotion(content) {
    let me = this;

    return content.replace(
        /\[(\w+)\]/g,
        ($0, $1) => {
            return getEmotionByCode($1);
        }
    );
};

export function encodeHTML(content) {
    return content.replace(
        /<\/?(\w+)( [^>]+)?>/ig,
        function ($0, $1) {
            return stringUtil.encodeHTML($0);
        }
    );
};

export function parseBreakline(content) {
    return content
        .replace(
            /\n\r?/g,
            function ($0) {
                return '<br />';
            }
        );
};

export function parseWhitespace(content) {
    return content
        .replace(
            / /g,
            function ($0) {
                return '&nbsp;';
            }
        );
};

export function parseLink(content) {
    return content.replace(
        urlExpr,
        function ($0) {

            var raw = $0;
            var url = raw;

            if (raw.indexOf('http') !== 0) {
                url = 'http://' + raw;
            }

            return '<a href="' + url + '" target="_blank">'
                 + raw
                 + '</a>';
        }
    );
};

export function parseTime() {

};