/**
 * Created by julien.zhang on 2014/9/15.
 */

import utils from './utils'
import config from './config'
import controllers from './controllers'
import directives from './directives'
import services from './services'
import eventManager from './eventManager'
import createRender from './createRender'
import compile from './compile'

//对外接口
const brick = {
    version: VERSION,
    utils: utils,
    config: config,
    controllers: controllers,
    services: services,
    directives: directives,
    eventManager: eventManager,
    createRender: createRender,
    compile: compile,
    verbose: false,
    __tpl: {},
    debug: function(){},
    set: function (k, v) {
        return this.config.set(k, v);
    },
    get: function (k) {
        return this.config.get(k);
    },
    on: function (e, fn) {
        this.eventManager.on(e, fn);
        return this;
    },
    one: function (e, fn) {
        this.eventManager.one(e, fn);
        return this;
    },
    off: function (e, fn) {
        this.eventManager.off(e, fn);
        return this;
    },
    emit: function (e, msg) {
        this.eventManager.emit(e, msg);
        return this;
    },
    getTpl: function (name) {
        return this.__tpl[name];
    },
    reg: function (name, factory, conf) {
        if (/ctrl$/i.test(name)) {
            controllers.reg(name, factory, conf);
        } else {
            services.reg(name, factory, conf);
        }
    },
    bootstrap: function (node) {
        console.info('brick start at', VERSION);
        this.directives.init();
        this.compile(node || document.body);
        this.bootstrap = function () {
            console.info('only bootstrap once.')
        };
    }
};


export default brick





