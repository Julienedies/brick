/**
 * Created by julien.zhang on 2014/11/11.
 *
 * 使ie9及以下版本支持placeholder功能
 */

directives.add('placeholder', function ($elm, attrs) {

    function ltIe(ver) {
        var b = document.createElement('b');
        b.innerHTML = '<!--[if lt IE ' + ver + ']><i></i><![endif]-->';
        return b.getElementsByTagName('i').length === 1
    }

    //如果非ie浏览器或大于ie9,返回
    if (!window.ActiveXObject || !ltIe(10)) return;


    var $th = $elm;
    var placeholder = $th.attr('placeholder');

    if (!placeholder) return;

    var type = $th.attr('type');

    //密码输入框处理
    if (type === 'password') {

        var cla = $th.attr('class');
        var style = $th.attr('style');
        var clone = '<input type="text" class="?" style="%">'.replace('?', cla).replace('%', style);
        clone = $(clone).insertBefore($th.hide()).val(placeholder).css({color: '#CDCDCD'});

        clone.on('focus', function (e) {
            clone.hide();
            $th.show().focus();
        });

        $th.on('blur', function (e) {
            if ($th.val() == '') {
                clone.show();
                $th.hide();
            }
        });

        return;
    }

    //普通文本框处理
    if (type === 'text') {

        $th.val(placeholder).css({color: '#CDCDCD'});

        $th.on('focus', function () {
            $th.val() === placeholder && $th.val('').css({color: ''});
        });

        $th.on('blur', function () {
            if ($th.val() === '') {
                $th.val(placeholder).css({color: '#CDCDCD'});
            }
        });

    }


});