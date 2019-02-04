/**
 * @todo 在brick闭包内重写console,对原生console进行包装, 控制debug输出.
 * issue: 覆盖原生console, 会导致控制台debug定位不到console输出语句.  无法解决, 不能覆盖!
 * Created by j on 18/6/19.
 */

var native_console = window.console;
var _console = native_console;

var console = {};

var _console_bak = {};
var _console_methods = [];

;
(function () {
    for (var i in _console) {
        var f = _console[i];
        if (typeof f == 'function') {
            _console_methods.push(i);
            (function (f) {
                _console_bak[i] = console[i] = function () {
                    var arr = [].slice.call(arguments, 0);
                    f.apply(_console, arr);
                };
            })(f);
        }
    }
})();


/*
 * @todo 管理console的行为,
 * @param bool {Boolean} [可选] console方法调用后是否输出
 * @param methods  {String}  [可选]  console方法名
 * @example
 * cc('info','log') or cc(false, 'info', 'log');  // console.log and console.info 调用后不会有输出
 * cc(true, 'info', 'log');  console.log and console.info 调用继续输出
 */
export default function cc(bool, methods) {
    var arr = [].slice.call(arguments);
    bool = arr.shift();
    methods = arr;
    if (typeof bool == 'undefined') {
        bool = false;
        methods = _console_methods;
    }
    else if (typeof bool == 'boolean') {
        methods = methods.length ? methods : _console_methods;
    }
    else if (typeof bool == 'string') {
        methods.unshift(bool);
        bool = false;
    }
    methods.forEach(function (method) {
        console[method] = bool ? _console_bak[method] : function () {
        };
    });
}
