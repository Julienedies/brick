/**
 * 主要用于解析一个dom节点上绑定的tpl指令
 * Created by julien.zhang on 2014/9/12.
 */

import $ from 'jquery'

export default function parser(node) {

    if (node.nodeType === 1) {

        let elm = $(node);
        let attrs = node.attributes;

        let directives = [];

        let priority = {
            'skip': -100,
            'init': -10,
            'for': 0,
            'for-start': 1,
            'for-init': 10,
            'if': 100,
            'else-if': 99,
            'if-start': 100,
            'if-init': 110,
            'else': 100,
            'bind': 1000,
            'if-end': 10000,
            'for-end': 10000,
            'nest': 10001
        };


        for (let i = 0, attr, name, value, l = attrs.length; i < l; i++) {

            attr = attrs[i];

            name = attr.name;
            value = attr.value;

            if (/^ic-(skip|init|for|if|else|bind)/.test(name) || /\{\{.+?\}\}/.test(value)) {
                directives.push([name, value]);
                //continue;
            }

        }

        //对指令按优先级排序
        directives.sort(function (a, b) {
            return priority[a[0].replace(/^ic-/, '')] - priority[b[0].replace(/^ic-/, '')];
        });


        //处理每一个指令
        let attr;
        while (attr = directives.shift()) {

            let name = attr[0];
            let value = attr[1];

            if (/-skip$/.test(name)) {
                elm.remove();
                return;
            }

            if (/-init$/.test(name)) {
                elm.before('\r\n<% var ' + value.replace(/[;](?=\s*[_\w]+\s*=)/g, ';var ') + ' %>\r\n');
                elm.removeAttr(name);
                continue;
            }

            if (/-for$/.test(name)) {
                //elm.before('<% for( var ' + value + '){ %>\r\n');
                // old reg /^\s*(?:(\w+?)\s*\,\s*)?(\w+?)\s*in\s*((?:[\w.]+)|(?:\[[^\[\]]+\]))\s*$/
                elm.before(value.replace(/^\s*(?:(\w+?)\s*\,\s*)?(\w+?)\s*in\s*(.+)\s*$/, function (m, $1, $2, $3, t) {
                    if ($1 && $2) return '<% for( var ' + $1 + ' in ' + $3 + '){ var ' + $2 + ' = ' + $3 + '[' + $1 + ']; %>\r\n';
                    return '<% for( var ' + m + '){ %>\r\n';
                }));
                elm.after('\r\n<% } %>');
                elm.removeAttr(name);
                continue;
            }

            if (/-for-start$/.test(name)) {
                elm.before(value.replace(/^\s*(?:(\w+?)\s*\,\s*)?(\w+?)\s*in\s*([\w.]+)/, function (m, $1, $2, $3, t) {
                    if ($1 && $2) return '<% for( var ' + $1 + ' in ' + $3 + '){ var ' + $2 + ' = ' + $3 + '[' + $1 + ']; %>\r\n';
                    return '<% for( var ' + m + '){ %>\r\n';
                }));
                elm.removeAttr(name);
                continue;
            }

            if (/-for-end$/.test(name) || /-if-end$/.test(name)) {
                elm.after('\r\n<% } %>');
                elm.removeAttr(name);
                continue;
            }

            if (/-else-if$/.test(name)) {
                elm.before('<% } else if(' + (value === '' ? void(0) : value) + '){ %>\r\n');
                elm.removeAttr(name);
                continue;
            }

            if (/-if$/.test(name)) {
                elm.before('<% if(' + (value === '' ? void(0) : value) + '){ %>\r\n');
                elm.after('\r\n<% } %>');
                elm.removeAttr(name);
                continue;
            }

            if (/-if-start$/.test(name)) {
                elm.before('<% if(' + (value === '' ? void(0) : value) + '){ %>\r\n');
                elm.removeAttr(name);
                continue;
            }

            if (/-else$/.test(name)) {
                elm.before('<% } else{ %>\r\n');
                elm.after('\r\n<% } %>');
                elm.removeAttr(name);
                continue;
            }

            if (/-bind$/.test(name)) {
                elm.html('\r\n<%= ' + (value === '' ? '\"\"' : value) + ' %>\r\n');
                elm.removeAttr(name);
                continue;
            }

            if (/^ic-(?:href|src|style|class|data|value)$/.test(name)) {
                elm.removeAttr(name);
                elm.attr(name, value.replace(/{{(.+?)}}/g, '<%= $1 %>'));
                continue;
            }

            elm.attr(name, value.replace(/{{(.+?)}}/g, '<%= $1 %>'));

        }

        return;

    }

    if (node.nodeType === 3) {

        let text = node.nodeValue;

        node.nodeValue = text.replace(/{{(.+?)}}/g, '<%= $1 %>');

    }


}
