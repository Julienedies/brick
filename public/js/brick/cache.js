/**
 * Created by Julien on 2015/8/10.
 */

brick.cache = function cache(k, v, expire){

    if(_.isObject(expire)){
        var conf = expire;
        expire = conf.expire;
    }

    expire = expire || brick.cache.expire || 1 * 24 * 60 * 60 * 1000;

    var data;

    if(!v) {

        data = JSON.parse(localStorage.getItem(k));

        if(+new Date - data.__ic_start > data.__ic_expire){

            localStorage.removeItem(k);
            return void(0);

        }else{
            return data.__ic_data;
        }

    }else{

        data = {};
        data.__ic_start = + new Date;
        data.__ic_data = v;
        data.__ic_expire = expire;

        localStorage.setItem(k, JSON.stringify(data));

    }

};
