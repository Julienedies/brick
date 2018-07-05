/*!
 * https://github.com/julienedies/brick.git
 * https://github.com/Julienedies/brick/wiki
 * {{timestamp}}
 */
;
(function (root, undefined) {

    // __inline是fis语法，用于嵌入代码片段，经过编译后会替换成对应的js文件内容；

    // core架构 必选
    __inline('src/core/config.js')
    __inline('src/core/compile.js')
    __inline('src/core/eventManager.js')
    __inline('src/core/controllers.js')
    __inline('src/core/services.js')
    __inline('src/core/directives.js')
    __inline('src/core/parser.js')
    __inline('src/core/createRender.js')
    __inline('src/core/init.js')

    // core指令 必选
    __inline('src/core/directives/ctrl.js')
    __inline('src/core/directives/event.js')
    __inline('src/core/directives/tpl.js')

    // jQuery扩展 必选
    __inline('src/$extend/$extension.js')

    // 内置services 可选
    __inline('src/services/recordManager.js')
    __inline('src/services/transition.js')
    __inline('src/services/route.js')
    __inline('src/services/cache.js')

    // 内置directives 可选
    __inline('src/directives/tabs.js')
    __inline('src/directives/tabs2.js')
    __inline('src/directives/ajax.js')
    __inline('src/directives/form.js')
    __inline('src/directives/scroll.js')
    __inline('src/directives/mobile/dialog.js')

    //bootstrap
    $(function () {
        setTimeout(function () {
            if(brick.get('bootstrap.auto') === false) return;
            brick.bootstrap(document.body);
        }, 30);
    });

})(window);
