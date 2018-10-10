/**
 * Created by julien.zhang on 2014/10/11.
 */

directives.reg('ic-tpl', {
    selfExec: true,
    //once: true,  // 要考虑异步加载进来的模板, 所以不能只允许调用一次
    fn: function ($elm) {

        var __tpl = brick.__tpl = brick.__tpl || {};

        ($elm || $('[ic-tpl]')).each(function () {

            var $th = $(this);
            var name = $th.attr('ic-tpl');
            var $parent;

            // 只处理一次
            if($th.attr('ic-tpl-name')) return;

            if(!name){
                $parent = $th.closest('[ic-ctrl]');
                name = $parent.attr('ic-ctrl');
            }

            //自动初始化渲染数据对象
            setTimeout(function(){
                var dob = $th.icParseProperty2('ic-tpl-init');
                dob && $th.icRender(name, dob);
            }, 300);

            __tpl[name] = createRender(this);

            $th.attr('ic-tpl-name', name);
            $th.removeAttr('ic-tpl');
            $th.empty();

        });

    }

});
