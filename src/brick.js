/**
 * Created by Julien on 2014/6/30.
 *
 * https://github.com/Julienedies/brick.git
 *
 * 借鉴angularJs的开发思想，通过模块化开发，依赖注入，事件系统，帮助组织，分层，结构化js代码。
 *
 * 定义模型对象，UI组件，控制器对象的原型；
 *
 * 定义管理器对象，用于管理模型对象，UI组件，控制器对象；
 *
 * 定义工具函数；
 *
 * 模型(model)对象：管理纯js数据，不应涉及任何dom操作；
 *
 * 控制器(ctrl)对象: 通常一个控制器完成当前页面一个特定功能，管理UI层交互，衔接Model层与UI层，修改模型对象及更新dom；
 *
 */

(function(root){


    /*
     * 事件管理器
     */
    var eventManager = (function(){

        var _events = {};

        return {

            /**
             * 订阅一个事件监听
             * @param e {String} 事件名
             * @param f {Function} 回调函数
             * @param context {Object} 调用watch方法的scope
             */
            bind: function(e, f, context){

                var handle = {f:f};

                var event = this._getNamespace(e);

                if(context){
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
            unbind: function(e, f){

                var event = this._getNamespace(e);
                var callback = event && event._callback;
                var handle;

                if(callback){

                    if(!f){
                        delete event._callback;
                        return;
                    }

                    for(var i= 0, len = callback.length; i<len; i++){

                        handle = callback[i];

                        if(f === handle.f || f.toString() === handle.f.toString()){
                            callback.splice(i,1);
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
            fire: function(e, msg, that){

                var namespace = e.split(/\.|\:/);

                var prefix = namespace.shift();

                var events = [e];

                (function(arr, pre){

                    if(!arr.length) return;

                    pre = pre ? pre +   '.' : '';

                    for(var i = 0, len = arr.length; i < len; i++){

                        var arr1 = arr.slice();
                        arr1.splice(0,i+1);
                        var event = pre + '*' + (arr1.length ? '.' + arr1.join('.') : '');
                        events.push(event);

                    }

                    pre += arr.shift();

                    arguments.callee(arr, pre);

                })(namespace.slice(), prefix);


                for(var _e; _e = events.shift() ; ){

                    this._fire(_e, msg, that);

                }

            },

            _fire: function(e, msg, that){

                var event = this._getNamespace(e);
                var callback = event && event._callback;
                var handle;
                var context;
                var f;

                if(callback){

                    // _cc('fire=> ', e, msg);

                    for(var i= 0, len = callback.length; i<len; i++){

                        handle = callback[i];
                        context = handle.context || {};
                        f = handle.f;

                        if(f.constructor === Function){
                            f.apply(context, [{eventName:e, source:that}, msg]);
                        }

                    }

                }

            },

            _getNamespace: function(e){

                return _events[e] = _events[e] || {};

                var namespace = e.split('.');

                return (function(k, _events){

                    var i = k.shift();
                    var o = _events[i] = _events[i] || {};

                    if(k.length){
                        return arguments.callee(k, o);
                    }

                    return o;

                })(namespace, _events);

            }


        };

    })();


    /*
     * 控制器管理器
     */
    var controllers = (function(){

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

            // watch方法的简写方式
            on: this.watch

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

    /*
     * 服务管理器 （任意类型的数据，模型对象，UI组件都可以做为服务存在；通常是单例对象）
     */
    var services = (function(){

        var services = {};
        var registry = {};

        return {
            _look: function(){
                console.log(registry);
            },
            /**
             * 注册服务
             * @param name {String}    服务ID
             * @param serve {Function} 服务的工厂函数
             * @param depend {Array}   可选，依赖的其它服务
             */
            add: function(name, serve, depend){
                registry[name] = {depend:depend, serve: serve};
            },
            /*
             * 实例化一个服务
             */
            create: function(name){
                var that = this;
                var info = registry[name];

                if(!info) return;

                var depend = info.depend;
                if(depend){
                    depend = that.get(depend);
                }
                return info.serve.apply(null, depend || []);
            },

            /**
             * 直接注册一个已经实例化的服务
             * @param name {String} 服务ID
             * @param service {*}   任意数据对象
             */
            fill: function(name, service){
                services[name] = service;
            },

            /**
             * 获取一个服务实例
             * @param name {String} 服务器ID
             * @return 服务 {*}  任意类型，取决于当初注册时的服务对象
             */
            get: function(name){
                var that = this;
                if(!name) return;

                //外部get
                if(typeof name === 'string') {
                    return services[name] = services[name] || that.create(name);
                }

                //内部get
                if(name.constructor === Array){

                    name = name.slice();

                    for(var i = 0, v, len = name.length; i<len; i++){
                        v = name[i];
                        name[i] = services[v] = services[v] || that.create(v);
                    }

                    return name;
                }
            }
        };

    })();

    /*
     * 封装工具函数
     *
     */
    var utils = {
        /*
         * 提供一个虚构的进度指示数字
         */
        progress: function(){
            var max = 100;
            var prev = 0;
            return {
                get: function(){
                    var increment = Math.round(Math.random() * 10);
                    prev = (prev + increment) >= max ? prev : (prev + increment);
                    return prev;
                },
                clear: function(){
                    prev = 0;
                    return this;
                }
            };
        }


    };

    /*
     * 开发时的debug函数
     */
    var isDevelop = window.deving || 1;

    var _cc = ( isDevelop && window.console && (function(){

        return function () {
            try {
                console.log.apply(console, arguments);
            } catch (e) {
            }
        }

    })()) || function(){};


    ////////////////////////////////////////////////
    // 对外接口 && 命名空间
    ////////////////////////////////////////////////

    root.brick = {
        services: services,
        controllers: controllers,
        utils: utils,
        isDevelop: isDevelop
    };

    root._cc = _cc;



})(window);
