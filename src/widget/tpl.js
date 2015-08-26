/**
 * Created by julien.zhang on 2014/10/11.
 */

directives.add('ic-tpl', {
    selfExec: true,
    once: true,
    fn:function ($elm) {

        //只执行一次
        if (!arguments.callee._run || $elm) {

            arguments.callee._run = 1;

            ($elm || $('[ic-tpl]')).each(function (i) {

                var th = $(this);

                var name = th.attr('ic-tpl');

//        var ctrl = th.closest('[ic-ctrl]').attr('ic-ctrl');
//        var scope = brick.controllers.get(ctrl);

                //console.log(ctrl, scope);

                //ie7下模板渲染会报错，有时间fix;
                //try {
                var compiled = createRender(this);
//        } catch (e) {
//            console.log('+_+ :)', e);
//        }

                var __tpl = brick.__tpl = brick.__tpl || {};
                __tpl[name] = compiled;

            });

        }

    }
});
