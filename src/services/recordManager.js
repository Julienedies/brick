/**
 * Created by Julien on 2014/8/13.
 * 记录管理器
 * let recordManager = brick.services.get('recordManager');
 * let serv = recordManager(
 *                              {
 *                                  scope:scope,
 *                                  not
 *                                  broadcast:true, //是否广播事件
 *                                  eventPrefix:'holdModel', //广播事件前缀
 *                                  key:'hold.id',  //记录id
 *                                  beforeSave:function(record,index){}
 *                              }
 *                              );
 */

import $ from 'jquery'
import eventManager from '../core/eventManager'

function RecordManager (conf) {

    if (conf && conf.constructor === Object) {

        for (let i in conf) {
            this[i] = conf[i];
        }

    }

    this._pool = {};

}

const proto = {

    /**
     * 默认每条记录的主键为id；
     */
    key: 'id',

    /**
     *
     * @param data {Array | Object}
     * @return {this}
     */
    init: function (data) {

        if (typeof data !== 'object') throw 'must be Array or Object on init';

        let pool = this._pool;

        for (let i in data) {

            let record = data[i];

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

        let pool = this._pool;

        let result = [];

        let isFilterCb = typeof value === 'function';

        //
        if (isFilterCb) {
            for (let i in pool) {
                let record = pool[i];
                if (value(record, i)) {
                    result.push($.extend(true, {}, record));
                }
            }
            return result;
        }

        //
        if (value === void (0)) {
            for (let i in pool) {
                result.push($.extend(true, {}, pool[i]));
            }
            return result;
        }

        //
        if (typeof value === 'object') {
            query = this.key;
            value = value[query];
        }

        for (let j in pool) {
            let record = pool[j];
            if (value === this._queryKeyValue(record, query)) {
                result.push($.extend(true, {}, record));
            }
        }


        if (result.length === 1 && !isFilterCb && (query === this.key || (value && query === undefined))) {
            return result[0];
        }

        return result;
    },
    /**
     * 包装this.get(); 如果返回的数组只有单个对象，去掉数组，直接返回对象
     * @param value
     * @param query
     * @returns {*}
     */
    get2: function (value, query) {
        let result = this.get(value, query);
        if (result.length === 1) {
            return result[0];
        }
        return result;
    },

    /**
     * 对查询结果记录进行修改
     * @param data      {Object}            要更新的数据
     * @param query     {String}            对key进行限定，只有对应的key变化，才修改
     * @returns         {Array | Boolean}    返回修改过的记录数组，如果没有修改任何记录，返回false
     * @example
     *
     * new recoredManager().init([{x:1,y:2},{x:1,y:5}]).find(1,'x').set({y:3});     // result [{x:1,y:3},{x:1,y:3}]
     * new recoredManager().init([{x:1,y:2}]).find(2,'x').set({y:3});               // result false
     */
    set: function (data, query) {

        let pool = this._pool;

        let find = this._find || [];

        let result = [];

        for (let i in find) {

            let record = find[i];

            if (query && this._queryKeyValue(record, query) === this._queryKeyValue(data, query)) continue;

            let id = this._queryKeyValue(record);

            let index = this._getIndex(id);

            record = pool[index];

            result.push($.extend(true, record, data));

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

        let pool = this._pool;

        let id = this._queryKeyValue(record);

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
    prev: function () {
        let pool = this._pool;
        let find = this._find || [];
        for (let i in find) {
            let record = find[i];
            let id = this._queryKeyValue(record);
            let index = this._getIndex(id);

            if (pool.splice) {
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

        let pool = this._pool;

        let find = this._find || [];

        for (let i in find) {

            let record = find[i];
            let id = this._queryKeyValue(record);
            let index = this._getIndex(id);

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
        let result = this.get(value, key);
        this._find = Array.isArray(result) ? result : [result];
        return this;
    },

    /**
     * 获取查询结果记录集合
     * @returns {Array | undefined}
     * @example
     *
     * new recoredManager().init([{x:1,y:2},{x:1,y:5}]).find(1,'x')  // return [{x:1,y:2},{x:1,y:5}];
     */
    result: function () {
        return this._find;
    },

    end: function () {
        this._find = void (0);
    },
    emit (e, msg) {
        this.fire(e, msg)
    },
    fire: function (e, msg) {

        let scope = this.scope;
        let broadcast = this.broadcast;
        let pool = this.get();
        let prefix = this.eventPrefix ? this.eventPrefix + '.' : '';

        msg = $.extend({pool: pool}, msg || {});

        broadcast && eventManager.emit(prefix + e, msg);
        scope && scope.fire && scope.fire(prefix + e, msg);

    },

    /**
     * 插入或修改一条记录时的回调函数
     * @param record
     * @param index
     */
    beforeSave: function (record, index) {


    },

    _queryKeyValue: function (record, k) {

        return this._get(record, k).v;
    },

    _get: function (record, k) {

        let chain = (k || this.key).split('.');

        let value = (function fx (chain, record) {

            let k = chain.shift();
            let v = record[k];

            if (chain.length) {
                return fx(chain, v);
            }

            return v;

        })(chain, record);

        return {r: record, v: value};

    },

    _getIndex: function (record, query) {

        let pool = this._pool;

        let v = typeof record === 'object' ? this._queryKeyValue(record, query) : record;

        for (let i in pool) {

            if (this._queryKeyValue(pool[i], query) === v) return i;

        }
    },

    _look: function () {
        console.log(this._pool);
    }


};

for (let i in proto) {

    RecordManager.prototype[i] = proto[i];

}


function recordManager (conf) {
    return new RecordManager(conf);
}


//内置服务
export default recordManager
