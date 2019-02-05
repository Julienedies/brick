/**
 * ic-ctrl
 * Created by julien.zhang on 2014/12/9.
 */

import controllers from '../controllers'

export default function ($elm, attrs) {

    if ($elm.data('ic-ctrl-scope')) return; // 每个dom对象只执行一次 controller factory

    let ctrlName = $elm.attr('ic-ctrl');

    if (ctrlName) {
        let $parent = $elm.parent().closest('[ic-ctrl]');
        let parentName = $parent.size() ? $parent.attr('ic-ctrl') : '';
        //controllers.exec(ctrlName, controllers.get(parentName), $elm);  // 在多个同名控制器的情况下,不能正确的按照dom结构进行继承
        controllers.exec(ctrlName, $parent.data('ic-ctrl-scope'), $elm);
    }

}
