/** 
 * brick - v0.1.0 
 * modified: 2014-10-11 13:49:14
 */

;(function( root, undefined ){ 

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

        }


    };

})();
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

        render: function(){
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
            _ctrls[name] = {fn:ctrl, scope:scope, depend:depend, service:conf.service};
        },

        /*
         * 初始化控制器
         */
        init: function(name){
            var ctrls = _ctrls;
            var ctrl;
            var depend;
            var service;
            for(var i in ctrls){
                ctrl = ctrls[i];
                depend = services.get(ctrl.depend) || [];
                if(depend.constructor !== Array){
                    depend = [depend];
                }
                depend.unshift(ctrl.scope);
                service = ctrl.fn.apply(null, depend);

                if(ctrl.service){
                    services.fill(i, service);
                }

            }
        }
    };

})();
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
            return info.serve.apply(null, depend || []);
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

})();
var directives = (function(){

    var _store = {};

    return {

        add: function(name, definition){

        }

    };

})();
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
        k: 'id',

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

            if (!arguments.length) {

                for (var i in pool) {

                    r.push( $.extend(true, {}, pool[i]) );

                }

                return r;
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

                this.fire('change.' + id, {change: record});
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

                this.fire('remove.' + id, {remove: record});

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
            var pool = this.get();
            var prefix = this.eventPrefix ? this.eventPrefix + '.' : '';

            msg = $.extend({pool: pool}, msg || {});

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

function parser(node) {


    if (node.nodeType == 1) {

        var elm = $(node);
        var attrs = node.attributes;

        var directives = [];

        var priority = {
            'skip': -100,
            'init': -10,
            'for': 0,
            'for-init': 10,
            'if': 100,
            'if-init': 110,
            'else': 100,
            'bind': 1000
        };


        for (var i = 0, attr, name, value, l = attrs.length; i < l; i++) {

            attr = attrs[i];

            name = attr.name;
            value = attr.value;

            if (/^ic-(init|for|if|else|bind|skip)/.test(name)) {
                directives.push([name, value]);
                continue;
            }

            try{
                //typeof value === 'string' && elm.attr(name, value.replace(/{{(.+?)}}/g, '<%= $1 %>'));
            }catch(e){
                _cc(e);
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
                elm.before('\r\n<% ' + value + ' %>\r\n');
                continue;
            }

            if (/-for$/.test(name)) {
                elm.before('<% for(' + value + '){ %>\r\n');
                elm.after('\r\n<% } %>');
                continue;
            }

            if (/-if$/.test(name)) {
                elm.before('<% if(' + value + '){ %>\r\n');
                elm.after('\r\n<% } %>');
                continue;
            }

            if (/-else$/.test(name)) {
                elm.before('<% else{ %>\r\n');
                elm.after('\r\n<% } %>');
                continue;
            }

            if (/-bind$/.test(name)) {
                elm.html('\r\n<%= ' + value + ' %>\r\n');
                continue;
            }

        }

        return;

    }

    if (node.nodeType == 3) {

        var text = node.nodeValue;

        node.nodeValue = text.replace(/{{(.+?)}}/g, '<%= $1 %>');

    }


}
function createRender(root) {

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

    var tmpl = $(root).html().replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\b(ic-)(?=href|src|style)/g,'');

    //_cc(tmpl);

    window.console && console.log(tmpl);

    return _.template(tmpl);

}
//内置服务
services.add('recordManager', recordManager);

//对外接口
root.brick = {
    config: config,
    eventManager: eventManager,
    controllers: controllers,
    services: services,
    directives: directives,
    init: function () {

        this.controllers.init();

        /////////////////////////////////////////////////////////////////////

        $('[ic-ctrl]').each(function (i, e) {

            var root = $(e);

            var name = root.attr('ic-ctrl');

            var scope = brick.controllers.get(name);


            if (!scope) throw 'not find controller ' + name;


            scope.domNode = root;

            scope.tmplFn = createRender(e);

            scope.render();

        });

        /////////////////////////////////////////////////////////////////////

    }
};


root._cc = ( window.console && function () {

        try {
            console.log.apply(console, arguments);
        } catch (e) {
        }

} ) || function () {
};



}( window ));