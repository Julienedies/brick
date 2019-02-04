/**
 * Created by Julien on 2015/7/10.
 */


directives.reg({
    name: 'ic-checkbox',
    selfExec: true,
    once: true,
    fn: function ($elm, attrs) {

        $('[ic-checkbox][ic-checkbox-selected=true]').addClass('selected');

        $('body').on('click', '[ic-checkbox]', function (e) {
            $(this).addClass('selected');
        });

        $.fn.icCheckbox = function (call, param) {
            return map[call] && map[call].apply(this, [param]);
        };

        var map = {
            val: function () {
                var name = this.attr('ic-checkbox');
                var arr = [];
                this.sibling().filter('[ic-checkbox=?]'.replace('?', name)).each(function (i) {
                    arr.push(this['ic-checkbox-val']);
                });
                return arr;
            }
        };

    }

});

