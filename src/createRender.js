/**
 * Created by julien.zhang on 2014/9/15.
 *
 * 遍历dom节点，根据指令生成一个编译过的模板渲染函数
 *
 */

function createRender(root) {

    //遍历dom节点，解析指令
    (function (node) {

        parser(node);

        var children = $(node).contents();
        var child;
        var i = 0;
        while (child = children.eq(i)[0]) {
            i++;
            arguments.callee(child);
        }

    })(root);

    var tmpl = $(root).html().replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\b(ic-)(?=href|src|style)/g,'');

    //_cc(tmpl);

    window.console && console.log(tmpl);

    return _.template(tmpl);

}