/**
 * Created by j on 18/8/11.
 */

brick.directives.reg({
    name: 'ic-popup',
    selfExec: true,
    once: true,
    fn: function () {

        var on_show_cla = 'on-ic-popup-show';
        var $body = $(document.body);

        function on_show($popup){
            $popup.on('scroll', on_scroll);
            $popup.show();
            $popup.scrollTop(0);
            $body.addClass(on_show_cla);
        }

        function on_hide($popup){
            $popup.off('scroll', on_scroll);
            $popup.hide();
            $popup[0].scrollTop = 0;
            $body.removeClass(on_show_cla);
        }

        function on_scroll (e){
            e.stopPropagation();
        }

        // jquery接口
        $.fn.icPopup = $.fn.icPopup || function(opt){
            opt ? on_show(this) : on_hide(this);
        };

        $body.on('click', '[ic-popup-target]', function (e) {
                var name = $(this).attr('ic-popup-target');
                var $popup = $('[ic-popup=?]'.replace('?', name));
                on_show($popup);
                //$body.scrollTop() + $body.height()
            })
            .on('click', '[ic-popup-close]', function(e){
                var name = $(this).attr('ic-popup-close');
                var $popup = name ? $('[ic-popup=?]'.replace('?', name)) : $(this).closest('[ic-popup]');
                on_hide($popup);
            });
    }
});