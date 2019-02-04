/**
 * Created by Julien on 2015/9/1.
 */


/**
 *
 * @param hash
 * @param handler
 * @returns {Window.brick|*}
 */
brick.addRoute = function (hash, handler) {

    if(hash == '') {
        hash = '/';
    }

    function f(hash, handler) {
        return brick.on('ic-hashChange.' + hash, handler);
    }

    //开启hashchange事件监听
    brick.config.set('ic-hashChange.enable', true);

    f(hash, handler);

    brick.addRoute = f;

    return brick;

};

/**
 *
 * @param hash
 * @param handler
 * @returns {*}
 */
brick.removeRoute = function (hash, handler) {
    return brick.off('ic-hashChange.' + hash, handler);
};