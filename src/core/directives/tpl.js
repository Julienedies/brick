/**
 * Created by julien.zhang on 2014/10/11.
 */

directives.reg('ic-tpl', {
    selfExec: true,
    //once: true,
    fn: function ($elm) {

        var __tpl = brick.__tpl = brick.__tpl || {};

        ($elm || $('[ic-tpl]')).each(function () {

            var $th = $(this);
            var name = $th.attr('ic-tpl');

            var $parent;

            if(!name){
                $parent = $th.closest('[ic-ctrl]');
                name = $parent.attr('ic-ctrl');
            }

            $th.attr('ic-tpl', name);
            $th.attr('ic-tpl-name', name);

            __tpl[name] = createRender(this);

        });

    }

});
