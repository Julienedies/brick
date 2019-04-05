/**
 * Created by j on 18/8/11.
 */

import $ from 'jquery'

export default {
    name: 'ic-popup',
    selfExec: true,
    once: true,
    fn: function () {

        let cla = 'active'
        let onShowCla = 'on-ic-popup-show';
        let $body = $(document.body);
        // 用于多个弹出层
        let count = 0;

        // jquery接口
        $.fn.icPopup = $.fn.icPopup || function (opt) {
            opt ? show(this) : hide(this);
        };

        $body
            .on('click', '[ic-popup-target]', function (e) {
                let name = $(this).attr('ic-popup-target');
                let $popup = $('[ic-popup=?]'.replace('?', name));
                show($popup);
            })
            .on('click', '[ic-popup-close]', function (e) {
                let name = $(this).attr('ic-popup-close');
                let $popup = name ? $('[ic-popup=?]'.replace('?', name)) : $(this).closest('[ic-popup]');
                hide($popup);
            });

        function show ($popup) {
            $(document).on('scroll', onScroll);
            $popup.on('scroll', onScroll);
            $popup.addClass(cla)
            $popup.scrollTop(0);
            count += 1;
            $body.addClass(onShowCla);
        }

        function hide ($popup) {
            $(document).off('scroll', onScroll);
            $popup.off('scroll', onScroll);
            $popup.removeClass(cla)
            $popup[0].scrollTop = 0;
            count -= 1;
            if (count < 1) {
                $body.removeClass(onShowCla);
            }
        }

        function onScroll (e) {
            console.log('on scroll', e)
            e.stopPropagation();
            e.preventDefault();
            return false;
        }

    }
}
