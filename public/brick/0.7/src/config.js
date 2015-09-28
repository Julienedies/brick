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
            if(!key) return _.extend({}, conf);

            var keys = key.split('.');

            return (function x(namespace, keys){
                var k = keys.shift();
                var o = namespace[k];
                if(o && keys.length) return x(namespace[k], keys);
                return o;
            })(conf, keys);

        },

        set: function(key, val){

            var old = this.get(key);

            if(old && _.isObject(old) && _.isObject(val)) return _.extend(old, val);

            this._set(key, val);
        },

        _set: function(key, val){

            var keys = key.split('.');

            (function x(namespace, keys){
                var k = keys.shift();
                var o = namespace[k];
                if(keys.length){
                    if(!o) o = namespace[k] = {};
                    x(o, keys);
                }else{
                    if(val === undefined) return delete namespace[k];
                    namespace[k] = val;
                }
            })(conf, keys);

        }

    };


})();