/**
 * Created by julien.zhang on 2014/9/17.
 */

var directives = {

    _pool: {},

    add: function (name, definition, conf) {
        this.reg(name, definition, conf);
    },

    reg: function (name, definition, conf) {
        if(typeof name == 'object'){
            conf = name;
            name = conf.name;
        }else if(typeof definition == 'object') {
            conf = definition;
        }else{
            conf = conf || {};
            conf.fn = definition;
        }
        this._pool[name] = conf;
    },

    get: function (name) {
        return name ? this._pool[name] : this._pool;
    },

    exec: function (name, $elm, attrs) {
        var _pool = this._pool;
        var definition = _pool[name];

        if (typeof definition === 'function') {
            definition.apply(null, [$elm, attrs]);
        } else if (definition.fn) {
            definition.fn.apply(null, [$elm, attrs]);
            if (definition.once) {
                delete _pool[i];
            }
        }
    },

    init: function () {
        var _pool = this._pool;
        for (var i in _pool) {
            var definition = _pool[i];
            if (definition.selfExec) {
                definition.fn && definition.fn();
                if (definition.once) {
                    delete _pool[i];
                }
            }
        }
    }

};

