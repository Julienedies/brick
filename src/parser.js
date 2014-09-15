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
        //var attrs = [];
        var attr;



        for (var i = 0, l = attrs.length; i < l; i++) {

            attr = attrs[i];

            //elm.attr(attr.name, attr.value && attr.value.replace(/{{(.+?)}}/g, '<%= $1 %>'));


            if (/-init$/.test(attr.name)) {
                elm.before('\r\n<% ' + attr.value + ' %>\r\n');
                return;
            }

            if (/-for$/.test(attr.name)) {
                elm.before('<% for(' + attr.value + '){ %>\r\n');
                elm.after('\r\n<% } %>');
                return;
            }

            if (/-if$/.test(attr.name)) {
                elm.before('<% if(' + attr.value + '){ %>\r\n');
                elm.after('\r\n<% } %>');
                return;
            }

            if (/-bind$/.test(attr.name)) {
                elm.html('\r\n<%= ' + attr.value + ' %>\r\n');
                return;
            }

        }

        return;

    }

    if (node.nodeType == 3) {

        var text = node.nodeValue;

        node.nodeValue = text.replace(/{{(.+?)}}/g, '<%= $1 %>');

    }


}