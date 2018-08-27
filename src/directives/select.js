/**
 * Created by j on 18/7/18.
 * ic-select  实现checkbox or radio 类似的功能
 * ic-select-cla  选中项的添加的样式类,默认 selected
 * [ic-select][ic-select-item]  定义子项选择符 jQuery选择符
 * [ic-select-item] 定义子项
 * [ic-select-type] 定义select类型,多选or单选 checkbox : radio 默认 radio
 */

brick.directives.reg('ic-select', function($elm){

var on_change = $elm.icPp2('ic-select-on-change');
var cla = $elm.attr('ic-select-cla') || brick.get('ic-select-cla') || 'selected';
var name = $elm.attr('ic-select');
var s_item = $elm.attr('ic-select-item') || '[ic-select-item]';
var type = $elm.attr('ic-select-type') || 'radio';
var $items =  $elm.find(s_item);

if(!$items.size()){
    $items = $elm.find('>*').each(function(){
        $(this).attr('ic-select-item', +new Date);
    });
}

var $selected = $items.filter('[selected]');

var callback = type == 'checkbox' ?
    function(){
        $(this).toggleClass(cla);
        var values = [];
        $items.filter('.'+cla).each(function(){
            values.push($(this).attr('ic-val'));
        });
        $elm.attr('ic-val', JSON.stringify(values));
        $elm.data('ic-val', values);
        var msg = {name:name, value: values};
        $elm.trigger('ic-select.change', msg);
        on_change && on_change.apply($elm, [msg]);
    }
    :
    function(){
        $items.removeClass(cla);
        var $th = $(this).addClass(cla);
        var val = $th.attr('ic-val');
        $elm.attr('ic-val', val);
        var msg = {name:name, value: val};
        $elm.trigger('ic-select.change', msg);
        on_change && on_change.apply($elm, [msg]);
    };

    $elm.on('click', s_item, callback);

    $selected.click();

});