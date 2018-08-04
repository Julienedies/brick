/**
 * Created by j on 18/8/4.
 *  * 虚构进度数字
 */

brick.services.reg('progress', function(){
    return {
        current: 1,
        get: function () {
            var current = this.current;
            var add = current > 97 ? 0 : current > 72 ? Math.random() : Math.round(Math.random() * 16);
            current = this.current += add;
            return (current.toFixed(2) + '%').replace(/\.00/i, '');
        },
        init: function () {
            this.current = 1;
            return this;
        }
    };
});