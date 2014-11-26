/**
 * Created by julien.zhang on 2014/10/11.
 */

directives.add('ic-tpl', function (elm) {

    $(elm || '[ic-tpl]').each(function (i) {

        var that = this.cloneNode(true);
        var th = $(this);

        var name = th.attr('ic-tpl');

//        var ctrl = th.closest('[ic-ctrl]').attr('ic-ctrl');
//        var scope = brick.controllers.get(ctrl);

        //console.log(ctrl, scope);

        //ie7下模板渲染会报错，有时间fix;
        //try {
            var compiled = createRender(that);
//        } catch (e) {
//            console.log('+_+ :)', e);
//        }

        var tplfs = brick._tplfs = brick._tplfs || {};
        tplfs[name] = compiled;

    });


});
