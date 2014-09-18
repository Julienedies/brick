/**
 * Created by julien.zhang on 2014/9/15.
 */


//内置服务
services.add('recordManager', recordManager);

//对外接口
root.brick = {
    config: config,
    eventManager: eventManager,
    controllers: controllers,
    services: services,
    directives: directives,
    init: function () {

        this.controllers.init();

        /////////////////////////////////////////////////////////////////////

        $('[ic-ctrl]').each(function (i, e) {

            var root = $(e);

            var name = root.attr('ic-ctrl');

            var scope = brick.controllers.get(name);


            if (!scope) throw 'not find controller ' + name;


            scope.domNode = root;

            scope.tmplFn = createRender(e);

            scope.render();

        });

        /////////////////////////////////////////////////////////////////////

    }
};


root._cc = ( window.console && function () {

        try {
            console.log.apply(console, arguments);
        } catch (e) {
        }

} ) || function () {
};



