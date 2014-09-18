/**
 * Created by julien.zhang on 2014/9/15.
 *
 * 服务管理器 （任意类型的数据，模型对象，UI组件都可以做为服务存在；通常是单例对象）
 */

var services = (function() {

    var services = {};
    var registry = {};

    return {
        _look: function () {
            console.log(registry);
        },
        /**
         * 注册服务
         * @param name {String}    服务ID
         * @param serve {Function} 服务的工厂函数
         * @param depend {Array}   可选，依赖的其它服务
         */
        add: function (name, serve, depend) {
            registry[name] = {depend: depend, serve: serve};
        },
        /*
         * 实例化一个服务
         */
        create: function (name) {
            var that = this;
            var info = registry[name];

            if (!info) return;

            var depend = info.depend;
            if (depend) {
                depend = that.get(depend);
            }
            return info.serve.apply(null, depend || []);
        },

        /**
         * 直接注册一个已经实例化的服务
         * @param name {String} 服务ID
         * @param service {*}   任意数据对象
         */
        fill: function (name, service) {
            services[name] = service;
        },

        /**
         * 获取一个服务实例
         * @param name {String} 服务器ID
         * @return 服务 {*}  任意类型，取决于当初注册时的服务对象
         */
        get: function (name) {
            var that = this;
            if (!name) return;

            //外部get
            if (typeof name === 'string') {
                return services[name] = services[name] || that.create(name);
            }

            //内部get
            if (name.constructor === Array) {

                name = name.slice();

                for (var i = 0, v, len = name.length; i < len; i++) {
                    v = name[i];
                    name[i] = services[v] = services[v] || that.create(v);
                }

                return name;
            }
        }
    };

})();