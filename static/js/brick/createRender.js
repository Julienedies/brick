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

    var tpl = $(root).html()
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/\b(ic-)(?=href|src|style|class|data|value)/g,'')
        .replace(/&amp;&amp;/g,'&&');

    //console.log(tpl)

    var tplf = _.template(tpl);
    tplf._tpl_ = tpl;
    return tplf;

}