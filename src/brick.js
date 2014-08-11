/**
 * Created by julien on 2014/6/30.
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

    function eventManager(o){
        o = o || {};
        var _events = {};

        o.bind = function(){

        }
    }


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
                var arr = (_bind[selfName] || []).slice();
                for(var i; i = arr.shift(); ){
                    _ctrls[i].scope._watch(extend({source:this}, e||{}));
                }
            },
            _watch: function(e){

            }
        });


        function f(name, o){
            function F(){ this._name = name;}
            F.prototype = new _F();
            extend(F.prototype, o || {});
            return new F;
        }


        var _out = {
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
                _ctrls[name] = {fn:ctrl, scope:scope, depend:depend};
            },
            /*
             * 初始化控制器
             */
            init: function(name){
                var ctrls = _ctrls;
                if(name){
                    ctrls = {};
                    ctrls[name] = _ctrls[name];
                }
                var ctrl;
                var depend;
                for(var i in ctrls){
                    ctrl = ctrls[i];
                    depend = services.get(ctrl.depend) || [];
                    if(depend.constructor !== Array){
                        depend = [depend];
                    }
                    depend.unshift(ctrl.scope);
                    ctrl.fn.apply(null, depend);
                }
            }
        };

        return _out;
    })();

    /*
     * 管理服务；（模型对象，UI组件都可以做为服务存在；通常是单例对象）
     */
    var services = (function(){
        var services = {};
        var registry = {};

        var o = {
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
                var depend = info.depend;
                if(depend){
                    depend = that.get(depend);
                }
                return info.serve.apply(null, depend || []);
            },
            /*
             * 获取一个服务实例
             */
            get: function(name){
                var that = this;
                if(!name) return;

                if(typeof name === 'string') {
                    return services[name] = services[name] || that.create(name);
                }

                if(name.slice && name.length){

                    name = name.slice();

                    for(var i = 0, v, len = name.length; i<len; i++){
                        v = name[i];
                        name[i] = services[v] = services[v] || that.create(v);
                    }

                    return name;
                }
            }
        };

        return o;

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
        }
    };

    /*
     * 开发时的debug函数
     */
    var isDevelop = 1;
    var _cc = (isDevelop && window.console && (function(){

        return function () {
            try {
                console.log.apply(console, arguments);
            } catch (e) {
            }
        }

    })()) || function(){};


//////////////////////////////////////
// 对外接口

    root.brick = {
        services: services,
        controllers: controllers,
        utils: utils
    };

    root._cc = _cc;


})(window);
