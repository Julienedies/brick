/**
 * Created by j on 18/8/11.
 */

import $ from 'jquery'


export default {
    name: 'ic-popup',
    selfExec: true,
    once: true,
    fn: function () {
        const cla = 'active'
        const onShowCla = 'on-ic-popup-show';

        let count = 0; // 用于多个弹出层数量统计
        let _oldTop = 0;  // 弹出层出现前，默认滚动条位置，用于恢复到默认位置，需要在添加onPopupShowCla之前获取
        let $doc = $(document);
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


        $body.on('click', '[ic-popup-target]', function (e) {
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
            _oldTop = window.scrollY; // 默认滚动条位置，用于恢复到默认位置，需要在添加onPopupShowCla之前获取
            $(document).on('scroll', onScroll);
            $popup.on('scroll', onScroll);
            $popup.addClass(cla);
            $popup.trigger('ic-popup.show');
            $popup.scrollTop(0);
            count += 1;
            console.log('ic-popup count: ', count);
            $body.addClass(onShowCla);
        }

        function hide ($popup) {
            $(document).off('scroll', onScroll);
            $popup.off('scroll', onScroll);
            $popup.removeClass(cla);
            $popup.trigger('ic-popup.hide');
            $popup[0].scrollTop = 0;
            count -= 1;
            console.log('ic-popup count: ', count);
            if (count < 1) {
                $body.removeClass(onShowCla);
                window.scrollTo(0, _oldTop);
            }
        }

        function onScroll (e) {
            e.stopPropagation();
            e.preventDefault();
            return false;
        }

    }
}
