/**
 * Created by j on 18/8/11.
 */

import $ from 'jquery'


// 用于多个弹出层数量统计
let count = 0;

export default {
    name: 'ic-popup',
    selfExec: true,
    once: true,
    fn: function () {

        const cla = 'active'
        const onShowCla = 'on-ic-popup-show';
        let $body = $(document.body);

/*        const popupCountStr = 'ic-popup-count';
        let popupCount = $body.data(popupCountStr);
        if(popupCount === undefined) {
            $body.data(popupCountStr, 0);
        }*/

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
            $popup.addClass(cla);
            $popup.trigger('ic-popup.show');
            $popup.scrollTop(0);
            count += 1;
            $body.addClass(onShowCla);
            //console.log(999,count);
        }

        function hide ($popup) {
            $(document).off('scroll', onScroll);
            $popup.off('scroll', onScroll);
            $popup.removeClass(cla);
            $popup.trigger('ic-popup.hide');
            $popup[0].scrollTop = 0;
            count -= 1;
            //console.log(999,count);
            if (count < 1) {
                $body.removeClass(onShowCla);
            }
        }

        function onScroll (e) {
            e.stopPropagation();
            e.preventDefault();
            return false;
        }

    }
}
