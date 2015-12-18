/**
 * Created by Juien on 2015/8/10.
 */


/**
 * 虚构进度数字
 * @type {{current: number, get: get, init: init}}
 */
brick.progress = {
    current: 1,
    get: function () {
        var current = this.current;
        var add = current > 97 ? 0 : current > 72 ? Math.random() : Math.round(Math.random() * 16);
        current = this.current += add;
        return (current.toFixed(2) + '%').replace(/\.00/i, '');
    },
    init: function () {
        this.current = 1;
        return this;
    }
};

/**
 * 封装location.search为一个对象，如果不存在，返回undefined
 * @returns {*}
 */
brick.getQuery = function (str) {
    var result;
    var k;
    if(str && /^[\w]+$/i.test(str)){
        k = str;
        str = '';
    }
    //var query = location.search.replace(/^\?/i, '').replace(/\&/img, ',').replace(/^\,+/img,'').replace(/([^=,\s]+)\=([^=,\s]*)/img, '"$1":"$2"');
    var query = (str || location.search).replace(/^\?/i, '').replace(/\&/img, ',').replace(/^\,+/img,'');
    query.replace(/([^=,\s]+)\=([^=,\s]*)/img, function($, $1, $2){
        result = result || {};
        var k;
        var arr;
        $2 = decodeURIComponent($2);
        if(/\[\]$/i.test($1)){
            k = $1.replace(/\[\]$/i, '');
            arr = result[k] = result[k] || [];
            arr.push($2);
        }else{
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

//    for(var i in result){
//        result[i] = decodeURIComponent(result[i]);
//    }

    return k ? result[k] : result;
};

/**
 * 恢复被转义的html
 * @param text
 * @returns {*}
 */
brick.toHtml = function (text) {
    var c = $('<div></div>');
    c.html(text);
    return c.text();
};




