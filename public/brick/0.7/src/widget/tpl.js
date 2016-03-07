/**
 * Created by julien.zhang on 2014/10/11.
 */

directives.reg('ic-tpl', {
    selfExec: true,
    once: true,
    fn: function ($elm) {

        ($elm || $('[ic-tpl]')).each(function (i) {

            var th = $(this);

            var name = th.attr('ic-tpl');
            th.attr('ic-tpl-name', name);

            var compiled = createRender(this);

            var __tpl = brick.__tpl = brick.__tpl || {};
            __tpl[name] = compiled;

        });

    }

});
