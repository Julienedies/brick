/**
 * Created by j on 18/8/5.
 * 简单指令合集
 */

__inline('popup.js');


brick.directives.reg('ic-input-select', {
    selfExec: true,
    once: true,
    fn: function () {
        $(document.body).on('click', '[ic-input-select]', function (e) {

        });
    }
});

/**
 * 定义ic-toggle指令;
 */
brick.directives.reg('ic-toggle', {
    selfExec: true,
    once: true,
    fn: function () {
        $(document.body).on('click', '[ic-toggle]', function (e) {
            var name = $(this).attr('ic-toggle');
            $('[ic-toggle-target=?]'.replace('?', name)).toggle();
        });
    }
});

/**
 * 定义ic-close指令;
 */
brick.directives.reg('ic-close', {
    selfExec: true,
    once: true,
    fn: function () {
        $(document.body).on('click', '[ic-close]', function (e) {
            var $th = $(this);
            $th.closest('[ic-close-target]').toggle();
        });
    }
});

/**
 * 定义ic-checkbox指令;
 */
brick.directives.reg('ic-checkbox', {
    selfExec: true,
    once: true,
    fn: function () {
        $(document.body).on('click', '[ic-checkbox]', function (e) {
            if(this !== e.target) return;
            var $th = $(this);
            if (this.hasAttribute('selected')) {
                $th.removeAttr('selected').removeClass('selected');
            } else {
                $th.attr('selected', true).addClass('selected');
            }
            $th.trigger('ic-checkbox.change', {name: $th.attr('ic-checkbox')});
        });
    }
});

/**
 * 定义ic-dom-clone指令;
 */
brick.directives.reg('ic-dom-clone', {
    selfExec: true,
    once: true,
    fn: function () {
        $(document.body).on('click', '[ic-dom-clone]', function (e) {
            var $th = $(this);
            $th.prev('[ic-dom]').clone(true).insertBefore($th);
        });
    }
});

/**
 * 定义ic-dom-remove指令;
 */
brick.directives.reg('ic-dom-remove', {
    selfExec: true,
    once: true,
    fn: function () {
        $(document.body).on('click', '[ic-dom-remove]', function (e) {
            var nextAll = $(this).nextAll('[ic-dom]');
            nextAll.length > 1 && nextAll.eq(nextAll.length - 1).remove();
        });
    }
});

