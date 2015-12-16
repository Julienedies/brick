/*!
 * js framework brick by Julien.
 * https://github.com/julienedies/brick.git
 * https://github.com/Julienedies/brick/wiki
 */
;
(function (root, undefined) {

    __inline('src/var.js');
    __inline('src/config.js');
    __inline('src/compile.js');
    __inline('src/eventManager.js');
    __inline('src/controllers.js');
    __inline('src/services.js');
    __inline('src/directives.js');
    __inline('src/recordManager.js');
    __inline('src/parser.js');
    __inline('src/createRender.js');
    __inline('src/init.js');

    __inline('src/util.js');
    __inline('src/extend/transition.js');
    __inline('src/extend/route.js');
    __inline('src/extend/cache.js');

    __inline('src/$extend/$extension.js');

    __inline('src/directives/ctrl.js');
    __inline('src/directives/event.js');

    __inline('src/widget/tabs.js');
    __inline('src/widget/infinite-scroll.js');
    __inline('src/widget/mobile/dialog.js');
    __inline('src/widget/mobile/form.js');
    __inline('src/widget/mobile/ajax.js');
    __inline('src/widget/mobile/tpl.js');


    //bootstrap
    $(function () {
        setTimeout(function () {
            var auto = brick.config.get('bootstrap.auto');
            if(auto === false) return;
            brick.bootstrap(document.body);
        }, 10);
    });

})(window);
