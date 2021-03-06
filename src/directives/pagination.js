/**
 * Created by julien.zhang on 2014/10/20.
 */

import $ from 'jquery'
import brick from '../core/export'

export default function ($elm, attrs) {

    let th = $elm;
    let namespace = th.attr('ic-pagination');
    let rows = $elm.attr('ic-pagination-rows') * 1 || 10;
    let onChangeCall = th.attr('ic-pagination-on-change');
    let total = $elm.attr('ic-pagination-total') * 1;
    let step = $elm.attr('ic-pagination-step') * 1 || 10;
    let current = $elm.attr('ic-pagination-current') || 1;
    let ellipsis = $elm.find('[ic-role-pagination-ellipsis]')[0].outerHTML;
    let placeholder = /\{\{\}\}/g;
    let $tpl = $elm.prev('[ic-tpl=?]'.replace('?', namespace));
    let tplf;

    let pool;
    let onchange;
    let source = $elm.attr('ic-source-ajax');

    if (source) {
        /*$.ajax({
         url:source
         }).done(function(data){
         let html = brick._tplfs[namespace]({model:data});
         $tpl.html(html);
         });*/
    } else {
        source = $elm.attr('ic-source');
        if (source) {
            pool = $elm.icParseProperty(source);
            total = Math.ceil(pool.length / rows);
            onchange = function (page) {
                --page;
                let start = page * rows - 1 < 0 ? 0 : page * rows;
                let end = start + rows;
                let _list = pool.slice(start, end);
                let list = [];
                let item;
                for (; item = _list.shift(); start++) {
                    list[start] = item;
                }
                let html = brick.getTpl(namespace)({model: list});
                $tpl.html(html).show();
            };
        } else {
            pool = $('[ic-role-pagination-page=?]'.replace('?', namespace)).children();
            if (pool.length) {
                total = Math.ceil(pool.length / rows);
                onchange = function (page) {
                    --page;
                    let start = page * rows - 1 < 0 ? 0 : page * rows;
                    let end = start + rows;
                    pool.hide();
                    pool.slice(start, end).show();
                };
            }
        }
    }

    let prev = th.find('[ic-role-pagination-prev]').on('click', function (e) {
        if (current < 2) return;
        --current;
        createNums();
    });
    let next = th.find('[ic-role-pagination-next]').on('click', function (e) {
        if (current >= total) return;
        ++current;
        createNums();
    });
    let num = th.find('[ic-role-pagination-num]');
    let html = num[0].outerHTML;

    function createNums () {

        let j = Math.floor(step / 2);
        let k;
        let r = [];

        j = current - j;

        let i = j = j < 1 ? 1 : j;
        k = j + step - 1;
        k = k >= total ? total : k;
        i = j = k + step >= total ? k - step < 1 ? 1 : k - step : i;

        for (; j <= k; j++) {
            r.push(html.replace(placeholder, j));
        }

        if (i > 1) {
            r.unshift(ellipsis);
            r.unshift(html.replace(placeholder, 1));
        }

        if (total - k > 2) {
            r.push(ellipsis);
            r.push(html.replace(placeholder, total));
        }

        current === 1 ? prev.addClass('disabled') : prev.removeClass('disabled');
        current === total ? next.addClass('disabled') : next.removeClass('disabled');
        prev.siblings().not(next).remove();

        $(r.join('')).insertAfter(prev).filter('[ic-role-pagination-num=' + current + ']').addClass('active');

        onchange && onchange(current);
        $elm.trigger('ic-pagination.change', current);

    }


    setTimeout(createNums, 30);

    th.on('click', '[ic-role-pagination-num]', function (e) {

        let num = $(this).attr('ic-role-pagination-num') * 1;
        if (current === num) return;
        current = num * 1;
        createNums();

    });


}
