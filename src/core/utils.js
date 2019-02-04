/**
 * 工具函数集合
 * Created by Juien on 2015/8/10.
 */

import $ from 'jquery'

export default {
    cid: function () {
        return Math.random().toFixed(7).replace('0.', '');
    },
    /**
     * @todo 恢复被转义的html
     * @param text {string} <必须> html类型字符串
     * @returns {*}
     */
    toHtml: function (text) {
        let $c = $('<div></div>');
        $c.html(text);
        return $c.text();
    },
    /**
     * @todo 封装location.search为一个对象，如果不存在，返回undefined
     * @param str {string}  [可选]  location.search 格式字符串,
     * @returns {*}
     * @example brick.utils.get_query('a=1&b=2');  // {a:1, b:2}
     */
    get_query: function (str) {
        let result;
        let k;
        if (str && /^[-_\w]+$/i.test(str)) {
            k = str;
            str = '';
        }
        str = str && str.split('?').length > 1 ? str.split('?')[1] : str;
        //let query = location.search.replace(/^\?/i, '').replace(/\&/img, ',').replace(/^\,+/img,'').replace(/([^=,\s]+)\=([^=,\s]*)/img, '"$1":"$2"');
        let query = (str || location.search).replace(/^\?/i, '').replace(/\&/img, ',').replace(/^\,+/img, '');
        query.replace(/([^=,\s]+)\=([^=,\s]*)/img, function ($, $1, $2) {
            result = result || {};
            let k;
            let arr;
            $2 = decodeURIComponent($2);
            if (/\[\]$/i.test($1)) {
                k = $1.replace(/\[\]$/i, '');
                arr = result[k] = result[k] || [];
                arr.push($2);
            } else {
                result[$1] = $2;
            }
        });
        //    if(!query) return result;
        //    try {
        //        result = JSON.parse('{' + query + '}');
        //    } catch (e) {
        //        console.error(e);
        //        return;
        //    }

        //    for(let i in result){
        //        result[i] = decodeURIComponent(result[i]);
        //    }

        return k ? (result && result[k]) : result;
    }
};

