/**
 * Created by j on 18/6/19.
 * @todo 控制console是否输出
 * @example
 * cc('info','log');  // console.log and console.info 调用后不会有输出
 * cc(true, 'info', 'log');  console.log and console.info 调用继续输出
 */

var native_console = window.console;

var console = {};

const _console = native_console;

const _console_bak = {};
const _console_ghost = {};
const _console_methods = [];

;
(function () {
    for (var i in _console) {
        var f = _console[i];
        if (typeof f == 'function') {
            _console_methods.push(i);
            //_console_bak[i] = f;
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
 */
function cc(bool, methods) {
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

window.console.info(console.info);
console.info('aa', 'bb');
