/**
 * 根据dom模板生成模板函数
 * Created by julien.zhang on 2014/10/11.
 */
import $ from 'jquery'
import brick from '../export'
import createRender from '../createRender'

export default {
    selfExec: true,
    //once: true,  // 要考虑异步加载进来的模板, 所以不能只允许调用一次
    fn: function ($elm) {

        let __tpl = brick.__tpl = brick.__tpl || {};

        ($elm || $('[ic-tpl]').not($('[ic-skip] [ic-tpl]'))).each(function () {

            let $th = $(this);
            let name = $th.attr('ic-tpl');
            let $parent;

            // 只处理一次
            if ($th.attr('ic-tpl-name')) return;

            if (!name) {
                $parent = $th.closest('[ic-ctrl]');
                name = $parent.attr('ic-ctrl');
            }

            //自动初始化渲染数据对象
            setTimeout(function () {
                let dob = $th.icParseProperty2('ic-tpl-init');
                console.info('ic-tpl-init', dob)
                dob && $th.icRender(name, {model: dob});
            }, 300);

            __tpl[name] = createRender(this);
            $th.attr('ic-tpl-name', name);
            $th.removeAttr('ic-tpl');
            $th.empty();
        });
    }
}
