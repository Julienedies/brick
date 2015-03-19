/*!
 * js framework brick by Julien.
 * https://github.com/julienedies/brick.git
 * https://github.com/Julienedies/brick/wiki
 */
;
(function (root, undefined) {

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
    __inline('src/$extension.js');

    __inline('src/directives/ctrl.js');
    __inline('src/directives/event.js');

    __inline('src/widget/slider.js');
    __inline('src/widget/tabs.js');
    __inline('src/widget/dropdown.js');
    __inline('src/widget/pagination.js');
    __inline('src/widget/dialog.js');
    __inline('src/widget/drag.js');
    __inline('src/widget/form.js');
    __inline('src/widget/ajax.js');
    __inline('src/widget/tpl.js');
    __inline('src/widget/typeAhead.js');


    $(function () {

        setTimeout(function () {

            console.log('brick start');

            //优先解析模板
            directives.exec('ic-tpl');

            directives.exec('ic-event');

            directives.exec('ic-ajax');

            (function (node) {

                var $elm = $(node);

                compile(node);

                var children = $elm.children();
                var child;
                var i = 0;
                while (child = children.eq(i)[0]) {
                    i++;
                    arguments.callee(child);
                }

            })(document.body);

            controllers.init();

        }, 30);

    });

})(window);
