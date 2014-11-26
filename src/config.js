/**
 * Created by julien.zhang on 2014/9/16.
 *
 * 框架配置
 */

var config = (function (){

    var conf = {
        directive_prefix: 'ic'
    };

    return {
        get: function(key){
            return conf[key];
        },
        set: function(key, val){
            conf[key] = val;
        }
    };


})();