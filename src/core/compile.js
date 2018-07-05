/**
 * Created by julien.zhang on 2014/12/9.
 */

function compile(node){

    var $elm = $(node);

    __compile(node);

    var children = $elm.children();
    var child;
    var i = 0;
    while (child = children.eq(i)[0]) {
        i++;
        compile(child);
    }
}


function __compile(node){

    if(node.nodeType != 1) return console.info('compile exit', node);

    var $elm = $(node);
    var attrs = node.attributes;

    var _directives = [];

    var priority = {
        'ic-ctrl': -1000
    };

    var j = 0;
    _.each(directives.get(), function(v, i, list){

        if(typeof v === 'object' && v.priority){
            priority[i] = v.priority;
            return;
        }
        priority[i] = j++;

    });


    var name;

    for (var i = 0, l = attrs.length; i < l; i++) {

        name = attrs[i].name;

        if (directives.get(name)) {
            _directives.push(name);
            continue;
        }

    }

    //对指令按优先级排序
    _directives.sort(function(a, b){
        return priority[a] - priority[b];
    });

    //处理每一个指令
    while (name = _directives.shift()) {
        //console.log(name, $elm, attrs);
        directives.exec(name, $elm, attrs);
    }

}

