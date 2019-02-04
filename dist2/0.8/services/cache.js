/**
 * Created by Julien on 2015/8/10.
 */

;
!function(){

    brick.cache = function(_conf){

        _conf = _.extend({
            expire : brick.config.get('cache.expire') ||  1 * 24 * 60 * 60 * 1000,
            namespace : brick.config.get('cache.namespace') || '__ic__'
        }, _conf || {});

        return function _cache(k, v, conf){

            if(_.isUndefined(k)) return console.log('return for undefined k.');

            var base = JSON.parse(JSON.stringify(_conf));

            if(_.isNumber(conf)){
                base.expire = conf;
            }

            conf = _.isObject(conf) ? _.extend(base, conf) : base;

            var namespace = conf.namespace ? conf.namespace + '.' : '';
            var key = namespace + k;

            var expire = conf.expire;

            var data;

            //清空localStorage
            if(k === false){
                localStorage.clear();
                return;
            }

            //返回所有的key
            if(k === true){

                for(var i = 0, keys = []; i < localStorage.length; i++){
                    keys.push(localStorage.key(i));
                }

                return keys;
            }

            //清空localStorage对应的key
            if(v === false){
                localStorage.removeItem(key);
                return;
            }

            //从localStorage获取对应的key或者设置对应的键值对
            if(_.isUndefined(v)) {

                data = JSON.parse(localStorage.getItem(key));

                if(!data) return void(0);

                if(+new Date - data.__ic_start > data.__ic_expire){

                    localStorage.removeItem(key);
                    return void(0);

                }else{
                    return data.__ic_data;
                }

            }else{

                data = {};
                data.__ic_start = + new Date;
                data.__ic_data = v;
                data.__ic_expire = expire;

                try{

                    localStorage.setItem(key, JSON.stringify(data));

                }catch(e){

                    if(e.name == 'QuotaExceededError'){

                        console.error('存储溢出.');
                        localStorage.clear();
                        localStorage.setItem(key, JSON.stringify(data));

                    }

                }

            }

        };
    };

}();


