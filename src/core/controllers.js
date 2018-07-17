/**
 * Created by julien.zhang on 2014/9/15.
 *
 * 控制器管理器
 */


var controllers = (function () {

    // 存储控制器
    var _ctrls = {};
    var _bind = {};

    function extend(dist, o) {
        for (var i in o) {
            dist[i] = o[i];
        }
        return dist;
    }

    // scope原型对象
    function _F() {
    }

    extend(_F.prototype, {

        set: function (key, val) {
            this[key] = val;
            this.render();
        },

        get: function (key) {
            return this[key];
        },

        /**
         * 用于触发事件
         * @param e {String} 事件名
         * @param msg {*}    任意要传递的数据
         */
        fire: function (e, msg) {
            var that = this;
            eventManager.fire(e, msg, that);
        },
        /**
         * 用于订阅事件
         * @param e  {String}   事件名
         * @param f  {Function} 回调函数，接受两个参数e(事件对象，由框架封装提供），msg(用户自定义数据)
         */
        on: function (e, f) {
            var that = this;
            eventManager.bind(e, f, that);
        },
        /**
         * 取消事件监听
         * @param e {String}   事件名
         * @param f {Function} 回调函数
         */
        off: function (e, f) {
            eventManager.unbind(e, f);
        },
        render: function (tplName, model, call) {
            var that = this;
            if (typeof tplName == 'function') {
                call = tplName;
                tplName = that._name;
                model = that;
            }
            if (typeof tplName == 'object') {
                model = tplName;
                tplName = that._name;
                call = model;
            }
            setTimeout(function () {
                var $tpl_dom = that._render(tplName, model);
                call && $tpl_dom && call.apply($tpl_dom, []);
            }, 30);
        },
        _render: function (tplName, model) {
            var $elm = this.$elm;
            var tpl_fn = brick.getTpl(tplName);  //模板函数
            var $tpl_dom; //dom元素
            var html;
            if ($elm && tpl_fn) {
                $tpl_dom = $elm.filter('[ic-tpl=?]'.replace('?', tplName));
                $tpl_dom = $tpl_dom.length ? $tpl_dom : $elm.find('[ic-tpl=?]'.replace('?', tplName));
                html = tpl_fn(model ? {model: model} : this);
                if ($tpl_dom.length) {
                    $tpl_dom.show();
                    $tpl_dom.removeAttr('ic-tpl');
                    return $tpl_dom.html(html);
                }
            }
        }

    });


    function f(name, o) {
        function F() {
            this._name = name;
        }

        F.prototype = new _F();
        extend(F.prototype, o || {});
        return new F;
    }


    return {
        /**
         * 获取一个控制器的对外接口对象
         * @param name {String} 控制器ID
         */
        get: function (name) {
            return _ctrls[name] && _ctrls[name].scope;
        },

        /**
         * 注册控制器
         * @param name {String}   控制器ID
         * @param ctrl {Function} 控制器的工厂函数
         * @param conf {Object}   可选，控制器config (可以定义依赖，是否注册为global变量，是否做为service)
         */
        add: function (name, ctrl, conf) {
            conf = conf || {};
            var parent = conf.parent;
            var depend = conf.depend || [];
            var scope;
            scope = parent ? f(name, _ctrls[parent]) : f(name);
            if (conf.global) {
                window[name] = scope;
            }
            _ctrls[name] = {fn: ctrl, scope: scope, depend: depend, service: conf.service, conf: conf};
        },

        /**
         * 注册控制器
         * @param name {String}   控制器ID
         * @param ctrl {Function} 控制器的工厂函数
         * @param conf {Object}   可选，控制器config (可以定义依赖，是否注册为global变量，是否做为service)
         */
        reg: function (name, ctrl, conf) {
            conf = conf || {};
            var depend = conf.depend || [];
            _ctrls[name] = {fn: ctrl, conf: conf, depend: depend, service: conf.service, scope: []};
        },

        /**
         * 运行控制器
         * @param name
         */
        exec: function (name, parent, $elm) {
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

            ctrl.fn.apply(scope, depend);
            ctrl.exec = (ctrl.exec || 0) + 1;

            //if(conf.global) window[name] = scope;
            return scope;
        },

        /**
         * 初始化控制器
         */
        init: function (name) {
            var ctrls = _ctrls;
            var ctrl;
            var depend;
            var service;
            for (var i in ctrls) {
                ctrl = ctrls[i];
                if (ctrl.exec) continue;
                depend = services.get(ctrl.depend) || [];
                if (depend.constructor !== Array) {
                    depend = [depend];
                }
                depend.unshift(ctrl.scope);
                service = ctrl.fn.apply(ctrl.scope, depend);
                ctrl.fn = function () {
                };

                if (ctrl.service) {
                    services.fill(i, service);
                }

            }
        },

        _look: function () {
            return _ctrls;
        }
    };

})();