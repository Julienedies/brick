/*!
 * js framework brick by Julien.
 * https://github.com/julienedies/brick.git
 * https://github.com/Julienedies/brick/wiki
 *
 * __inline是fis语法，用于嵌入代码片段，经过编译后会替换成对应的js文件内容；
 * 最终文件请查看目录 /dist/{{version}}/
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
    __inline('src/$extension.js');

    //以下是可选的内置的services、directives、brick扩展
    __inline('src/recordManager.js');

    __inline('src/widget/tpl.js');
    __inline('src/widget/ajax.js');
    __inline('src/widget/tabs.js');
    __inline('src/widget/form.js');

    __inline('src/widget/enterPress.js');
    __inline('src/widget/slider.js');
    __inline('src/widget/dropdown.js');
    __inline('src/widget/pagination.js');
    __inline('src/widget/dialog.js');
    __inline('src/widget/drag.js');
    __inline('src/widget/typeAhead.js');

    //bootstrap
    $(function () {
        setTimeout(function () {
            if(brick.get('bootstrap.auto') === false) return;
            brick.bootstrap(document.body);
        }, 10);
    });

})(window);
