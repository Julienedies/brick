/*!
 * https://github.com/julienedies/brick.git
 * https://github.com/Julienedies/brick/wiki
 * {{timestamp}}
 * {{version}}
 */
;
(function (root, undefined) {

// __inline是fis语法，用于嵌入代码片段，经过编译后会替换成对应的js文件内容；

// core架构 必选
 __inline('core/utils.js')
__inline('core/config.js')
__inline('core/eventManager.js')
__inline('core/controllers.js')
__inline('core/services.js')
__inline('core/directives.js')
__inline('core/parser.js')
__inline('core/createRender.js')
__inline('core/compile.js')
__inline('helper/console.js')
__inline('core/export.js')

// core指令 必选
__inline('core/directives/ctrl.js')
__inline('core/directives/event.js')
__inline('core/directives/tpl.js')

// jQuery扩展 必选
__inline('$extend/$extension.js')

// 内置services 可选
__inline('services/recordManager.js')
__inline('services/transition.js')
__inline('services/cache.js')

// 内置directives 可选
__inline('directives/ajax.js')
__inline('directives/tabs.js')
__inline('directives/form.js')
__inline('directives/select.js')
__inline('directives/enterPress.js')
__inline('directives/scroll.js')
__inline('directives/dialog.js')
__inline('directives/dropdown.js')

// mobile
__inline('directives/show-img.js')

//bootstrap
$(function () {
    setTimeout(function () {
        if(brick.get('bootstrap.auto') === false) return;
        brick.bootstrap(document.body);
    }, 30);
});

})(window);
