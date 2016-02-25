/**
 * Created by julien.zhang on 2014/9/15.
 */


//内置服务
services.add('recordManager', recordManager);
services.fill('eventManager', eventManager);

//对外接口
var brick = root.brick = {
    config: config,
    eventManager: eventManager,
    set: function(k, v){
        return this.config.set(k, v);
    },
    get: function(k){
      return this.config.get(k);
    },
    broadcast: function (e, msg) {
        this.eventManager.fire(e, msg);
        return this;
    },
    on: function (e, fn) {
        this.eventManager.bind(e, fn);
        return this;
    },
    off: function (e, fn) {
        this.eventManager.unbind(e, fn);
        return this;
    },
    fire: function (e, msg) {
        this.eventManager.fire(e, msg);
        return this;
    },
    controllers: controllers,
    services: services,
    directives: directives,
    compile: compile,
    createRender:createRender,
    getTpl: function (name) {
        return this.__tpl[name];
    },
    __tpl: {},
    bootstrap: function (node) {
        console.log('brick start');
        this.directives.init();
        compile(node || document.body);
        //hashChangeInit();
        this.bootstrap = function(){console.info('only bootstrap once.')};
    }
};








