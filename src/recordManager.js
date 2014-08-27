/**
 * Created by Julien on 2014/8/13.
 *
 *
 * 记录管理器
 *
 * var serv = new recordManager({scope:scope, eventPrefix:'holdModel'});
 *
 * serv.add({});
 */

function recordManager() {

    function fn(conf) {

        if (conf.constructor === Object) {

            for (var i in conf) {
                this[i] = conf[i];
            }

        }

        this._pool = {};

    }

    var proto = {

        _look: function () {
            console.log(this._pool);
        },

        k: 'id',

        init: function (data) {

            if (typeof data !== 'object') throw 'must be Array or Object on init';

            var pool = this._pool;

            for (var i in data) {

                var record = data[i];

                this.beforeSave(record, i);

                var id = this._getValueByKey(record);

                pool[id] = record;

            }

            this.fire('init');

        },

        get: function (value, query) {

            var pool = this._pool;

            var r = [];

            if (!arguments.length) {

                for (var i in pool) {

                    r.push(pool[i]);

                }

                return r;
            }

            for (var j in pool) {

                var record = pool[j];

                if (value === this._getValueByKey(record, query)) {
                    r.push( $.extend(true, {}, record) );
                }
            }

            return r.length > 1 ? r : r.length == 1 ? r[0] : void(0);

        },

        set: function (data, query) {

            var pool = this._pool;

            var find = this._find || [];

            var result = [];

            for (var i in find) {

                if (query && this._getValueByKey(find[i], query) === this._getValueByKey(data, query))  continue;

                var id = this._getValueByKey(find[i]);

                var record = pool[id];

                result.push( $.extend(true, record, data) );

                this.beforeSave(record);

                this.fire('change.' + id, {change: record});
            }

            this.end();

            return result.length ? result : false;
        },

        add: function (record) {

            var id = this._getValueByKey(record);

            this.beforeSave(record);

            this._pool[id] = record;

            this.fire('add', {add: record});

        },

        remove: function () {

            var pool = this._pool;

            var find = this._find || [];

            for (var i in find) {

                var id = this._getValueByKey(find[i]);

                delete pool[id];

                this.fire('remove:' + id, {remove: find[i]});

            }

            this.end();

        },

        clear: function () {

            this._pool = {};

            this.end();

            this.fire('clear');

            return this;

        },

        find: function (value, query) {

            var r = this._find = this.get(value, query);

            this._find = r && r.constructor === Object ? [r] : r;

            return this;

        },

        result: function(){
            return this._find;
        },

        end: function () {
            this._find = void(0);
        },

        _getValueByKey: function (record, k) {

            return this._get(record, k).v;
        },

        _get: function (record, k) {

            var chain = (k || this.k).split('.');

            var value = (function (chain, record) {

                var k = chain.shift();
                var v = record[k];

                if (chain.length) {
                    return arguments.callee(chain, v);
                }

                return v;

            })(chain, record);

            return {r: record, v: value};

        },

        fire: function (e, msg) {

            var scope = this.scope;
            var pool = this.get();
            var prefix = this.eventPrefix ? this.eventPrefix + '.' : '';

            msg = $.extend({pool: pool}, msg || {});

            scope && scope.fire && scope.fire(prefix + e, msg);

        },

        beforeSave: function(record, index){


        }


    };


    for (var i in proto) {

        fn.prototype[i] = proto[i];

    }


    return fn;

}
