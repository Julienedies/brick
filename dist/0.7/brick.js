/*!
 * js framework brick by Julien.
 * https://github.com/julienedies/brick.git
 * https://github.com/Julienedies/brick/wiki
 */
;
(function (root, undefined) {

    /**
 * Created by julien.zhang on 2014/9/16.
 *
 * 框架配置
 */

var config = (function (){

    var conf = {
        namespace:{
            prefix: 'ic'
        },
        event:{
            //action:/iPhone|iPad|iPod|iOS|Android/i.test(navigator.userAgent) ? 'touchstart' : 'click'
            action:'click'
        }
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


})();;
    /**
 * Created by julien.zhang on 2014/12/9.
 */

function compile(node, debug){

    if(node.nodeType != 1) return;

    var $elm = $(node);
    var attrs = node.attributes;

    var _directives = [];

    var priority = {
        'ic-ctrl': -1000
    };

    var j = 0;
    _.each(directives.get(), function(v, i, list){

        if(typeof v === 'object' && v.priority){
            priority[i] = v.priority;
            return;
        }
        priority[i] = j++;

    });


    var name;


    for (var i = 0, l = attrs.length; i < l; i++) {

        name = attrs[i].name;

        if (directives.get(name)) {
            _directives.push(name);
            continue;
        }

    }

    //对指令按优先级排序
    _directives.sort(function(a, b){
        return priority[a] - priority[b];
    });


    //处理每一个指令
    while (name = _directives.shift()) {
        debug && console.log(name, $elm, attrs);
        directives.exec(name, $elm, attrs);
    }


};
    /**
 * Created by julien.zhang on 2014/9/15.
 *
 * 事件管理器
 */


var eventManager = (function() {

    var _events = {};

    return {

        /**
         * 订阅一个事件监听
         * @param e {String} 事件名
         * @param f {Function} 回调函数
         * @param context {Object} 调用watch方法的scope
         */
        bind: function (e, f, context) {
            e = e.split(/[,\s]+/g);
            for(var i in e){
                this._bind(e[i], f, context);
            }
        },
        _bind: function(e, f, context){

            var handle = {f: f};

            var event = this._getNamespace(e);

            if (context) {
                handle.context = context;
            }

            var callback = event._callback = event._callback || [];

            callback.push(handle);
        },

        /**
         * 取消一个事件监听
         * @param e {String} 事件名
         * @param f {Function} 回调函数，可选，如果没有传递，则取消该事件下的所有监听
         */
        unbind: function (e, f) {
            e = e.split(/[,\s]+/g);
            for(var i in e){
                this._unbind(e[i], f);
            }
        },
        _unbind: function(e, f){
            var event = this._getNamespace(e);
            var callback = event && event._callback;
            var handle;

            if (callback) {

                if (!f) {
                    delete event._callback;
                    return;
                }

                for (var i = 0, len = callback.length; i < len; i++) {

                    handle = callback[i];

                    if (f === handle.f || f.toString() === handle.f.toString()) {
                        callback.splice(i, 1);
                        return;
                    }

                }
            }
        },

        /**
         *
         * @param e {String} 事件名
         * @param msg  {*}   任意想要传递的数据对象
         * @example
         * e = 'a.b.c';   会触发 ["a.b.c", "a.*.c", "a.*", "a.b.*"]
         */
        fire: function (e, msg, that) {

            var namespace = e.split(/\.|\:/);

            var prefix = namespace.shift();

            var events = [e];

            (function (arr, pre) {

                if (!arr.length) return;

                pre = pre ? pre + '.' : '';

                for (var i = 0, len = arr.length; i < len; i++) {

                    var arr1 = arr.slice();
                    arr1.splice(0, i + 1);
                    var event = pre + '*' + (arr1.length ? '.' + arr1.join('.') : '');
                    events.push(event);

                }

                pre += arr.shift();

                arguments.callee(arr, pre);

            })(namespace.slice(), prefix);


            for (var _e; _e = events.shift();) {

                this._fire(_e, msg, that);

            }

        },

        _fire: function (e, msg, that) {

            var event = this._getNamespace(e);
            var callback = event && event._callback;
            var handle;
            var context;
            var f;

            if (callback) {

                // _cc('fire=> ', e, msg);

                for (var i = 0, len = callback.length; i < len; i++) {

                    handle = callback[i];
                    context = handle.context || {};
                    f = handle.f;

                    if (f.constructor === Function) {
                        f.apply(context, [
                            {eventName: e, source: that},
                            msg
                        ]);
                    }

                }

            }

        },

        _getNamespace: function (e) {

            return _events[e] = _events[e] || {};

            var namespace = e.split('.');

            return (function (k, _events) {

                var i = k.shift();
                var o = _events[i] = _events[i] || {};

                if (k.length) {
                    return arguments.callee(k, o);
                }

                return o;

            })(namespace, _events);

        },

        _look: function () {
            console.log(_events);
        }


    };

})();;
    /**
 * Created by julien.zhang on 2014/9/15.
 *
 * 控制器管理器
 */


var controllers = (function (){

    // 存储控制器
    var _ctrls = {};
    var _bind = {};

    function extend(dist, o){
        for(var i in o){
            dist[i] = o[i];
        }
        return dist;
    }

    // scope原型对象
    function _F(){}

    extend(_F.prototype, {

        set: function(key, val){
            this[key] = val;
            this.render();
        },

        get: function(key){
            return this[key];
        },

        _bind: function(name){
            if(typeof name === 'string'){
                name = [name];
            }

            for(var arr, i = 0, l = name.length; i < l; i++){
                arr = _bind[name[i]] = _bind[name[i]] || [];
                arr.push(this._name);
            }
        },
        _cancel: function(name){
            if(!name) {
                delete _bind[this._name];
                return;
            }
            if(typeof name === 'string'){
                name = [name];
            }

            var arr = _bind[this._name];

            if(arr && arr.shift){

                for(var v; v = name.shift(); ){
                    for(var i = 0, l = arr.length; i < l; i++){
                        if(arr[i] === v){
                            arr.splice(i, 1);
                        }
                    }
                }

            }
        },
        _fire: function(e){
            var selfName = this._name;
            var arr = ( _bind[selfName] || [] ).slice();

            for(var i; i = arr.shift(); ){

                _ctrls[i].scope._watch( extend( {source:this}, e || {} ) );

            }
        },
        _watch: function(e){

        },

        /**
         * 用于触发事件
         * @param e {String} 事件名
         * @param msg {*}    任意要传递的数据
         */
        fire: function(e, msg){
            var that = this;
            eventManager.fire(e, msg, that);
        },

        /**
         * 用于订阅事件
         * @param e  {String}   事件名
         * @param f  {Function} 回调函数，接受两个参数e(事件对象，由框架封装提供），msg(用户自定义数据)
         */
        watch: function(e, f){
            var that = this;
            eventManager.bind(e, f, that);
        },

        /**
         * 取消事件监听
         * @param e {String}   事件名
         * @param f {Function} 回调函数
         */
        unbind: function(e, f){
            eventManager.unbind(e, f);
        },

        tmplFn: function(){

        },
        /**
         * 比较htmlList，生成dom补丁对象，用于更新dom
         */
        diff: function(){

        },

        htmlList: null,

        updateDom: function(patch){

        },
        render: function(tplName, model, call){
            var that = this;
            setTimeout(function(){
                var tple = that._render_(tplName, model);
                call && tple && call.apply(tple, []);
            },30);
        },
        _render_: function(tplName, model){
            var $elm = this.$elm;
            var tplf = brick.getTpl(tplName);  //模板函数
            var tple; //dom元素
            var html;
            if($elm && tplf){
                tple = $elm.filter('[ic-tpl=?]'.replace('?', tplName));
                tple = tple.length ? tple : $elm.find('[ic-tpl=?]'.replace('?', tplName));
                html = tplf(model ? {model:model} : this);
                //console.log(html)
                if(tple.length){
                    tple.show();
                    return tple.html(html);
                }
            }
        },

        _render: function(){
            var html = this.tmplFn({data: this});

            if(this.htmlList){
                var patch = this.diff(html);
                if(!patch) return;
                this.htmlList = html;
                return this.updateDom(patch);
            }

            //this.htmlList = html;
            this.domNode && this.domNode.html(html);
        }

    });


    function f(name, o){
        function F(){ this._name = name;}
        F.prototype = new _F();
        extend(F.prototype, o || {});
        return new F;
    }


    return {

        /**
         * 旧的事件接口，废弃
         */
        bind: _bind,

        /**
         * 获取一个控制器的对外接口对象
         * @param name {String} 控制器ID
         */
        get: function(name){
            return _ctrls[name] && _ctrls[name].scope;
        },

        /**
         * 注册控制器
         * @param name {String}   控制器ID
         * @param ctrl {Function} 控制器的工厂函数
         * @param conf {Object}   可选，控制器config (可以定义依赖，是否注册为global变量，是否做为service)
         */
        add: function(name, ctrl, conf){
            conf = conf || {};
            var parent = conf.parent;
            var depend = conf.depend || [];
            var scope;
            scope = parent ? f(name, _ctrls[parent]) : f(name);
            if(conf.global){
                window[name] = scope;
            }
            _ctrls[name] = {fn:ctrl, scope:scope, depend:depend, service:conf.service, conf:conf};
        },

        /**
         * 注册控制器
         * @param name {String}   控制器ID
         * @param ctrl {Function} 控制器的工厂函数
         * @param conf {Object}   可选，控制器config (可以定义依赖，是否注册为global变量，是否做为service)
         */
        reg: function(name, ctrl, conf){
            conf = conf || {};
            var depend = conf.depend || [];
            _ctrls[name] = {fn:ctrl, conf: conf, depend:depend, service:conf.service, scope:[]};
        },

        /**
         * 运行控制器
         * @param name
         */
        exec: function(name, parent, $elm){
            var ctrl = _ctrls[name];

            if (!ctrl) return console.log('not find controller ' + name);

            var conf = ctrl.conf;
            var scope;
            var depend = conf.depend || [];

            scope = parent ? f(name, parent) : f(name);
            scope._parent = parent && parent._name;
            scope.$elm = $elm;
            ctrl.scope = scope; //如果有多个控制器实例，则改名下控制器的作用域对象引用的会是最后一个实例化控制器的作用域对象
            $elm.data('ic-ctrl-scope', scope);

            depend = services.get(depend) || [];
            depend = depend.constructor !== Array ? [depend] : depend;
            depend.unshift(scope);

            ctrl.fn.apply(null, depend);
            //ctrl.fn = function(){};
            ctrl.exec = (ctrl.exec || 0)+1;

            //if(conf.global) window[name] = scope;
            return scope;
        },

        /**
         * 初始化控制器
         */
        init: function(name){
            var ctrls = _ctrls;
            var ctrl;
            var depend;
            var service;
            for(var i in ctrls){
                ctrl = ctrls[i];
                if(ctrl.exec) continue;
                depend = services.get(ctrl.depend) || [];
                if(depend.constructor !== Array){
                    depend = [depend];
                }
                depend.unshift(ctrl.scope);
                service = ctrl.fn.apply(null, depend);
                ctrl.fn = function(){};

                if(ctrl.service){
                    services.fill(i, service);
                }

            }
        },

        _look: function(){
            return _ctrls;
        }
    };

})();;
    /**
 * Created by julien.zhang on 2014/9/15.
 *
 * 服务管理器 （任意类型的数据，模型对象，UI组件都可以做为服务存在；通常是单例对象）
 */

var services = (function() {

    var services = {};
    var registry = {};

    return {
        _look: function () {
            console.log(registry);
        },
        /**
         * 注册服务
         * @param name {String}    服务ID
         * @param serve {Function} 服务的工厂函数
         * @param depend {Array}   可选，依赖的其它服务
         */
        add: function (name, serve, depend) {
            registry[name] = {depend: depend, serve: serve};
        },
        reg: function (name, factory, conf){
            var depend = conf && (conf.constructor === Array ? conf : conf.depend);
            registry[name] = {depend: depend, serve: factory, conf: conf};
        },
        /*
         * 实例化一个服务
         */
        create: function (name) {
            var that = this;
            var info = registry[name];

            if (!info) return;

            var depend = info.depend;
            if (depend) {
                depend = that.get(depend);
            }

            window[name] = info.serve.apply(null, depend || []);
            return window[name];
        },

        /**
         * 直接注册一个已经实例化的服务
         * @param name {String} 服务ID
         * @param service {*}   任意数据对象
         */
        fill: function (name, service) {
            services[name] = service;
        },

        /**
         * 获取一个服务实例
         * @param name {String} 服务器ID
         * @return 服务 {*}  任意类型，取决于当初注册时的服务对象
         */
        get: function (name) {
            var that = this;
            if (!name) return;

            //外部get
            if (typeof name === 'string') {
                return services[name] = services[name] || that.create(name);
            }

            //内部get
            if (name.constructor === Array) {

                name = name.slice();

                for (var i = 0, v, len = name.length; i < len; i++) {
                    v = name[i];
                    name[i] = services[v] = services[v] || that.create(v);
                }

                return name;
            }
        }
    };

})();;
    /**
 * Created by julien.zhang on 2014/9/17.
 */

var directives = {

    _pool: {},

    add: function (name, definition, conf) {
        if(conf){
            conf.fn = definition;
        }
        this._pool[name] = definition;
    },

    reg: function(name, definition, conf){
        if(conf){
            conf.fn = definition;
        }
        this._pool[name] = conf || definition;
    },

    get: function (name) {
        return name ? this._pool[name] : this._pool;
    },

    exec: function (name, $elm, attrs) {
        var _pool = this._pool;
        var definition = _pool[name];

        if (typeof definition === 'function') {
            definition.apply(null, [$elm, attrs]);
        } else if (definition.fn) {
            definition.fn.apply(null, [$elm, attrs]);
        }
    },

    init: function(){
        var _pool = this._pool;
        for(var i in _pool){

            var definition = _pool[i];

            if(definition.selfExec){
                definition.fn && definition.fn();
            }

            if(definition.once){
                delete _pool[i];
            }
        }

    },

    _init: function (name) {
        var _pool = this._pool;
        for (var i in _pool) {
            var definition = _pool[i];
            if (typeof definition === 'function') {
                definition();
            } else if (definition.fn) {
                definition.fn();
            }

        }
    }

};

;
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
;
    /**
 * Created by julien.zhang on 2014/9/12.
 *
 * 主要用于解析一个dom节点上绑定的操作
 *
 */

function parser(node) {


    if (node.nodeType == 1) {

        var elm = $(node);
        var attrs = node.attributes;

        var directives = [];

        var priority = {
            'skip': -100,
            'init': -10,
            'for': 0,
            'for-start':1,
            'for-init': 10,
            'if': 100,
            'else-if':99,
            'if-start': 100,
            'if-init': 110,
            'else': 100,
            'bind': 1000,
            'if-end':10000,
            'for-end':10000
        };


        for (var i = 0, attr, name, value, l = attrs.length; i < l; i++) {

            attr = attrs[i];

            name = attr.name;
            value = attr.value;

            if (/^ic-(skip|init|for|if|else|bind)/.test(name) || /\{\{.+?\}\}/.test(value)) {
                directives.push([name, value]);
                //continue;
            }

        }

        //对指令按优先级排序
        directives.sort(function(a, b){
            return priority[a[0].replace(/^ic-/,'')] - priority[b[0].replace(/^ic-/,'')];
        });


        //处理每一个指令
        while (attr = directives.shift()) {

            name = attr[0];
            value = attr[1];

            if (/-skip$/.test(name)) {
                elm.remove();
                return;
            }

            if (/-init$/.test(name)) {
                elm.before('\r\n<% var ' + value.replace(/;(?=\s*[_\w]+\s*=)/g, ';var ') + ' %>\r\n');
                elm.removeAttr(name);
                continue;
            }

            if (/-for$/.test(name)) {
                //elm.before('<% for( var ' + value + '){ %>\r\n');
                elm.before(value.replace(/^\s*(?:(\w+?)\s*\,\s*)?(\w+?)\s*in\s*([\w.]+)/,function(m,$1,$2,$3,t){
                    if ($1 && $2) return '<% for( var ' + $1 + ' in ' + $3 + '){ var ' + $2 + ' = ' + $3+'[' +$1 + ']; %>\r\n';
                    return '<% for( var ' + m + '){ %>\r\n';
                }));
                elm.after('\r\n<% } %>');
                elm.removeAttr(name);
                continue;
            }

            if (/-for-start$/.test(name)) {
                elm.before(value.replace(/^\s*(?:(\w+?)\s*\,\s*)?(\w+?)\s*in\s*([\w.]+)/,function(m,$1,$2,$3,t){
                    if ($1 && $2) return '<% for( var ' + $1 + ' in ' + $3 + '){ var ' + $2 + ' = ' + $3+'[' +$1 + ']; %>\r\n';
                    return '<% for( var ' + m + '){ %>\r\n';
                }));
                elm.removeAttr(name);
                continue;
            }

            if (/-for-end$/.test(name) || /-if-end$/.test(name)) {
                elm.after('\r\n<% } %>');
                elm.removeAttr(name);
                continue;
            }


            if (/-else-if$/.test(name)) {
                elm.before('<% } else if(' + (value===''?void(0):value) + '){ %>\r\n');
                elm.removeAttr(name);
                continue;
            }

            if (/-if$/.test(name)) {
                elm.before('<% if(' + (value===''?void(0):value) + '){ %>\r\n');
                elm.after('\r\n<% } %>');
                elm.removeAttr(name);
                continue;
            }


            if (/-if-start$/.test(name)) {
                elm.before('<% if(' + (value===''?void(0):value) + '){ %>\r\n');
                elm.removeAttr(name);
                continue;
            }

            if (/-else$/.test(name)) {
                elm.before('<% } else{ %>\r\n');
                elm.after('\r\n<% } %>');
                elm.removeAttr(name);
                continue;
            }

            if (/-bind$/.test(name)) {
                elm.html('\r\n<%= ' + (value===''?'\"\"':value) + ' %>\r\n');
                elm.removeAttr(name);
                continue;
            }

            if(/^ic-(?:href|src|style|class|data|value)$/.test(name)){
                elm.removeAttr(name);
                elm.attr(name.replace('ic-',''), value.replace(/{{(.+?)}}/g, '<%= $1 %>'));
                continue;
            }

            elm.attr(name, value.replace(/{{(.+?)}}/g, '<%= $1 %>'));

        }

        return;

    }

    if (node.nodeType == 3) {

        var text = node.nodeValue;

        node.nodeValue = text.replace(/{{(.+?)}}/g, '<%= $1 %>');

    }


};
    /**
 * Created by julien.zhang on 2014/9/15.
 *
 * 遍历dom节点，根据指令生成一个编译过的模板渲染函数
 *
 */

function createRender(root) {

    root = root.cloneNode(true);

    //遍历dom节点，解析指令
    (function (node) {

        parser(node);

        var children = $(node).contents();
        var child;
        var i = 0;
        while (child = children.eq(i)[0]) {
            i++;
            arguments.callee(child);
        }

    })(root);

    var _tpl = $(root).html()
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/\b(ic-)(?=href|src|style|class|data|value)/g,'')
        .replace(/\bic-(\w+-)?(checked|disabled|selected|enabled)\s*=\s*"\s*((?:[^"]|\\")+)["]/g,function(m, $1, $2, $3){
            $1 = $1 ? 'ic-'+ $1 : '';
            $3 = $3.replace(/^(?:"|')|(?:"|')$/g,'');
            return ' <% if(?3){ %> ?2 <% } %> '.replace('?3',$3).replace('?2',$1 + $2);
        })
        .replace(/&amp;&amp;/g,'&&');

    //console.log(tpl);

    var tpl = _.template(_tpl);
    tpl._tpl_ = _tpl;
    return tpl;

};
    /**
 * Created by julien.zhang on 2014/9/15.
 */


//内置服务
services.add('recordManager', recordManager);
services.fill('eventManager', eventManager);

//对外接口
root.brick = {
    config: config,
    eventManager: eventManager,
    set: function(k, v){
        return this.config.set(k, v);
    },
    get: function(k){
      return this.config.get(k);
    },
    broadcast: function (e, msg) {
        this.eventManager.fire(e, msg);
        return this;
    },
    on: function (e, fn) {
        this.eventManager.bind(e, fn);
        return this;
    },
    off: function (e, fn) {
        this.eventManager.unbind(e, fn);
        return this;
    },
    fire: function (e, msg) {
        this.eventManager.fire(e, msg);
        return this;
    },
    controllers: controllers,
    services: services,
    directives: directives,
    compile: compile,
    createRender:createRender,
    getTpl: function (name) {
        return this.__tpl[name];
    },
    __tpl: {},
    init: function () {

        //init

    }
};








;
    /**
 * Created by julien.zhang on 2014/10/30.
 * 扩展 jquery
 */
(function ($) {

    $.fn.icCompile = function(){

        if(!this.length) return;

        return this.each(function(i){

            brick.compile(this);

        });
    };

    $.fn.icParseProperty = function (name) {

        if (name === void(0)) return void(0);
        var $ctrl = this.closest('[ic-ctrl]');
        var ctrl = $ctrl.attr('ic-ctrl');
        var namespace = ctrl ? $ctrl.data('ic-ctrl-scope') : window;
        //var namespace = ctrl ? brick.controllers.get(ctrl) : window;

        var chain = name.split('.');

        return (function (root, chain) {

            var k = chain.shift();
            var v = root[k];

            if (!v) return;

            if (chain.length) {
                return arguments.callee(v, chain);
            }

            return v;

        })(namespace, chain);

    };

    $.fn.icParseProperty2 = function(name){
        name = this.attr(name);
        return this.icParseProperty(name);
    };

    $.fn.icTabActive = $.fn.icTabs = function(options){
        var active = options.active;
        active && this.attr('ic-tab-active', active);
        return this;
    };

    $.fn.icAjax = function (options) {
        if(options === void(0)) return this.trigger('ic-ajax');
        options.data && this.data('ic-submit-data', options.data);

        options.disabled !== void(0) && this.attr('ic-ajax-disabled', !!options.disabled);

        return this;
    };

    $.fn.icDialog = function (options) {

        this.show();
        var that = this;
        setTimeout(function () {
            var id = that.attr('ic-dialog');
            if (id !== void(0)) {
                that.trigger('ic-dialog.call', options);
            }
        }, 30);

        return this;
    };

//定时器
    $.fn.icTimer = function () {
        var th = this;
        var count = th.attr('ic-timer-count') * 1;

        var timer = setInterval(function () {
            if (count--) {
                th.text(count);
            } else {
                clearInterval(timer);
                th.trigger('ic-timer.' + 'end');
            }
        }, 1000);

        return this;
    };
    //切换场景
    $.icNextScene = function () {
        var current = $('[ic-scene]').filter('[ic-scene-active=1]');

        if (current.size) current.nextScene();
    };

    $.fn.nextScene = function () {
        var next = this.attr('ic-scene-next');
        if (next) {
            this.hide().removeAttr('ic-scene-active');
            $('[ic-scene=?]'.replace('?', next)).show().attr('ic-scene-active', 1);
        }

        return this;
    };

// 操作提示
    var tipSize=0;
    $.fn.tips = function (parent) {
        ++tipSize;
        var $parent = $(parent || 'body');
        var w = $parent.innerWidth() * 0.4 + 'px';
        var h;
        var top;
        var left;
        var wraper = $('<div class="tipsBox"></div>');

        this.addClass('tips1').css({
            'width': w
        });
        this.appendTo(wraper);
        wraper.appendTo($parent);

        w = this.width()
        h = this.height();
        top = '-' + h / 2 + 'px';
        left = '-' + w / 2 + 'px';
        this.css({
            'top': 40 * tipSize,
            'left': left
        });

        wraper.animate({
            top: 0,
            'opacity': '1'
        }, 500, function () {
            $(this).addClass('animated wobble');
        });

        setTimeout(function () {
            wraper.animate({
                'top': -300,
                'opacity': '0'
            }, 500, function () {
                --tipSize;
                wraper.remove();
            });
        }, 2000 * tipSize);

        return this;
    };

    $.tips = function (massge) {
        $('<div>' + massge + '</div>').tips();
    };

//监听enter键
    $.fn.icEnterPress = function (call) {

        return this.each(function(i){

            call = $.proxy(call, this);

            var fn = function (e) {
                if (e.which == 13) {
                    call(e);
                }
            };

            $(this)
                .on('focus', function () {
                    $(this).keypress(fn);
                })
                .on('blur', function () {
                    $(this).unbind('keypress', fn);
                });
        });

    };

//设置loading
    (function ($) {

        var loading = '<span style="margin:0.2em auto;display:inline-block;text-align:center;" role="_loading_"><svg width="16" height="16" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" version="1.1"><path d="M 150,0 a 150,150 0 0,1 106.066,256.066 l -35.355,-35.355 a -100,-100 0 0,0 -70.711,-170.711 z" fill="#3d7fe6"><animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 150 150" to="360 150 150" begin="0s" dur="1s" fill="freeze" repeatCount="indefinite" /></path></svg></span>';

        if (window.ActiveXObject) {

            loading = 'data:image/gif;base64,R0lGODlhEAAQAMQAAP///+7u7t3d3bu7u6qqqpmZmYiIiHd3d2ZmZlVVVURERDMzMyIiIhEREQARAAAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBwAQACwAAAAAEAAQAAAFdyAkQgGJJOWoQgIjBM8jkKsoPEzgyMGsCjPDw7ADpkQBxRDmSCRetpRA6Rj4kFBkgLC4IlUGhbNQIwXOYYWCXDufzYPDMaoKGBoKb886OjAKdgZAAgQkfCwzAgsDBAUCgl8jAQkHEAVkAoA1AgczlyIDczUDA2UhACH5BAUHABAALAAAAAAPABAAAAVjICSO0IGIATkqIiMKDaGKC8Q49jPMYsE0hQdrlABCGgvT45FKiRKQhWA0mPKGPAgBcTjsspBCAoH4gl+FmXNEUEBVAYHToJAVZK/XWoQQDAgBZioHaX8igigFKYYQVlkCjiMhACH5BAUHABAALAAAAAAQAA8AAAVgICSOUGGQqIiIChMESyo6CdQGdRqUENESI8FAdFgAFwqDISYwPB4CVSMnEhSej+FogNhtHyfRQFmIol5owmEta/fcKITB6y4choMBmk7yGgSAEAJ8JAVDgQFmKUCCZnwhACH5BAUHABAALAAAAAAQABAAAAViICSOYkGe4hFAiSImAwotB+si6Co2QxvjAYHIgBAqDoWCK2Bq6A40iA4yYMggNZKwGFgVCAQZotFwwJIF4QnxaC9IsZNgLtAJDKbraJCGzPVSIgEDXVNXA0JdgH6ChoCKKCEAIfkEBQcAEAAsAAAAABAADgAABUkgJI7QcZComIjPw6bs2kINLB5uW9Bo0gyQx8LkKgVHiccKVdyRlqjFSAApOKOtR810StVeU9RAmLqOxi0qRG3LptikAVQEh4UAACH5BAUHABAALAAAAAAQABAAAAVxICSO0DCQKBQQonGIh5AGB2sYkMHIqYAIN0EDRxoQZIaC6bAoMRSiwMAwCIwCggRkwRMJWKSAomBVCc5lUiGRUBjO6FSBwWggwijBooDCdiFfIlBRAlYBZQ0PWRANaSkED1oQYHgjDA8nM3kPfCmejiEAIfkEBQcAEAAsAAAAABAAEAAABWAgJI6QIJCoOIhFwabsSbiFAotGMEMKgZoB3cBUQIgURpFgmEI0EqjACYXwiYJBGAGBgGIDWsVicbiNEgSsGbKCIMCwA4IBCRgXt8bDACkvYQF6U1OADg8mDlaACQtwJCEAIfkEBQcAEAAsAAABABAADwAABV4gJEKCOAwiMa4Q2qIDwq4wiriBmItCCREHUsIwCgh2q8MiyEKODK7ZbHCoqqSjWGKI1d2kRp+RAWGyHg+DQUEmKliGx4HBKECIMwG61AgssAQPKA19EAxRKz4QCVIhACH5BAUHABAALAAAAAAQABAAAAVjICSOUBCQqHhCgiAOKyqcLVvEZOC2geGiK5NpQBAZCilgAYFMogo/J0lgqEpHgoO2+GIMUL6p4vFojhQNg8rxWLgYBQJCASkwEKLC17hYFJtRIwwBfRAJDk4ObwsidEkrWkkhACH5BAUHABAALAAAAQAQAA8AAAVcICSOUGAGAqmKpjis6vmuqSrUxQyPhDEEtpUOgmgYETCCcrB4OBWwQsGHEhQatVFhB/mNAojFVsQgBhgKpSHRTRxEhGwhoRg0CCXYAkKHHPZCZRAKUERZMAYGMCEAIfkEBQcAEAAsAAABABAADwAABV0gJI4kFJToGAilwKLCST6PUcrB8A70844CXenwILRkIoYyBRk4BQlHo3FIOQmvAEGBMpYSop/IgPBCFpCqIuEsIESHgkgoJxwQAjSzwb1DClwwgQhgAVVMIgVyKCEAIfkECQcAEAAsAAAAABAAEAAABWQgJI5kSQ6NYK7Dw6xr8hCw+ELC85hCIAq3Am0U6JUKjkHJNzIsFAqDqShQHRhY6bKqgvgGCZOSFDhAUiWCYQwJSxGHKqGAE/5EqIHBjOgyRQELCBB7EAQHfySDhGYQdDWGQyUhADtBnuIRQIkiJgMKLQfrIugqNkMb4wGByIAQKg6FgitgaugONIgOMmDIIDWSsBhYFQgEGaLRcMCSBeEJ8WgvSLGTYC7QCQym62iQhsz1UiIBA11TVwNCXYB+goaAiighACH5BAUHABAALAAAAAAQAA4AAAVJICSO0HGQqJiIz8Om7NpCDSweblvQaNIMkMfC5CoFR4nHClXckZaoxUgAKTijrUfNdErVXlPUQJi6jsYtKkRty6bYpAFUBIeFAAAh+QQFBwAQACwAAAAAEAAQAAAFcSAkjtAwkCgUEKJxiIeQBgdrGJDByKmACDdBA0caEGSGgumwKDEUosDAMAiMAoIEZMETCVikgKJgVQnOZVIhkVAYzuhUgcFoIMIowaKAwnYhXyJQUQJWAWUND1kQDWkpBA9aEGB4IwwPJzN5D3wpno4hACH5BAUHABAALAAAAAAQABAAAAVgICSOkCCQqDiIRcGm7Em4hQKLRjBDCoGaAd3AVECIFEaRYJhCNBKowAmF8ImCQRgBgYBiA1rFYnG4jRIErBmygiDAsAOCAQkYF7fGwwApL2EBelNTgA4PJg5WgAkLcCQhACH5BAUHABAALAAAAQAQAA8AAAVeICRCgjgMIjGuENqiA8KuMIq4gZiLQgkRB1LCMAoIdqvDIsg=';
            loading = '<span style="margin:0.2em; auto;display:inline-block;text-align:center;" role="_loading_"><img src="?"></span>'.replace('?', loading);

        }

        $.fn.icSetLoading = $.fn.setLoading = function (option) {

            var _loading = option && option.loading;

            this.icClearLoading();

            return this.each(function(){
                //this.parent().css({position:'relative'});
                var $th = $(this);
                var w = $th.outerWidth();
                var h = $th.outerHeight();
                var offset = $th.offset();
                var top = offset.top;
                var left = offset.left;
                var $loading = $(_loading || loading).css({width: w, height: h, position: 'absolute', top:top, left:left,'z-index':999}).appendTo('body');

                //$loading.find('svg').css({'margin-top':($th.height()-16)/2});

                $th.css({opacity: '0.5'});

                $th.data('_ic-role-loading', $loading);
            });

        };

    })(jQuery);


//清除loading
    $.fn.icClearLoading = $.fn.clearLoading = function () {

        return this.each(function(){
            var $th = $(this);
            var $loading = $th.data('_ic-role-loading');
            $loading && $loading.remove();
            $th.removeData('_ic-role-loading');
            $th.css({opacity: '1'});
        });

    };


})(jQuery);


;

    /**
 * Created by julien.zhang on 2014/12/9.
 */

directives.add('ic-ctrl', function ($elm, attrs) {

    var ctrlName = $elm.attr('ic-ctrl');

    if(ctrlName){
        var $parent = $elm.parent().closest('[ic-ctrl]');
        //var parentName = $parent.size() ? $parent.attr('ic-ctrl') : '';
        controllers.exec(ctrlName, $parent.data('ic-ctrl-scope'), $elm);
        //controllers.exec(ctrlName, controllers.get(parentName), $elm);
    }

});;
    /**
 * Created by julien.zhang on 2014/10/11.
 */

directives.add('ic-event', {
    selfExec: true,
    once: true,
    fn: function () {

        var eventAction = brick.get('event.action');

        var events = 'click,change';

        var targets = events.replace(/(?:^|,)(\w+?)(?=(?:,|$))/g, function (m, $1) {
            var s = '[ic-?]'.replace('?', $1);
            return m.replace($1, s);
        });

        var $doc = $(document);

        events = events.split(',');
        targets = targets.split(',');

        _.forEach(events, function (event, i, list) {
            var target = targets[i];
            if (event == 'click') event = eventAction;
            $doc.on(event, target, _call);
        });


        function _call(e) {
            var th = $(this);
            var type = e.type;
            var fn = th.attr('ic-' + type);
            fn = th.icParseProperty(fn);

            return fn.apply(this, [e]);
        }

    }
});
;

    /**
 * Created by julien.zhang on 2014/11/11.
 *
 * 使ie9及以下版本支持placeholder功能
 */

directives.add('placeholder', function ($elm, attrs) {

    function ltIe(ver) {
        var b = document.createElement('b');
        b.innerHTML = '<!--[if lt IE ' + ver + ']><i></i><![endif]-->';
        return b.getElementsByTagName('i').length === 1
    }

    //如果非ie浏览器或大于ie9,返回
    if (!window.ActiveXObject || !ltIe(10)) return;


    var $th = $elm;
    var placeholder = $th.attr('placeholder');

    if (!placeholder) return;

    var type = $th.attr('type');

    //密码输入框处理
    if (type === 'password') {

        var cla = $th.attr('class');
        var style = $th.attr('style');
        var clone = '<input type="text" class="?" style="%">'.replace('?', cla).replace('%', style);
        clone = $(clone).insertBefore($th.hide()).val(placeholder).css({color: '#CDCDCD'});

        clone.on('focus', function (e) {
            clone.hide();
            $th.show().focus();
        });

        $th.on('blur', function (e) {
            if ($th.val() == '') {
                clone.show();
                $th.hide();
            }
        });

        return;
    }

    //普通文本框处理
    if (type === 'text') {

        $th.val(placeholder).css({color: '#CDCDCD'});

        $th.on('focus', function () {
            $th.val() === placeholder && $th.val('').css({color: ''});
        });

        $th.on('blur', function () {
            if ($th.val() === '') {
                $th.val(placeholder).css({color: '#CDCDCD'});
            }
        });

    }


});;
    /**
 * Created by julien.zhang on 2014/10/11.
 */

directives.add('ic-slider', function ($elm, attr) {

    var th = $elm;

    var direction = th.attr('ic-slider-direction');

    var vw = th.width();
    var vh = th.height();

    th.css({position: 'relative', overflow: 'hidden'});

    var style1 = {width: vw + 'px', height: vh + 'px'};
    if (!direction) {
        style1.float = 'left';
    }

    var items = th.find('[ic-role-slider-item]').css(style1);
    var len = items.size();

    var style2 = direction ? {height: len * vh + 'px'} : { width: len * vw + 'px'};
    style2.position = 'absolute';
    var view = th.find('[ic-role-slider-view]').css(style2);

    var current = 1;

    var currentPagination = th.find('[ic-role-slider-pagination]').first().addClass('active');

    var broadcast = function () {
        th.trigger('ic-slider.change', items.eq(current - 1));
    }

    broadcast();

    var onPagination = function () {
        broadcast();
    };

    if (currentPagination) {
        onPagination = function () {
            currentPagination && currentPagination.removeClass('active');
            currentPagination = th.find('[ic-role-slider-pagination=' + current + ']').addClass('active');
            broadcast();
        }
    }


    var prev = direction ?
        function (e) {

            if (current <= 1) {
                current = len;
                view.animate({
                    top: (-len + 1) * vh
                }, 300, onPagination);
            } else {
                view.animate({
                    top: (2 - current) * vh
                }, 300, function () {
                    current -= 1;
                    onPagination();
                });
            }

            return false;
        } :
        function (e) {

            if (current <= 1) {
                current = len;
                view.animate({
                    left: (-len + 1) * vw
                }, 500, onPagination);
            } else {
                view.animate({
                    left: (2 - current) * vw
                }, 500, function () {
                    current -= 1;
                    onPagination();
                });
            }

            return false;
        };

    var next = direction ?
        function (e) {

            if (current >= len) {
                current = 1;
                view.animate({
                    top: 0
                }, 300, onPagination);
            } else {
                view.animate({
                    top: -current * vh
                }, 300, function () {
                    current += 1;
                    onPagination();
                });
            }

            return false;
        } :
        function (e) {

            if (current >= len) {
                current = 1;
                view.animate({
                    left: 0
                }, 500, onPagination);
            } else {
                view.animate({
                    left: -current * vw
                }, 500, function () {
                    current += 1;
                    onPagination();
                });
            }

            return false;
        }

    var interval = th.attr('ic-slider-interval');
    var timer;

    if (interval) {

        timer = setInterval(next, interval);

        th.hover(function (e) {
            clearInterval(timer);
        }, function (e) {
            timer = setInterval(next, interval);
        });
    }

    /* event */
    th.delegate('[ic-role-slider-prev]', 'click', prev);

    th.delegate('[ic-role-slider-next]', 'click', next);

    th.delegate('[ic-role-slider-pagination]', 'click', function (e) {
        currentPagination && currentPagination.removeClass('active');
        var th = $(this).addClass('active');
        var pagination = th.attr('ic-role-slider-pagination');
        current = pagination - 1;
        next();
    });


});
;
    /**
 * Created by julien.zhang on 2014/10/11.
 */

directives.reg('ic-tabs', function ($elm, attrs) {

    var eventAction = brick.get('event.action');

        var th = $elm;
        var name = th.attr('ic-tabs');
        var disabled = th.attr('ic-tab-disabled');
        var tabSelect = th.attr('ic-tab-select');
        var conSelect = th.attr('ic-con-select');
        var activeTab = th.attr('ic-tab-active');
        var activeCon;
        var $tabSelect;

        if (tabSelect) {
            $tabSelect = th.find(tabSelect).each(function (i) {
                var th = $(this);
                th.attr('ic-role-tab', i);
            });
        }else{
            $tabSelect = $elm.find('[ic-role-tab]');
        }

        var tabc = $('[ic-role-tabc=' + name + ']');

        if (tabc) {
            tabc.find(conSelect || '[ic-role-con]').each(function (i) {
                i = $tabSelect.eq(i).attr('ic-role-tab');
                $(this).attr('ic-role-con', i);
            });
        }

        var interval = th.attr('ic-tabs-interval');
        var timer;

        if (interval) {

        }

        th.on(eventAction, '[ic-role-tab]:not([ic-tab-disabled=1])', tabc.length ? call_1 : call_2);


        function call_1(e) {
            call_2(e, this);

            var con = activeTab.attr('ic-role-tab');
            activeCon && activeCon.hide();
            activeCon = tabc.find('[ic-role-con=' + con + ']').show();
        }

        function call_2(e, that) {
            activeTab && activeTab.removeClass('active');
            activeTab = $(that || this).addClass('active');
            th.trigger('ic-tabs.change', {activeTab: activeTab, target:activeTab[0], val: activeTab.attr('ic-tab-val'), index:activeTab.index()});
        }

        //fire
        if (activeTab) {
            activeTab = th.find('[ic-role-tab=?]'.replace('?', activeTab));
        } else {
            activeTab = th.find('[ic-role-tab]:not([ic-tab-disabled=1])').first();
        }

        activeTab.trigger(eventAction);

        //var activeCon = activeTab.addClass('active').attr('ic-role-tab');

        //activeCon = tabc.length && tabc.find('[ic-role-con]').hide().filter('[ic-role-con=' + activeCon + ']').show();


});

;
    /**
 * Created by julien.zhang on 2014/10/15.
 */

directives.add('ic-dropdown', function ($elm, attrs) {


    var th = $elm;

    th.css({position: 'relative'});

    var h = th.height();

    var menu = th.find('[ic-role-dropdown-menu]').css({position: 'absolute', top: h + 'px'});

    var timer;
    if (menu.size()) {
        th.hover(function (e) {
            timer = setTimeout(function () {
                menu.show(300);
            }, 200);
        }, function () {
            clearTimeout(timer);
            menu.slideUp(200);
        });
    }

    var con = th.find('[ic-role-dropdown-con]').css({position: 'absolute', overflow: 'hidden'});

    if (con.size()) {

        var ch = con.height();

        //th.css({overflow:'hidden',height:h+'px'});

        var flag = 1;

        th.find('[ic-role-dropdown-toggle]').click(function (e) {
            if (flag) {
                //con.slideDown();
                con.css({height: 'auto'});
                flag = 0;
            } else {
                con.css({height: ch + 'px'});
                flag = 1;
            }
        });


    }


});
;
    /**
 * Created by julien.zhang on 2014/10/20.
 */

directives.add('ic-pagination', function ($elm, attrs) {

    var th = $elm;
    var namespace = th.attr('ic-pagination');
    var rows = $elm.attr('ic-pagination-rows') * 1 || 10;
    var onChangeCall = th.attr('ic-pagination-on-change');
    var total = $elm.attr('ic-pagination-total') * 1;
    var step = $elm.attr('ic-pagination-step') * 1 || 10;
    var current = $elm.attr('ic-pagination-current') || 1;
    var ellipsis = $elm.find('[ic-role-pagination-ellipsis]')[0].outerHTML;
    var placeholder = /\{\{\}\}/g;
    var $tpl = $elm.prev('[ic-tpl=?]'.replace('?', namespace));
    var tplf;

    var pool;
    var onchange;
    var source = $elm.attr('ic-source-ajax');

    if (source) {
        /*$.ajax({
         url:source
         }).done(function(data){
         var html = brick._tplfs[namespace]({model:data});
         $tpl.html(html);
         });*/
    } else {
        source = $elm.attr('ic-source');
        if (source) {
            pool = $elm.icParseProperty(source);
            total = Math.ceil(pool.length / rows);
            onchange = function (page) {
                --page;
                var start = page * rows - 1 < 0 ? 0 : page * rows;
                var end = start + rows;
                var _list = pool.slice(start, end);
                var list = [];
                var item;
                for (; item = _list.shift(); start++) {
                    list[start] = item;
                }
                var html = brick.getTpl(namespace)({model: list});
                $tpl.html(html).show();
            };
        }else{
            pool = $('[ic-role-pagination-page=?]'.replace('?', namespace)).children();
            if(pool.length){
                total = Math.ceil(pool.length / rows);
                onchange = function (page) {
                    --page;
                    var start = page * rows - 1 < 0 ? 0 : page * rows;
                    var end = start + rows;
                    pool.hide();
                    pool.slice(start, end).show();
                };
            }
        }
    }

    var prev = th.find('[ic-role-pagination-prev]').on('click', function (e) {
        if (current < 2) return;
        --current;
        createNums();
    });
    var next = th.find('[ic-role-pagination-next]').on('click', function (e) {
        if (current >= total) return;
        ++current;
        createNums();
    });
    var num = th.find('[ic-role-pagination-num]');
    var html = num[0].outerHTML;

    function createNums() {

        var j = Math.floor(step / 2);
        var k;
        var r = [];

        j = current - j;

        var i = j = j < 1 ? 1 : j;
        k = j + step - 1;
        k = k >= total ? total : k;
        i = j = k + step >= total ? k - step < 1 ? 1 : k - step : i;

        for (; j <= k; j++) {
            r.push(html.replace(placeholder, j));
        }

        if (i > 1) {
            r.unshift(ellipsis);
            r.unshift(html.replace(placeholder, 1));
        }

        if (total - k > 2) {
            r.push(ellipsis);
            r.push(html.replace(placeholder, total));
        }

        current == 1 ? prev.addClass('disabled') : prev.removeClass('disabled');
        current == total ? next.addClass('disabled') : next.removeClass('disabled');
        prev.siblings().not(next).remove();

        $(r.join('')).insertAfter(prev).filter('[ic-role-pagination-num=' + current + ']').addClass('active');

        onchange && onchange(current);
        $elm.trigger('ic-pagination.change', current);

    }


    setTimeout(createNums, 30);

    th.on('click', '[ic-role-pagination-num]', function (e) {

        var num = $(this).attr('ic-role-pagination-num') * 1;
        if (current == num) return;
        current = num * 1;
        createNums();

    });


});;
    /**
 * Created by julien.zhang on 2014/10/28.
 */

directives.add('ic-scene', function ($elm, attr) {

    var scenes = $('[ic-scene]');
    var active = $('[ic-scene-active]');
    active = active.size() ? active : scenes.first();

    active.show();
    scenes.not(active).hide();

    scenes.each(function (i) {

        var th = $(this);

        th.on('click', '[ic-role-scene-next]', function(e){
            var next = $(this).attr('ic-role-scene-next');
            active && active.hide();
            active = $('[ic-scene=' + next + ']').show();

        });


    });


});

;
    /**
 * Created by julien.zhang on 2014/10/28.
 */

directives.add('ic-timer', function ($elm, attr) {

    return;

    var th = $elm;
    var count = th.attr('ic-timer-count') * 1;

    var timer = setInterval(function () {
        if (count--) {
            th.text(count);
        } else {
            clearInterval(timer);
            th.trigger('ic-timer.' + 'end');
        }
    }, 1000);


});

;
    /**
 * Created by julien.zhang on 2014/10/29.
 */


directives.add('ic-dialog', function ($elm, attrs) {

    var html = "<div class=\"t\" style=\"position:fixed; z-index: 100000; left:0; top:0; width:100%; height: 100%; overflow: auto; background: rgba(0,34,89,0.2);\"></div>";

    //只执行一次绑定
    if (!arguments.callee._run) {

        arguments.callee._run = 1;

        $(document).on('click', '[ic-dialog-href]', function (e) {
            var target = $(this).attr('ic-dialog-href');
            $('[ic-dialog=?]'.replace('?', target)).icDialog();
            return false;
        });

    }


    var $dialogContainer = $(html).appendTo('body').hide();

    var id = $elm.attr('ic-dialog');

    $elm.appendTo($dialogContainer);

    //处理js调用
    $elm.on('ic-dialog.call', function (e, param) {

        if(param === void(0)) return onShow(e);
        if (param === 'hide' || param == false) return onClose(e);
        onShow(e);
    });

    $elm.on('click', '[ic-role-dialog-confirm]', function (e) {
        onClose(e, 1);
    });


    $elm.on('click', '[ic-role-dialog-cancel], [ic-role-dialog-close]', function (e) {
        onClose(e, 0);
    });


    function onShow(e) {
        $dialogContainer.show();
        var width = $elm.width();
        $elm.css('margin-left', -width / 2);
        $elm.show();
        $elm.trigger('ic-dialog.show');
    }

    function onClose(e, type) {
        $dialogContainer.hide();
        $elm.hide();
        $elm.trigger('ic-dialog.close', type);
    }




});

;
    /**
 * Created by julien.zhang on 2014/11/5.
 */

directives.add('ic-drag-view', function ($elm, attrs) {

    var $document = $(document);

    var startX = 0, startY = 0, x = 0, y = 0;
    var vw, vh;
    var w, h;

    $document.on('click', '[ic-role-drag-key]', function (e) {

        var th = $(this);
        var drag = th.attr('ic-role-drag-key');
        var d = th.attr('ic-drag-direction');
        var m = 140;
        $elm = $('[ic-role-drag-handle=?]'.replace('?', drag)).css({position: 'relative'});
        w = $elm.width();
        h = $elm.height();
        vw = $elm.closest('[ic-drag-view]').css({position: 'relative'}).width();
        vh = $elm.closest('[ic-drag-view]').width();
        var position = $elm.position();
        x = position.left;
        y = position.top;

        if (d === 'left') {
            x -= m;
            x = x < -(w - vw) ? -(w - vw) : x;
            $elm.animate({left: x}, 500);
        }

        if (d === 'right') {
            x += m;
            x = x >= 0 ? 0 : x;
            $elm.animate({left: x}, 500);
        }

    });


    $document.on('mousedown', '[ic-role-drag-handle]', function (e) {

        e.preventDefault();

        startX = e.pageX;
        startY = e.pageY;

        $elm = $(this).css({position: 'relative'});

        vw = $elm.closest('[ic-drag-view]').width();
        vh = $elm.closest('[ic-drag-view]').height();

        var position = $elm.position();
        x = position.left;
        y = position.top;

        w = $elm.width();
        h = $elm.height();

        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);

        return false;

    });


    function mousemove(e) {

        var moveX = e.pageX - startX;
        var moveY = e.pageY - startY;

        startX = e.pageX;
        startY = e.pageY;

        x += moveX;
        y += moveY;

        x = x < -(w - vw) ? -(w - vw) : x;
        x = x >= 0 ? 0 : x;

        y = y < -(h - vh) ? -(h - vh) : y;
        y = y >= 0 ? 0 : y;

        $elm.css({
            top: y + 'px',
            left: x + 'px'
        });

        return false;
    }

    function mouseup() {
        $document.unbind('mousemove', mousemove);
        $document.unbind('mouseup', mouseup);
    }


});;
    /**
 * Created by julien.zhang on 2014/10/29.
 */


directives.add('ic-form', function ($elm, attrs) {


    /**
     * 要验证的字段 ic-role-field
     * 验证规则  ic-field-rule
     * 验证失败提示 ic-role-field-err-tip
     * 验证成功提示 ic-role-field-ok-tip
     */

    var presetRule = {
        id: /[\w_]{4,18}/,
        required: /.+/,
        phone: /^1[0-9][0-9]\d{8}$/,
        email: /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/,
        password: /(?:[\w]|[!@#$%^&*]){8,}/,
        desc:/.{4,32}/,
        plate:/^[\u4e00-\u9fa5]{1}[A-Z]{1}[\s-]?[A-Z_0-9]{5}$/i
    };


    /**
     * 对ic-field-rule属性定义的字段校验规则编译处理
     * 校验规则分为3类：
     * 1：预设的规则表示符，映射到相应的正则表达式，如: 'phone';
     * 2：用户自定义的正则表达式, 如: /\d3/;
     * 3：用户自定义函数 如: equal(val); 传入校验字段校验时的字段值
     *
     * @param rule
     * @param $elm
     * @returns {XML|string|void|*}
     */
    function compileRule(rule, $elm) {

        //替换预设的规则标识符
        for (var i in presetRule) {
            rule = rule.replace(i, presetRule[i]);
        }

        var call = '.test("?")';
        //rule = rule.replace(/(\&\&|\|\|)(?=(?:\/|\w))/g, call+'$1');
        //rule += call;

        rule = rule.replace(/\/[igm]{0,3}(?=(?:\|\||\&\&|$))/g, function (m) {
            return m + call;
        });

        return rule;
    }

    //校验函数
    function _verify(val, rules, tips, $field) {

        tips = tips || 'error';

        var fns = {};

        rules = rules.replace(/(?:^|\|\||\&\&)(\w+?)\(\)(?=(?:\|\||\&\&|$))/g, function (m, $1) {
            var fn = $field.icParseProperty($1);
            fns[$1] = fn;
            return m.replace($1, 'fns.' + $1).replace('()', '("?")');
        });

        var script = rules.replace(/\.\w+\("\?"\)/g, function (m) {

            return m.replace('?', val);
        });

        //console.log(script)

        try {
            if (eval(script)) {
                return false;
            } else {
                return tips;
            }
        } catch (e) {
            console.error(e);
        }

    }



    //只执行一次绑定
    if (!arguments.callee._run) {

        arguments.callee._run = 1;
        /**
         * 对外js调用接口
         */
        $.fn.icVerify = function () {

            var isSubmit = this.attr('ic-role-submit');

            if (isSubmit) {
                this.trigger('ic-form.' + isSubmit);
                return this.attr('ic-verification');
            }

            var isField = this.attr('ic-role-field');

            if (isField) {
                this.trigger('change');
                return this.attr('ic-verification');
            }

            return false;
        };
    }


    // 执行指令
    var namespace = $elm.attr('ic-form');
    var $fields = $elm.find('[ic-role-field]');
    var $submit = $elm.find('[ic-role-submit]');
    var $loading = $elm.find('[ic-role-loading]');

    var fields = {};

    //处理js调用
    $submit.on('ic-form.' + namespace, function (e, field) {

        fields = {};

        $fields.filter(':not("[ic-field-rule]")').each(function (i) {
            var $th = $(this);
            var name = $th.attr('ic-role-field');
            var submitName = $th.attr('name') || name;
            fields[submitName] = $th.val();
        });

        //显示并且有验证规则
        $fields.filter(':visible').filter('[ic-field-rule]').each(function (i) {
            $(this).change();
        });

        for (var i in fields) {
            if (fields[i] === false) {
                $submit.removeAttr('ic-verification');
                return false;
            }
        }

        return $submit.attr('ic-verification', true);

    });


    //提交
    var method = $submit.attr('ic-submit-method') || 'post';
    var action = $submit.attr('ic-submit-action');
    var done = $submit.attr('ic-submit-on-done');
    var always = $submit.attr('ic-submit-on-always');
    var failed = $submit.attr('ic-submit-on-failed');
    var before = $submit.attr('ic-submit-before');
    var dataType = $submit.attr('ic-submit-data-type') || 'json';

    var submitType = (function () {
        //函数调用
        if (/[\w_.]+\(\)\;?$/i.test(action)) {
            action = $submit.icParseProperty(action.replace(/[();]/g, ''));
            return 1;
        }
        //跨域提交
        var match = action.match(/https?:\/\/[\w.:]+/i);
        //console.log(match, location.origin);
        if (match && match[0] !== location.origin) {
            //_iframe = $('<iframe name="loginIframe" href="#"></iframe>').insertAfter($submit);
            return 2;
        }
        //普通提交
        return 3;
    })();


    always = $submit.icParseProperty(always) || function () {
    };
    done = $submit.icParseProperty(done) || function () {
    };
    failed = $submit.icParseProperty(failed) || function (msg) {
        console.log(msg)
    };
    before = $submit.icParseProperty(before) || function () {
    };

    var _iframe;
    var _form;


    $submit.on('mousedown', function (e) {

        if (!$submit.icVerify()) return $elm.trigger('ic-form.error');

        //函数调用
        if (submitType === 1) {
            return action.apply($submit[0], [fields]);
        }

        var data = before.apply($submit[0], [fields]);
        if (data === false) return;

        if ($loading.size()) {
            $submit.hide();
            $loading.show();
        } else {
            $submit.setLoading();
        }


        //同域提交
        if (submitType === 3) {
            return $.ajax({
                url: action,
                type: method,
                dataType: dataType,
                data: data || fields
            }).done(
                function (data) {
                    done(data);
                }
            ).fail(failed)
                .always(function () {
                    $submit.show();
                    $loading.hide();
                    $submit.clearLoading();
                    always();
                });
        }

        //跨域提交
        if (submitType === 2) {


        }

    });


    $fields.icEnterPress(function () {
        $submit.trigger('mousedown');
    });

    $fields.each(function (i) {

        var $th = $(this);
        var name = $th.attr('ic-role-field');
        var submitName = $th.attr('name') || name;
        var rules = $th.attr('ic-field-rule');

        if (!rules) return;
        if ($th.attr('type') === 'hidden') return;

        var errTips = $th.attr('ic-field-err-tip');
        var fire = $th.attr('ic-field-verify-fire');
        var $errTip = $elm.find('[ic-role-field-err-tip="?"]'.replace('?', name));
        var foucsTip = $errTip.text();

        rules = compileRule(rules, $elm);

        $th.on('change', function (e) {

            var val = $th.val();
            var tip;

            if (tip = _verify(val, rules, errTips, $th)) {
                //验证失败
                $errTip.css({'visibility': 'visible'}).addClass('error').text(tip);
                $th.removeAttr('ic-verification');
                fields[name] = false;
                fire && $th.trigger('ic-form.' + namespace + '.' + name + '.verify', 0);
            } else {
                //验证通过
                $errTip.css({'visibility': 'hidden'}).removeClass('error');
                $th.attr('ic-verification', 1);
                fields[submitName] = val;
                fire && $th.trigger('ic-form.' + namespace + '.' + name + '.verify', 1);

            }

        });


        $th.on('focus', function () {
            $errTip.text(foucsTip);
        });

    });


});

;
    /**
 * Created by julien.zhang on 2014/10/31.
 */


directives.add('ic-ajax', {
        selfExec: true,
        once: true,
        fn: function () {

            //只执行一次绑定
            if (arguments.callee._run_) return;
            arguments.callee._run_ = 1;

            var $doc = $(document);
            $doc.on('click', '[ic-ajax]', _call);
            $doc.on('ic-ajax', '[ic-ajax]', _call);

            function _call(e) {

                var that = this;
                var $elm = $(this);
                var namespace = $elm.attr('ic-ajax');

                var $loading = $('[ic-role-loading=?]'.replace('?', namespace || +(new Date)));

                //提交
                var url = $elm.attr('ic-submit-action');
                var dataType = $elm.attr('ic-submit-data-type') || 'json';
                var method = $elm.attr('ic-submit-method') || 'post';
                var done = $elm.attr('ic-submit-on-done');
                var always = $elm.attr('ic-submit-on-always');
                var failed = $elm.attr('ic-submit-on-failed');
                var before = $elm.attr('ic-submit-before');

                always = $elm.icParseProperty(always) || function () {
                    //console.log('always is undefined;')
                };
                done = $elm.icParseProperty(done) || function () {
                    //console.info('done is undefined;')
                };
                failed = $elm.icParseProperty(failed) || function (msg) {
                    //console.info('failed is undefined;')
                };
                before = $elm.icParseProperty(before) || function () {
                    //console.info('before is undefined;')
                };

                if (before.apply(that) === false) return;
                if ($elm.attr('ic-ajax-disabled') === 'true') return;

                var data = $elm.data('ic-submit-data') || $elm.attr('ic-submit-data');

                $loading.size() ? $loading.show() && $elm.hide() : $elm.setLoading();

                $.ajax({
                    url: url,
                    type: method,
                    dataType: dataType,
                    data: data
                }).done(function (data) {
                        $elm.clearLoading() && $loading.hide() && $elm.show();
                        done.apply(that, [data]);
                    }
                ).fail(function (msg) {
                        $elm.clearLoading() && $loading.hide() && $elm.show();
                        failed.apply(that, [msg]);
                    }
                ).always(function () {
                        $elm.clearLoading() && $loading.hide() && $elm.show();
                        always.apply(that);
                        $elm.removeData('ic-submit-data');
                    });
            }


        }
    }
);

;
    /**
 * Created by julien.zhang on 2014/10/11.
 */

directives.add('ic-tpl', {
    selfExec: true,
    once: true,
    fn:function ($elm) {

        //只执行一次
        if (!arguments.callee._run || $elm) {

            arguments.callee._run = 1;

            ($elm || $('[ic-tpl]')).each(function (i) {

                var th = $(this);

                var name = th.attr('ic-tpl');
                th.attr('ic-tpl-name', name);

//        var ctrl = th.closest('[ic-ctrl]').attr('ic-ctrl');
//        var scope = brick.controllers.get(ctrl);

                //console.log(ctrl, scope);

                //ie7下模板渲染会报错，有时间fix;
                //try {
                var compiled = createRender(this);
//        } catch (e) {
//            console.log('+_+ :)', e);
//        }

                var __tpl = brick.__tpl = brick.__tpl || {};
                __tpl[name] = compiled;

            });

        }

    }
});
;
    /**
 *
 * Created by julien.zhang on 2014/11/13.
 *
 * 定义输入提示指令
 *
 */

directives.add('ic-type-ahead', function ($elm, attrs) {

    var $doc = $('body');

    var namespace = $elm.attr('ic-type-ahead');
    var onTypeComplete = $elm.attr('ic-on-type-complete');
    onTypeComplete = $elm.icParseProperty(onTypeComplete);
    var source = $elm.attr('ic-source-ajax');

    var offset = $elm.offset();
    var left = offset.left;
    var top = offset.top;
    var w = $elm.outerWidth();
    var h = $elm.outerHeight();

    var $selectList = $('[ic-role-list=?]'.replace('?', namespace));
    var tplf = brick.getTpl($selectList.attr('ic-tpl'));

    $selectList.appendTo($doc).css({top: top + h, left: left, 'min-width': w});

    var _pool;
    var pool;
    var ajax;
    var queryStr;
    var query;
    var keydownActive = 0;
    var keydownList;

    var done = function (data) {
        if (!data) return;
        if (!data.length) return $selectList.hide();
        pool = data;
        var html = tplf({model: data}); //ie7模板函数会报错，有时间fix;
        $selectList.show().html(html);
    };

    if (source) {
        query = function (queryStr) {
            ajax = $.ajax({
                dataType: 'json',
                type: 'post',
                url: source,
                data: {query: queryStr}
            }).done(done);
        }
    } else {
        source = $elm.attr('ic-source');
        _pool = $elm.icParseProperty(source);
        query = function (queryStr) {
            var reg = new RegExp(queryStr, 'img');
            var result = _.filter(_pool, function (item, i, list) {
                if (_.isObject(item)) {
                    var result = _.filter(item, function (item) {
                        return reg.test(item);
                    });
                    return result.length;
                } else {
                    return reg.test(item);
                }
            });

            done(result);
        };

    }

//////////////////////////////////
    //event
    ////////////////////////////////////

    $elm.on('focus', function (e) {
        var offset = $elm.offset();
        var left = offset.left;
        var top = offset.top;
        $selectList.css({top: top + h + 1, left: left});

    }).on('keyup', function (e) {

        var val = $elm.val();
        if (!val) return $selectList.hide();
        if (val == queryStr) return;

        queryStr = val;

        //取消上个请求
        ajax && ajax.abort();

        //新请求
        query(queryStr);

    }).on('keydown', function (e) {

        var keyCode = e.keyCode;
        if (!(keyCode == 38 || keyCode == 40 || keyCode == 13)) {
            keydownActive = 0;
            return
        }

        var list = $selectList.find('[ic-role-type-item]');
        if (!list.length) return;
        var max = list.length - 1;

        if (e.keyCode == 38) {
            keydownActive = --keydownActive < 0 ? max : keydownActive;
            list.eq(keydownActive).addClass('active').siblings().removeClass('active');
            return;
        }

        if (e.keyCode == 40) {
            keydownActive = ++keydownActive > max ? 0 : keydownActive;
            list.eq(keydownActive).addClass('active').siblings().removeClass('active');
            return;
        }

        if (e.keyCode == 13) {
            list.eq(keydownActive).trigger('mousedown');
            $elm.blur();
        }

    }).on('blur', function (e) {
        $selectList.fadeOut(function () {
            $selectList.hide();
        });
    });


    $selectList.on('mousedown', '[ic-role-type-item]', function (e) {
        var index = $(this).index();
        var item = pool[index];
        var val = $(this).attr('ic-role-type-item');
        $elm.val(val);
        $elm.trigger('type.complete', item);
        onTypeComplete && onTypeComplete.apply($elm[0], [e,item])
    });


});;


    $(function () {

        setTimeout(function () {

            console.log('brick start');

            //
            directives.init();

            //优先解析模板
            //directives.exec('ic-tpl');
            //directives.exec('ic-event');
            //directives.exec('ic-ajax');

            (function (node) {

                var $elm = $(node);

                compile(node);

                var children = $elm.children();
                var child;
                var i = 0;
                while (child = children.eq(i)[0]) {
                    i++;
                    arguments.callee(child);
                }

            })(document.body);

            controllers.init();

        }, 30);

    });

})(window);
