/**
 * Created by julien.zhang on 2014/9/15.
 * 遍历dom节点，根据指令生成一个编译过的模板渲染函数
 */

function createRender(root) {

    root = root.cloneNode(true);

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

    var _tpl = $(root).html()
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/\b(ic-)(?=href|src|style|class|data|value)/g, '')
        //早期判断是否输出属性的实现，建议使用ic-has-[prop]指令取代
        .replace(/\bic-(\w+-)?(checked|disabled|selected|enabled)\s*=\s*"\s*((?:[^"]|\\")+)["]/g, function (m, $1, $2, $3) {
            if ($1 == 'has-') return m;
            $1 = $1 ? 'ic-' + $1 : '';  //处理自定义指令  ic-tab-checked
            //$3 = $3.replace(/^(?:"|')|(?:"|')$/g,'');
            return ' <% if(?3){ %> ?2 <% } %> '.replace('?3', $3).replace('?2', $1 + $2);
        })
        //实现ic-has-[prop]指令   处理两种情况=>  1: ic-has-checked  2: ic-has-tab-checked
        .replace(/\bic-has-([-_\w]+)\s*=\s*(["])((?:[^"]|\\["])+)\2/img, function (m, $1, $2, $3) {
            //$1 => 属性名   $3 => 表达式值
            console.log($1);
            console.log($3);
            $1 = /^checked|disabled|selected|enabled$/.test($1) ? $1 : 'ic-'+$1; //处理两种情况=>  1: ic-has-checked  2: ic-has-tab-checked
            return ' <% if(?3){ %> ?1 <% } %> '
                .replace('?3', $3)
                .replace('?1', $1);
            //.replace('?1',$1 + '=' + ('"<%= ? %>"'.replace('?', $3)));
        })
        .replace(/&amp;&amp;/g, '&&');

    //console.log(_tpl);

    var tpl_fn = _.template(_tpl);
    tpl_fn._tpl_ = _tpl;
    return tpl_fn;

}