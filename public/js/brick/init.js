/**
 * Created by julien.zhang on 2014/9/15.
 */


//内置服务
services.add('recordManager', recordManager);
services.fill('eventManager', eventManager);

//对外接口
root.brick = {
    config: config,
    eventManager: eventManager,
    broadcast: function(e, msg){
        this.eventManager.fire(e, msg);
    },
    on: function(e, fn){
      this.eventManager.watch(e, fn);
    },
    controllers: controllers,
    services: services,
    directives: directives,
    getTpl: function(name){
        return this._tplfs[name];
    },
    _tplfs:{},
    _findProperty: function(name){

    },
    init: function () {

        //this.controllers.init();

        //this.directives.init();

        /////////////////////////////////////////////////////////////////////

//        $('[ic-ctrl]').each(function (i, e) {
//
//            var root = $(e);
//
//            var name = root.attr('ic-ctrl');
//
//            var scope = brick.controllers.get(name);
//
//
//            if (!scope) throw 'not find controller ' + name;
//
//
//            scope.domNode = root;
//
//            scope.tmplFn = createRender(e);
//
//            scope.render();
//
//        });

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





