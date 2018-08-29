/**
 * Created by julien.zhang on 2014/12/9.
 */

directives.reg('ic-ctrl', function ($elm, attrs) {

    if($elm.data('ic-ctrl-scope')) return; // 每个dom对象只执行一次 controller factory

    var ctrlName = $elm.attr('ic-ctrl');

    if(ctrlName){
        var $parent = $elm.parent().closest('[ic-ctrl]');
        var parentName = $parent.size() ? $parent.attr('ic-ctrl') : '';
        //controllers.exec(ctrlName, controllers.get(parentName), $elm);  // 在多个同名控制器的情况下,不能正确的按照dom结构进行继承
        controllers.exec(ctrlName, $parent.data('ic-ctrl-scope'), $elm);
    }

});