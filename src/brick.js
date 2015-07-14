/*!
 * js framework brick by Julien.
 * https://github.com/julienedies/brick.git
 */
;(function(root, undefined){

        __inline('config.js');
        __inline('compile.js');
        __inline('eventManager.js');
        __inline('controllers.js');
        __inline('services.js');
        __inline('directives.js');
        __inline('recordManager.js');
        __inline('parser.js');
        __inline('createRender.js');
        __inline('init.js');
        __inline('$extension.js');

        __inline('directives/ctrl.js');
        __inline('directives/event.js');

        __inline('widget/enterPress.js');
        __inline('widget/placeholder.js');
        __inline('widget/slider.js');
        __inline('widget/tabs.js');
        __inline('widget/dropdown.js');
        __inline('widget/pagination.js');
        __inline('widget/scene.js');
        __inline('widget/timer.js');
        __inline('widget/dialog.js');
        __inline('widget/drag.js');
        __inline('widget/form.js');
        __inline('widget/ajax.js');
        __inline('widget/tpl.js');
        __inline('widget/typeAhead.js');


        /*$(function(){

            setTimeout(function(){

                console.table(brick.controllers._look());

                (function (node) {

                    var $elm = $(node);
                    var ctrlName = $elm.attr('ic-ctrl');

                    if(ctrlName){
                        var parent = $elm.parent().closest('[ic-ctrl]');
                        var parentName = parent.size() ? parent.attr('ic-ctrl') : '';
                        var scope = controllers.exec(ctrlName, controllers.get(parentName));
                        if(scope){
                            scope.$elm = $elm;
                        }
                    }

                    var children = $elm.children();
                    var child;
                    var i = 0;
                    while (child = children.eq(i)[0]) {
                        i++;
                        arguments.callee(child);
                    }

                })(document.body);

                controllers.init();
                directives.init();

            }, 30);

        });*/


    $(function(){

        setTimeout(function(){

            //
            directives.init();

            //优先解析模板
            //directives.exec('ic-tpl');

            //directives.exec('ic-event');

            //directives.exec('ic-ajax');

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
