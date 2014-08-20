/**
 * Created by julien.zhang on 2014/6/30.
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
     * 管理器原型
     */
    var manager = function(){
        var fn = {
            get: function(){

            },
            set: function(){

            },
            add: function(){

            },
            remove: function(){

            },
            clear: function(){

            },
            on: function(){

            },
            trigger: function(){

            },
            off: function(){

            }
        }

        function f(){
            var _list = {};

        }

        return f;
    };


    function inherit(){

    }

    /*
     * 事件管理器
     */
    var eventManager = (function(){

        var _events = {};

        return {

            bind: function(e, f, context){

                var handle = {f:f};

                var event = this._getNamespace(e);

                if(context){
                    handle.context = context;
                }

                var callback = event._callback = event._callback || [];

                callback.push(handle);
            },

            unbind: function(e, f){

                var event = this._getNamespace(e);
                var callback = event && event._callback;
                var handle;

                if(callback){

                    if(!f){
                        callback = [];
                        return;
                    }

                    for(var i= 0, len = callback.length; i<len; i++){

                        handle = callback[i];

                        if(f.toString() === handle.f.toString()){
                            event.splice(i,1);
                            return;
                        }

                    }
                }

            },

            fire: function(e, msg, flag){

                var namespace = e.split('.');

                var args;

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

                         args = Array.prototype.slice.call(arguments, 1);

                         args.unshift({eventName:e});

                         f.apply(context, args);

                    }

                }

                if(flag || namespace.length<2) return;

                namespace.pop();
                e = namespace.join('.') + '.*';
                this.fire(e, msg, 1);

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
     * 管理控制器
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

            fire: function(e, msg){

                eventManager.fire(e, msg);

            },

            watch: function(e, f){

                var that = this;

                eventManager.bind(e, f, that);

            },

            unbind: function(e, f){
                eventManager.unbind(e, f);
            }

        });


        function f(name, o){
            function F(){ this._name = name;}
            F.prototype = new _F();
            extend(F.prototype, o || {});
            return new F;
        }


        return {
            bind: _bind,
            /*
             * 获取一个控制器的对外接口对象
             */
            get: function(name){
                return _ctrls[name].scope;
            },
            /*
             * 向管理器添加控制器
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
     * 管理服务；（模型对象，UI组件都可以做为服务存在；通常是单例对象）
     */
    var services = (function(){
        var services = {};
        var registry = {};

        return {
            look: function(){
                console.log(registry);
            },
            /*
             * 向管理器注册服务
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
            fill: function(name, service){
                services[name] = service;
            },
            /*
             * 获取一个服务实例
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
        },
        /*
         * 数字格式化
         */
        dFormat: function (d, opt) {
            opt = opt || {};

            var dg,
                l,
                r,
                point,
                reg,
                ro;

            dg = opt.dg * 1 || 0;
            l = Math.pow(10, dg);
            d = Math.round(d * l) / l;
            r = (d + '').split('.');
            point = r[1] || '';

            reg = new RegExp('0{' + point.length + '}');

            ro = _.range(dg);
            _.each(ro, function (v, i, list) {
                list[i] = 0;
            });
            ro = ro.join('');
            point = ro.replace(reg, point);
            d = r[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
            d = d + (point ? '.' + point : '');
            return /^-/.test(d) ? d.replace(/\-(.+)$/, '($1)') : d;
        }

    };

    /*
     * 开发时的debug函数
     */
    var isDevelop = location.hostname == 'dev.com';

    var _cc = (isDevelop && window.console && (function(){

        return function () {
            try {
                console.log.apply(console, arguments);
            } catch (e) {
            }
        }

    })()) || function(){};


    ////////////////////////////////////////////////
    // 对外接口
    ////////////////////////////////////////////////

    root.brick = {
        services: services,
        controllers: controllers,
        utils: utils,
        isDevelop: isDevelop
    };

    root._cc = _cc;


})(window);
