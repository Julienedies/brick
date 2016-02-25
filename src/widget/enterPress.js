/**
 * 回车键按下监听指令
 * Created by julien.zhang on 2015/3/23.
 */

directives.reg('ic-enter-press', function ($elm, attrs) {

    $(document.body).on('focus', '[ic-enter-press]', function(e){

        var $elm = $(this);
        var call = $elm.attr('ic-enter-press');
        call = $elm.icParseProperty(call);
        call = $.proxy(call, this);
        var fn = function(e){
            e.which == 13  && call(e);
        };

        $elm.keypress(fn);

        $elm.on('blur', function(e){
            $elm.unbind('keypress', fn);
        });

    });

}, {selfExec: true, once: true });