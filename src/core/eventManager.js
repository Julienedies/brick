/**
 * 事件管理器
 * Created by julien.zhang on 2014/9/15.
 */

const _events = {};

export default {
    /**
     * 订阅一个事件监听
     * @param e {String} 事件名
     * @param f {Function} 回调函数
     * @param context {Object} 调用watch方法的scope
     */
    on: function (e, f, context) {
        //console.log(e, f, context);
        e = e.split(/[,\s]+/g);
        for (let i in e) {
            this._bind(e[i], f, context);
        }
    },
    _bind: function (e, f, context) {

        let handle = {f: f};

        let event = this._getNamespace(e);

        if (context) {
            handle.context = context;
        }

        let callback = event._callback = event._callback || [];

        callback.push(handle);
        return handle;
    },

    /**
     *  绑定只执行一次的事件处理回调
     * @param e
     * @param f
     * @param context
     */
    one: function (e, f, context) {
        e = e.split(/[,\s]+/g);
        for (let i in e) {
            let handle = this._bind(e[i], f, context);
            handle.onlyOne = true;
        }
    },

    /**
     * 取消一个事件监听
     * @param e {String} 事件名
     * @param f {Function} 回调函数，可选，如果没有传递，则取消该事件下的所有监听
     */
    off: function (e, f) {
        e = e.split(/[,\s]+/g);
        for (let i in e) {
            this._unbind(e[i], f);
        }
    },
    _unbind: function (e, f) {
        let event = this._getNamespace(e);
        let callback = event && event._callback;
        let handle;

        if (callback) {

            if (!f) {
                delete event._callback;
                return;
            }

            for (let i = 0, len = callback.length; i < len; i++) {

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
     * @param that {*}
     * @example
     * e = 'a.b.c';   会触发 ["a.b.c", "a.*.c", "a.*", "a.b.*"]
     */
    emit: function (e, msg, that) {

        let namespace = e.split(/[.:]/i);

        let prefix = namespace.shift();

        let events = [e];

        (function x (arr, pre) {

            if (!arr.length) return;

            pre = pre ? pre + '.' : '';

            for (let i = 0, len = arr.length; i < len; i++) {

                let arr1 = arr.slice();
                arr1.splice(0, i + 1);
                let event = pre + '*' + (arr1.length ? '.' + arr1.join('.') : '');
                events.push(event);

            }

            pre += arr.shift();

            x(arr, pre);

        })(namespace.slice(), prefix);


        for (let _e; _e = events.shift();) {

            this._fire(_e, msg, that);

        }

    },

    _fire: function (e, msg, that) {

        let event = this._getNamespace(e);
        let callback = event && event._callback;
        let handle;
        let context;
        let f;

        if (callback) {

            for (let i = callback.length - 1; i >= 0; i--) {

                handle = callback[i];
                context = handle.context || {};
                f = handle.f;

                if (f.constructor === Function) {
                    f.apply(context, [
                        {eventName: e, source: that},
                        msg
                    ]);
                }

                if (handle.onlyOne === true) {
                    callback.splice(i, 1);
                }

            }

        }

    },

    _getNamespace: function (e) {

        return _events[e] = _events[e] || {};

        /*        let namespace = e.split('.');

                return (function (k, _events) {

                    let i = k.shift();
                    let o = _events[i] = _events[i] || {};

                    if (k.length) {
                        return arguments.callee(k, o);
                    }

                    return o;

                })(namespace, _events);*/

    },

    _look: function () {
        console.log(_events);
    }

}

