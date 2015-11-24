/**
 * Created by julien.zhang on 2014/12/9.
 */

directives.add('ic-ctrl', function ($elm, attrs) {

    var ctrlName = $elm.attr('ic-ctrl');

    if(ctrlName){
        var $parent = $elm.parent().closest('[ic-ctrl]');
        //var parentName = $parent.size() ? $parent.attr('ic-ctrl') : '';
        controllers.exec(ctrlName, $parent.data('ic-ctrl-scope'), $elm);
        //controllers.exec(ctrlName, controllers.get(parentName), $elm);
    }

});