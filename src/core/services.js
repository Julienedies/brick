/**
 * 服务管理器 （任意类型的数据，模型对象，UI组件都可以做为服务存在；通常是单例对象）
 * Created by julien.zhang on 2014/9/15.
 */

const services = {};
const registry = {};

export default {
    _look: function () {
        console.log(registry);
    },
    /**
     * 注册服务
     * @param name {String}    服务ID
     * @param factory {Function} 服务的工厂函数
     * @param [conf] {Array|Object}   可选，依赖的其它服务
     */
    reg: function (name, factory, conf) {
        let depend = conf && (conf.constructor === Array ? conf : conf.depend);
        registry[name] = {depend: depend, serve: factory, conf: conf};
    },
    /*
     * 实例化一个服务
     */
    create: function (name) {
        let that = this;
        let serv = registry[name];

        if (!serv) return;

        let depend = serv.depend;
        if (depend) {
            depend = that.get(depend);
        }

        window[name] = serv.serve.apply(null, depend || []);
        return window[name];
    },

    /**
     * 直接注册一个已经实例化的服务
     * @param name {String} 服务ID
     * @param service {*}   任意数据对象
     */
    add: function (name, service) {
        //services[name] = service;
        this.fill(name, service)
    },
    fill: function (name, service) {
        services[name] = service;
    },
    /**
     * 获取一个服务实例
     * @param name {String|Array} 服务器ID
     * @return 服务 {*}  任意类型，取决于当初注册时的服务对象
     */
    get: function (name) {
        let that = this;
        if (!name) return undefined;

        //外部get
        if (typeof name === 'string') {
            return services[name] = services[name] || that.create(name);
        }

        //内部get
        if (name.constructor === Array) {

            name = name.slice();

            for (let i = 0, v, len = name.length; i < len; i++) {
                v = name[i];
                name[i] = services[v] = services[v] || that.create(v);
            }

            return name;
        }
    }
}

