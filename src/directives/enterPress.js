/**
 * Created by julien.zhang on 2015/3/23.
 * 回车键按下监听指令
 */

import $ from 'jquery'

export default {
    name: 'ic-enter-press',
    selfExec: true,
    once: true,
    fn: function ($elm, attrs) {

        $(document.body).on('focus', '[ic-enter-press]', function (e) {

            let $elm = $(this);
            let call = $elm.attr('ic-enter-press');
            call = $elm.icParseProperty(call);
            call = $.proxy(call, this);
            let fn = function (e) {
                e.which === 13 && call(e);
            };

            $elm.on('keypress', fn);

            $elm.on('blur', function (e) {
                $elm.off('keypress', fn);
            });

        });

    }
}
