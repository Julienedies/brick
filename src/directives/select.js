/**
 * Created by j on 18/7/18.
 * ic-select  实现checkbox or radio 类似的功能
 * ic-select-cla  选中项的添加的样式类,默认 selected
 * [ic-select][ic-select-item]  定义子项选择符 jQuery选择符
 * [ic-select-item] 定义子项
 * [ic-select-type] 定义select类型,多选or单选 checkbox : radio 默认 radio
 */

brick.directives.reg('ic-select', function($elm){

var cla = $elm.attr('ic-select-cla') || brick.get('ic-select-cla') || 'selected';
var name = $elm.attr('ic-select');
var s_item = $elm.attr('ic-select-item') || '[ic-select-item]';
var type = $elm.attr('ic-select-type') || 'radio';

var $items =  $elm.find(s_item);

    if(!$items.size()){
        $elm.find('>*').each(function(){
            $(this).attr('ic-select-item', +new Date);
        });
    }

var callback = type == 'checkbox' ?
    function(){
        $(this).toggleClass(cla);
        $elm.trigger('ic-select.change', {name:name});
    }
    :
    function(){
        var $th = $(this).addClass(cla);
        $(this).siblings().removeClass(cla);
        $elm.trigger('ic-select.change', {name:name});
    };

    $elm.on('click', s_item, callback);

});