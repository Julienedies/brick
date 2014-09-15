/**
 * Created by julien.zhang on 2014/9/15.
 */


var eventManager = _eventManager();

var controllers = _controllers();

var services = _services();

//内置服务
services.add('recordManager', recordManager);

//对外接口
root.brick = {
    eventManager: eventManager,
    controllers: controllers,
    services: services,
    init: function(){

        this.controllers.init();

        /////////////////////////////////////////////////////////////////////

        $('[ic-ctrl]').each(function (i, e) {

            var root = $(e);

            var name = root.attr('ic-ctrl');

                var scope = brick.controllers.get(name);



            if(!scope) throw 'not find controller ' + name;


            scope.domNode = root;

            scope.tmplFn = createRender(e);

            scope.render();

        });

        /////////////////////////////////////////////////////////////////////

    }
};


root._cc = ( window.console && (function () {

    return function () {
        try {
            console.log.apply(console, arguments);
        } catch (e) {
        }
    }

})()) || function () {};



