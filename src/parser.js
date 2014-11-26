/**
 * Created by julien.zhang on 2014/9/12.
 *
 * 主要用于解析一个dom节点上绑定的操作
 *
 */

function parser(node) {


    if (node.nodeType == 1) {

        var elm = $(node);
        var attrs = node.attributes;

        var directives = [];

        var priority = {
            'skip': -100,
            'init': -10,
            'for': 0,
            'for-init': 10,
            'if': 100,
            'if-init': 110,
            'else': 100,
            'bind': 1000
        };


        for (var i = 0, attr, name, value, l = attrs.length; i < l; i++) {

            attr = attrs[i];

            name = attr.name;
            value = attr.value;

            if (/^ic-(init|for|if|else|bind|skip)/.test(name)) {
                directives.push([name, value]);
                continue;
            }

            try{
                //typeof value === 'string' && elm.attr(name, value.replace(/{{(.+?)}}/g, '<%= $1 %>'));
            }catch(e){
                _cc(e);
            }

        }

        //对指令按优先级排序
        directives.sort(function(a, b){
            return priority[a[0].replace(/^ic-/,'')] - priority[b[0].replace(/^ic-/,'')];
        });

        //处理每一个指令
        while (attr = directives.shift()) {

            name = attr[0];
            value = attr[1];

            if (/-skip$/.test(name)) {
                elm.remove();
                return;
            }

            if (/-init$/.test(name)) {
                elm.before('\r\n<% ' + value + ' %>\r\n');
                continue;
            }

            if (/-for$/.test(name)) {
                elm.before('<% for(' + value + '){ %>\r\n');
                elm.after('\r\n<% } %>');
                continue;
            }

            if (/-if$/.test(name)) {
                elm.before('<% if(' + value + '){ %>\r\n');
                elm.after('\r\n<% } %>');
                continue;
            }

            if (/-else$/.test(name)) {
                elm.before('<% else{ %>\r\n');
                elm.after('\r\n<% } %>');
                continue;
            }

            if (/-bind$/.test(name)) {
                elm.html('\r\n<%= ' + value + ' %>\r\n');
                continue;
            }

        }

        return;

    }

    if (node.nodeType == 3) {

        var text = node.nodeValue;

        node.nodeValue = text.replace(/{{(.+?)}}/g, '<%= $1 %>');

    }


}