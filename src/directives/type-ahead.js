/**
 *  定义输入提示指令
 * Created by julien.zhang on 2014/11/13.
 */

import $ from 'jquery'
import brick from '../core/export'

export default function ($elm, attrs) {

    let $doc = $('body');

    let namespace = $elm.attr('ic-type-ahead');
    let onTypeComplete = $elm.icPp2('ic-on-type-done');
    let source = $elm.attr('ic-source-ajax');

    let offset = $elm.offset();
    let left = offset.left;
    let top = offset.top;
    let w = $elm.outerWidth();
    let h = $elm.outerHeight();

    let $selectList = $('[ic-type-list=?]'.replace('?', namespace));
    let tplf = brick.getTpl($selectList.attr('ic-tpl-name'));

    $selectList.appendTo($doc).css({top: top + h, left: left, 'min-width': w});

    let _pool;
    let pool;
    let ajax;
    let queryStr;
    let query;
    let keydownActive = 0;
    let keydownList;

    let done = function (data) {
        if (!data) return;
        if (!data.length) return $selectList.hide();
        pool = data;
        let html = tplf({model: data});
        $selectList.show().html(html);
    };

    if (source) {
        query = function (queryStr) {
            ajax = $.ajax({
                dataType: 'json',
                type: 'get',
                url: source,
                data: {key: queryStr}
            }).done(done);
        }
    } else {
        source = $elm.attr('ic-source');
        _pool = $elm.icParseProperty(source);
        query = function (queryStr) {
            let reg = new RegExp(queryStr, 'img');
            let result = _.filter(_pool, function (item, i, list) {
                if (_.isObject(item)) {
                    let result = _.filter(item, function (item) {
                        return reg.test(item);
                    });
                    return result.length;
                } else {
                    return reg.test(item);
                }
            });

            done(result);
        };

    }

////////////////////////////////////
// event
////////////////////////////////////

    $elm.on('focus', function (e) {
        let offset = $elm.offset();
        let left = offset.left;
        let top = offset.top;
        $selectList.css({top: top + h + 1, left: left});

    }).on('keyup', function (e) {

        let val = $elm.val();
        if (!val) return $selectList.hide();
        if (val === queryStr) return;

        queryStr = val;

        //取消上个请求
        ajax && ajax.abort();

        //新请求
        query(queryStr);

    }).on('keydown', function (e) {

        let keyCode = e.keyCode;
        if (!(keyCode === 38 || keyCode === 40 || keyCode === 13)) {
            keydownActive = 0;
            return
        }

        let list = $selectList.find('[ic-type-item]');
        if (!list.length) return;
        let max = list.length - 1;

        if (e.keyCode === 38) {
            keydownActive = --keydownActive < 0 ? max : keydownActive;
            list.eq(keydownActive).addClass('active').siblings().removeClass('active');
            return;
        }

        if (e.keyCode === 40) {
            keydownActive = ++keydownActive > max ? 0 : keydownActive;
            list.eq(keydownActive).addClass('active').siblings().removeClass('active');
            return;
        }

        if (e.keyCode === 13) {
            list.eq(keydownActive).trigger('mousedown');
            $elm.blur();
        }

    }).on('blur', function (e) {
        $selectList.fadeOut(function () {
            $selectList.hide();
        });
    });


    $selectList.on('mousedown', '[ic-type-item]', function (e) {
        let index = $(this).index();
        let item = pool[index];
        let val = $(this).attr('ic-type-item');
        $elm.val(val);
        $elm.trigger('type.complete', item);
        onTypeComplete && onTypeComplete.apply($elm[0], [e, item])
    });

}
