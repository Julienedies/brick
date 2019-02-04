/*!
 * Created by julien.zhang on 2014/12/9.
 */

import $ from 'jquery'
import _ from 'lodash'
import directives from './directives.js'

/**
 * 编译dom节点
 * @param node  dom or jquery object
 * @param is_start_form_children  {Boolean} 可选,  true 表示直接从子元素开始编译;  考虑: ic-tpl指令下, 从ic-tpl属性dom开始编译还是从子元素开始编译好?
 */
function compile (node, is_start_form_children) {

    let $elm = $(node);

    !is_start_form_children && __compile(node);

    let $children = $elm.children();
    let child;
    let i = 0;
    while (child = $children.eq(i)[0]) {
        i++;
        compile(child);
    }
}


function __compile (node) {

    node = node[0] || node;  // jquery对象转为dom对象
    if (node.nodeType != 1) return console.info('compile exit', node);

    let $elm = $(node);
    let attrs = node.attributes;

    let _directives = [];

    let priority = {
        'ic-ctrl': -1000
    };

    let j = 0;
    _.each(directives.get(), function (v, i, list) {

        if (typeof v === 'object' && v.priority) {
            priority[i] = v.priority;
            return;
        }
        priority[i] = j++;

    });


    let name;

    for (let i = 0, l = attrs.length; i < l; i++) {

        name = attrs[i].name;

        if (directives.get(name)) {
            _directives.push(name);
            continue;
        }

    }

    //对指令按优先级排序
    _directives.sort(function (a, b) {
        return priority[a] - priority[b];
    });

    //处理每一个指令
    while (name = _directives.shift()) {
        directives.exec(name, $elm, attrs);
    }

}

export default compile

