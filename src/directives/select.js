/**
 * ic-select  实现checkbox or radio 类似的功能
 * ic-select-cla  选中项的添加的样式类,默认 selected
 * [ic-select][ic-select-item]  定义子项选择符 jQuery选择符
 * [ic-select-item] 定义子项
 * [selected] 默认选中项
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
    let isAuto = $elm.attr('ic-select-auto');  // 是否自动触发首次change事件, 默认自动触发
    let onChange = $elm.icPp2('ic-select-on-change');
    let $input = $(`input[ic-select-input="${ name }"]`);
    let $items = $elm.find(s_item);

    let time = 0;  // 记录change触发次数

    function count () {
        setTimeout(() => {
            time += 1;
        }, 30);
    }

    // 如果没有item, 根据selector添加item
    if (!$items.length) {
        $items = $elm.find('>*').each(function () {
            $(this).attr('ic-select-item', +new Date);
        });
    }

    let $selected = $items.filter('[selected]').addClass(cla);
    if (!$selected.length) {
        $selected = $items.filter('.' + cla);
    }

    let callback;  // 设置 radio 或 checkbox 不同类型下的点击回调函数
    if (type === 'checkbox') {

        let setVal = () => {
            let values = [];
            $items.filter('.' + cla).each(function () {
                let val = $(this).attr('ic-val');
                val && values.push(val);
            });
            $elm.data('ic-val', values);
            return values;
        }

        // 初始设值
        setVal();

        callback = function () {
            let $th = $(this);
            let change = $th.toggleClass(cla).attr('ic-val');
            let values = setVal();
            let msg = {name: name, value: values, change, selected: $th.hasClass(cla), time};

            //console.log('ic-select.change', msg);
            $elm.trigger('ic-select.change', msg);
            $elm.trigger('change', msg);
            onChange && onChange.apply($elm, [msg]);
            count();
        }
    } else {

        // 设初始值
        $elm.attr('ic-val', $selected.attr('ic-val') || '');

        callback = function () {
            let $th = $(this);
            let isHas = $th.hasClass(cla);
            let val = '';
            let selected; //
            let change = $th.attr('ic-val');
            if (isHas) {
                $th.removeClass(cla);
                selected = false;
            } else {
                $items.removeClass(cla);
                $th.addClass(cla);
                val = change;
                selected = true;
            }
            let msg = {name: name, value: val, change, selected, time};
            // 为关联的input赋值
            $input.val(val);
            $elm.attr('ic-val', val);
            /*            if(typeof val === 'undefined'){
                            $elm.removeAttr('ic-val');
                        }else{
                            $elm.attr('ic-val', val);
                        }*/

            // console.log('ic-select.change', msg);
            $elm.trigger('ic-select.change', msg);
            $elm.trigger('change', msg);
            onChange && onChange.apply($elm, [msg]);
            count();
        }
    }

    $elm.on('click', s_item, callback);

    // 默认都会在tpl渲染后执行指令解析时，执行一次点击，这次点击会添加cla，
    if (!isAuto) {
        $selected.not('.' + cla).click();
        count();
    } else {

        // 这段代码其实已经没有用了，已经在前面添加了cla
        $selected.addClass(cla);
    }

}
