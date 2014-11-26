/**
 * Created by julien.zhang on 2014/9/17.
 */

var directives = {

    _pool: {},

    add: function (name, definition) {
        this._pool[name] = definition;
    },

    get: function(name){
        return this._pool[name];
    },

    init: function (name) {
        var _pool = this._pool;
        for (var i in _pool) {
            _pool[i]();
        }
    }

};

