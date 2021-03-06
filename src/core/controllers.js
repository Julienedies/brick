/**
 * 控制器管理器
 * Created by julien.zhang on 2014/9/15.
 */

import brick from '../core/export'
import eventManager from './eventManager'
import services from './services'

// 存储控制器
const _ctrls = {};

function extend (dist, o) {
    if (typeof o == 'object') {
        for (let i in o) {
            dist[i] = o[i];
        }
    }
    return dist;
}

// scope原型对象
function _F () {
}

extend(_F.prototype, {

    set: function (key, val) {
        this[key] = val;
        this.render();
    },

    get: function (key) {
        return this[key];
    },
    // window.confirm 包装
    confirm (msg) {
        return window.confirm(msg)
    },
    /**
     * 用于触发事件
     * @param e {String} 事件名
     * @param msg {*}    任意要传递的数据
     */
    emit: function (e, msg) {
        let that = this;
        eventManager.emit(e, msg, that);
    },
    /**
     * 用于订阅事件
     * @param e  {String}   事件名
     * @param f  {Function} 回调函数，接受两个参数e(事件对象，由框架封装提供），msg(用户自定义数据)
     */
    on: function (e, f) {
        let that = this;
        eventManager.on(e, f, that);
    },
    one: function (e, f) {
        let that = this;
        eventManager.one(e, f, that);
    },
    /**
     * 取消事件监听
     * @param e {String}   事件名
     * @param f {Function} 回调函数
     */
    off: function (e, f) {
        eventManager.off(e, f);
    },
    render: function (tplName, model, call) {
        let that = this;
        if (tplName === undefined) {
            tplName = this._name;
            model = this._model;
        } else if (typeof tplName == 'function') {
            call = tplName;
            tplName = that._name;
            model = that;
        } else if (typeof tplName == 'object') {
            call = model;
            model = tplName;
            tplName = that._name;
        }
        setTimeout(function () {
            let $tpl_dom = that._render(tplName, model);
            if ($tpl_dom) {
                brick.compile($tpl_dom, true);   // 手动调用brick.compile或者从子元素开始编译; 避免陷入无限循环
                call && call.apply($tpl_dom, []);
            }
        }, 30);
    },
    _render: function (tplName, model) {
        // console.log('render => ', tplName, model);
        let $elm = this.$elm;
        let tpl_fn = brick.getTpl(tplName);  //模板函数

        if (typeof tpl_fn !== 'function') return console.error('not find render function =>', tplName);

        let selector = '[ic-tpl=?],[ic-tpl-name=?]'.replace(/[?]/img, tplName);
        let $tpl_dom; // 有ic-tpl属性的dom元素
        let html;
        // 如果数据模型不是对象类型,则对其包装
        if (!model.model) {
            if (brick.get('render.wrapModel') || Array.isArray(model)) {
                model = {model: model};
            }
        }
        $tpl_dom = $elm.filter(selector);  // case: <div ic-ctrl="a" ic-tpl="a"></div>
        $tpl_dom = $tpl_dom.length ? $tpl_dom : $elm.find(selector);
        html = tpl_fn(model);
        $tpl_dom.show();
        $tpl_dom.removeAttr('ic-tpl');
        return $tpl_dom.html(html);
    }

});

function f (name, parent) {
    // scope对象
    function F (name) {
        this._name = name;
    }

    // 继承scope原型对象; 如果有parent scope，直接继承parent scope; 或者继承自 new _F();
    // fix:取消 extend(F.prototype, o) 这种拷贝parent scope的继承方式，不能获取parent scope的动态变化;
    F.prototype = parent ? parent : new _F();
    //extend(F.prototype, o);  // 继承parent scope; 取消拷贝继承;
    return new F(name);
}


export default {
    /**
     * 获取一个控制器的scope对象
     * @param name {String} 控制器ID
     */
    get: function (name) {
        return name && _ctrls[name] && _ctrls[name].scope;
    },
    /**
     * 注册控制器
     * @param name {String}   控制器ID
     * @param ctrl {Function} 控制器的工厂函数
     * @param conf {Object}   可选，控制器config (可以定义依赖，是否注册为global变量，是否做为service)
     */
    reg: function (name, ctrl, conf) {
        conf = conf || {};
        let depend = conf.depend || [];
        _ctrls[name] = {fn: ctrl, depend: depend, service: conf.service, conf: conf};
    },

    /**
     * 运行控制器
     * @param name
     * @param parent {scope} 父scope对象
     * @param $elm  {jQuery} 绑定scope对象的dom
     */
    exec: function (name, parent, $elm) {

        let ctrl = _ctrls[name];
        if (!ctrl) return console.info('not find controller ' + name);

        let conf = ctrl.conf;
        let scope;
        let depend = ctrl.depend;

        scope = parent ? f(name, parent) : f(name);
        scope._parent = parent && parent._name;
        scope.$elm = $elm;
        ctrl.scope = scope; // 如果有多个控制器实例，则该名下控制器的作用域对象引用的会是最后一个实例化控制器的作用域对象
        $elm.data('ic-ctrl-scope', scope);  // 用于区别多个同名控制器下的正确继承

        depend = services.get(depend) || [];
        depend = depend.constructor !== Array ? [depend] : depend;
        depend.unshift(scope);

        ctrl.fn.apply(scope, depend);  // 注入scope和依赖,执行factory

        //ctrl.exec = (ctrl.exec || 0) + 1;

        //if(conf.global) window[name] = scope;
        return scope;
    },

    _look: function () {
        return _ctrls;
    }
};

