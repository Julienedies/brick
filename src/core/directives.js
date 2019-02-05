/**
 * Created by julien.zhang on 2014/9/17.
 */

export default  {

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
        let _pool = this._pool;
        let definition = _pool[name];
        console.log('exec:', name)
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
        let _pool = this._pool;
        for (let i in _pool) {
            let definition = _pool[i];
            if (definition.selfExec) {
                definition.fn && definition.fn();
                if (definition.once) {
                    delete _pool[i];
                }
            }
        }
    }

};

