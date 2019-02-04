/**
 * 用于管理配置
 * Created by julien.zhang on 2014/9/16.
 */

import _ from 'lodash'

const conf = {
    namespace: {
        prefix: 'ic'
    },
    event: {
        action: 'click'
    },
    ajax: {
        domain: ''
    },
    isMobile: /iPhone|iPad|iPod|iOS|Android/i.test(navigator.userAgent)
};

export default {
    get: function (key) {
        if (!key) return _.extend({}, conf);

        let keys = key.split('.');

        return (function fx (namespace, keys) {
            let k = keys.shift();
            let o = namespace[k];
            if (o && keys.length) return fx(namespace[k], keys);
            return o;
        })(conf, keys);

    },

    set: function (key, val) {

        let old = this.get(key);

        if (old && _.isObject(old) && _.isObject(val)) return _.extend(old, val);

        this._set(key, val);
    },

    _set: function (key, val) {

        let keys = key.split('.');

        (function fx (namespace, keys) {
            let k = keys.shift();
            let o = namespace[k];
            if (keys.length) {
                if (!o) o = namespace[k] = {};
                fx(o, keys);
            } else {
                if (val === undefined) return delete namespace[k];
                namespace[k] = val;
            }
        })(conf, keys);

    }

}


