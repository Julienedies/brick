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
            var tplf = brick._tplfs[tplName];  //模板函数
            var tple; //dom元素
            var html;
            if($elm && tplf){
                tple = $elm.filter('[ic-tpl=?]'.replace('?', tplName));
                tple = tple.length ? tple : $elm.find('[ic-tpl=?]'.replace('?', tplName));
                html = tplf(model ? {model:model} : this);
                //console.log(html)
                if(tple.length){
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
            _ctrls[name] = {fn:ctrl, conf: conf, depend:depend, service:conf.service, scope:f(name)};
        },

        /**
         * 运行控制器
         * @param name
         */
        exec: function(name, parent){
            var ctrl = _ctrls[name];

            if (!ctrl) return console.log('not find controller ' + name);

            var conf = ctrl.conf;
            var scope;
            var depend = conf.depend || [];

            scope = parent ? f(name, parent) : f(name);
            scope._parent = parent && parent._name;
            ctrl.scope = scope;

            depend = services.get(depend) || [];
            depend = depend.constructor !== Array ? [depend] : depend;
            depend.unshift(scope);

            ctrl.fn.apply(null, depend);
            ctrl.fn = function(){};

            if(conf.global) window[name] = scope;
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

})();