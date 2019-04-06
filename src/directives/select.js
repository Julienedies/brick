/**
 * ic-select  实现checkbox or radio 类似的功能
 * ic-select-cla  选中项的添加的样式类,默认 selected
 * [ic-select][ic-select-item]  定义子项选择符 jQuery选择符
 * [ic-select-item] 定义子项
 * [ic-select-type] 定义select类型,多选or单选 checkbox : radio 默认 radio
 * [ic-select-input] 关联的input, 会被赋值
 * Created by j on 18/7/18.
 */

import $ from 'jquery'
import brick from '../core/export'

export default function ($elm) {
    //console.info('exec ic-select', $elm[0]);

    let name = $elm.attr('ic-select');
    let cla = $elm.attr('ic-select-cla') || brick.get('ic-select-cla') || 'selected';
    let s_item = $elm.attr('ic-select-item') || '[ic-select-item]';
    let type = $elm.attr('ic-select-type') || 'radio';
    let on_change = $elm.icPp2('ic-select-on-change');
    let $input = $(`input[ic-select-input="${ name }"]`);
    let $items = $elm.find(s_item);

    // 如果没有item, 根据selector添加item
    if (!$items.length) {
        $items = $elm.find('>*').each(function () {
            $(this).attr('ic-select-item', +new Date);
        });
    }

    let $selected = $items.filter('[selected]');

    let callback
    if (type === 'checkbox') {
        // 设一个默认值
        $elm.data('ic-val', []);

        callback = function () {
            $(this).toggleClass(cla);
            let values = [];
            $items.filter('.' + cla).each(function () {
                let val = $(this).attr('ic-val')
                values.push(val);
            });
            //$elm.attr('ic-val', JSON.stringify(values));
            $elm.data('ic-val', values);
            let msg = {name: name, value: values};
            $elm.trigger('ic-select.change', msg);
            on_change && on_change.apply($elm, [msg]);
        }
    } else {
        callback = function () {
            $items.removeClass(cla);
            let $th = $(this).addClass(cla);
            let val = $th.attr('ic-val');
            let msg = {name: name, value: val};
            // 为关联的input赋值
            $input.val(val);
            $elm.attr('ic-val', val);
            $elm.trigger('ic-select.change', msg);
            on_change && on_change.apply($elm, [msg]);
        }
    }

    $elm.on('click', s_item, callback);

    $selected.click();

}
