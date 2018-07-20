/**
 * Created by j on 18/6/19.
 * @todo 控制console是否输出
 * @example
 * brick.cm('info','log');  // console.log and console.info 调用后不会有输出
 * brick.cm(true, 'info', 'log');  console.log and console.info 调用继续输出
 */

var cc = (function () {

    const _console = console;

    const _bak = {};

    const _methods = [];

    for (var i in _console) {
        if (typeof _console[i] == 'function') {
            _methods.push(i);
            _bak[i] = console[i];

        }
    }

    /*
     * @todo 管理console的行为,
     * @param bool {Boolean} [可选] console方法调用后是否输出
     * @param methods  {String}  [可选]  console方法名
     */
    function _export(bool, methods) {
        var arr = [].slice.call(arguments);
        bool = arr.shift();
        methods = arr;
        if (typeof bool == 'undefined') {
            bool = false;
            methods = _methods;
        }
        else if (typeof bool == 'boolean') {
            methods = methods.length ? methods : _methods;
        }
        else if (typeof bool == 'string') {
            methods.unshift(bool);
            bool = false;
        }
        methods.forEach(function (method) {
            console[method] = bool ? _bak[method] : function () {
            };
        });
    }

    return _export;

})();
