/**
 * Created by Julien on 2014/8/13.
 *
 *
 * 记录管理器
 *
 * var serv = new recordManager(
 *                              {
 *                                  scope:scope,
 *                                  broadcast:true, //是否广播事件
 *                                  eventPrefix:'holdModel', //广播事件前缀
 *                                  key:'hold.id',  //记录id
 *                                  beforeSave:function(record,index){}
 *                              }
 *                              );
 *
 *
 */

function recordManager() {

    function fn(conf) {

        if (conf && conf.constructor === Object) {

            for (var i in conf) {
                this[i] = conf[i];
            }

        }

        this._pool = {};

    }

    var proto = {

        /**
         * 默认每条记录的主键为id；
         */
        key: 'id',

        /**
         *
         * @param data {Array or Object}
         * @return {this}
         */
        init: function (data) {

            if (typeof data !== 'object') throw 'must be Array or Object on init';

            var pool = this._pool;

            for (var i in data) {

                var record = data[i];

                this.beforeSave(record, i);

            }

            this._pool = data;

            this.fire('init');

            return this;

        },

        /**
         * 获取查询结果
         * @param value  {*}            要查询的key值
         * @param query  {String}       要查询的key
         * @returns      {Array}        根据查询结果返回数组
         * @example
         *
         * new recordManager().init([{id:1,y:2},{id:2,x:3}]).get();          // return [{id:1,y:2},{id:2,x:3}];
         * new recordManager().init([{id:1,y:2}]).get(1);                    // return [{id:1,y:2}];
         * new recordManager({k:'x'}).init([{x:1,y:2}]).get(1);              // return [{x:1,y:2}];
         * new recordManager({k:'x'}).init([{x:1,y:{z:3}}]).get(3,'y.z');    // return [{x:1,y:{z:3}}];
         * new recordManager().init([{id:1,y:2}]).get(2);                    // return [];
         */
        get: function (value, query) {

            var pool = this._pool;

            var r = [];

            if (value === void(0)) {

                for (var i in pool) {

                    r.push( $.extend(true, {}, pool[i]) );

                }

                return r;
            }

            if(typeof value === 'object'){
                query = this.key;
                value = value[query];
            }

            for (var j in pool) {

                var record = pool[j];

                if (value === this._queryKeyValue(record, query)) {

                    r.push( $.extend(true, {}, record) );

                }
            }

            return r;

        },

        /**
         * 对查询结果记录进行修改
         * @param data      {Object}            要更新的数据
         * @param query     {String}            对key进行限定，只有对应的key变化，才修改
         * @returns         {Array or false}    返回修改过的记录数组，如果没有修改任何记录，返回false
         * @example
         *
         * new recoredManager().init([{x:1,y:2},{x:1,y:5}]).find(1,'x').set({y:3});     // result [{x:1,y:3},{x:1,y:3}]
         * new recoredManager().init([{x:1,y:2}]).find(2,'x').set({y:3});               // result false
         */
        set: function (data, query) {

            var pool = this._pool;

            var find = this._find || [];

            var result = [];

            for (var i in find) {

                var record = find[i];

                if (query && this._queryKeyValue(record, query) === this._queryKeyValue(data, query))  continue;

                var id = this._queryKeyValue(record);

                var index = this._getIndex(id);

                record = pool[index];

                result.push( $.extend(true, record, data) );

                this.beforeSave(record);

                this.fire('change', {change: record});
            }

            this.end();

            return result.length ? result : false;
        },

        /**
         * 添加一条记录
         * @param record
         */
        add: function (record) {

            var pool = this._pool;

            var id = this._queryKeyValue(record);

            this.beforeSave(record);

            pool.push ? pool.push(record) : (pool[id] = record);

            this.fire('add', {add: record});

            return this;

        },
        /**
         * 调整记录位置,在队列里向前移动
         * @return
         * @example
         *
         * new recoredManager().init([{x:1,y:2},{x:1,y:5}]).find(1,'x').prev();
         */
        prev: function(){
            var pool = this._pool;
            var find = this._find || [];
            for(var i in find){
                var record = find[i];
                var id = this._queryKeyValue(record);
                var index = this._getIndex(id);

                if(pool.splice){
                    pool.splice(index, 1);
                    pool.splice(--index, 0, record);
                }

                this.fire('order', {target: record});
            }

            this.end();
        },
        /**
         * 删除一条记录
         * @return   {Array}   被删除的记录集合
         * @example
         *
         * new recoredManager().init([{x:1,y:2},{x:1,y:5}]).find(1,'x').remove();  // result this._pool == {}; return [{x:1,y:2},{x:1,y:5}];
         */
        remove: function () {

            var pool = this._pool;

            var find = this._find || [];

            for (var i in find) {

                var record = find[i];
                var id = this._queryKeyValue(record);
                var index = this._getIndex(id);

                (pool.splice && index !== undefined) ? pool.splice(index, 1) : delete pool[id];

                this.fire('remove', {remove: record});

            }

            this.end();

            return find;

        },

        /**
         * 清空所有记录
         * @returns {proto}
         */
        clear: function () {

            this._pool = {};

            this.end();

            this.fire('clear');

            return this;

        },

        /**
         * 根据key value查找记录
         * @param value  {*}            要查询的key值
         * @param key  {String}         要查询的key
         * @returns {this}
         * @example
         *
         * new recoredManager().init([{x:1,y:2},{x:1,y:{z:7}}]).find(1,'x')  // result this._find == [{x:1,y:2},{x:1,y:5}];
         * new recoredManager().init([{x:1,y:2},{x:1,y:{z:7}}]).find(7,'y.z')  // result this._find == [{x:1,y:{z:7}}];
         */
        find: function (value, key) {

            this._find = this.get(value, key);

            return this;

        },

        /**
         * 获取查询结果记录集合
         * @returns {Array or undefined}
         * @example
         *
         * new recoredManager().init([{x:1,y:2},{x:1,y:5}]).find(1,'x')  // return [{x:1,y:2},{x:1,y:5}];
         */
        result: function(){
            return this._find;
        },

        end: function () {
            this._find = void(0);
        },

        fire: function (e, msg) {

            var scope = this.scope;
            var broadcast = this.broadcast;
            var pool = this.get();
            var prefix = this.eventPrefix ? this.eventPrefix + '.' : '';

            msg = $.extend({pool: pool}, msg || {});

            broadcast && brick.broadcast(prefix + e, msg);
            scope && scope.fire && scope.fire(prefix + e, msg);

        },

        /**
         * 插入或修改一条记录时的回调函数
         * @param record
         * @param index
         */
        beforeSave: function(record, index){


        },

        _queryKeyValue: function (record, k) {

            return this._get(record, k).v;
        },

        _get: function (record, k) {

            var chain = (k || this.key).split('.');

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

        _getIndex: function(record, query){

            var pool = this._pool;

            var v = typeof record === 'object' ? this._queryKeyValue(record, query) : record;

            for(var i in pool){

                if(this._queryKeyValue(pool[i], query) === v) return i;

            }
        },

        _look: function () {
            console.log(this._pool);
        }



    };


    for (var i in proto) {

        fn.prototype[i] = proto[i];

    }


    return fn;

}


//内置服务
services.reg('recordManager', recordManager);