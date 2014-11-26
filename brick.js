/*!
 * js framework brick by Julien.
 * https://github.com/julienedies/brick.git
 */
;(function(root, undefined){

        __inline('src/config.js');
        __inline('src/eventManager.js');
        __inline('src/controllers.js');
        __inline('src/services.js');
        __inline('src/directives.js');
        __inline('src/recordManager.js');
        __inline('src/parser.js');
        __inline('src/createRender.js');
        __inline('src/init.js');

        __inline('src/widget/$extension.js');
        __inline('src/widget/placeholder.js');
        __inline('src/directives/event.js');
        __inline('src/widget/slider.js');
        __inline('src/widget/tabs.js');
        __inline('src/widget/dropdown.js');
        __inline('src/widget/pagination.js');
        __inline('src/widget/scene.js');
        __inline('src/widget/timer.js');
        __inline('src/widget/dialog.js');
        __inline('src/widget/drag.js');
        __inline('src/widget/form.js');
        __inline('src/widget/ajax.js');
        __inline('src/widget/tpl.js');
        __inline('src/widget/typeAhead.js');


        ;$(function(){

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

        });


})(window);
