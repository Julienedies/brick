/*!
 * js framework brick by Julien.
 * https://github.com/julienedies/brick.git
 * https://github.com/Julienedies/brick/wiki
 */
;
(function (root, undefined) {

    //core
    __inline('src/config.js');
    __inline('src/compile.js');
    __inline('src/eventManager.js');
    __inline('src/controllers.js');
    __inline('src/services.js');
    __inline('src/directives.js');
    __inline('src/parser.js');
    __inline('src/createRender.js');
    __inline('src/init.js');
    __inline('src/directives/ctrl.js');
    __inline('src/directives/event.js');
    __inline('src/$extend/$extension.js');

    //以下都是可选的内置的services、directives、brick扩展
    __inline('src/recordManager.js');

    __inline('src/util.js');
    __inline('src/extend/transition.js');
    __inline('src/extend/route.js');
    __inline('src/extend/cache.js');

    __inline('src/widget/tpl.js');
    __inline('src/widget/tabs.js');
    __inline('src/widget/tabs2.js');
    __inline('src/widget/ajax.js');
    __inline('src/widget/form.js');

    __inline('src/widget/scroll.js');
    __inline('src/widget/mobile/dialog.js');

    //bootstrap
    $(function () {
        setTimeout(function () {
            if(brick.get('bootstrap.auto') === false) return;
            brick.bootstrap(document.body);
        }, 10);
    });

})(window);
