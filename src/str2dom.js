/**
 * Created by julien.zhang on 2014/9/18.
 * 分解html为一个字符串数组，以此为基础进行比较，如果有变化，则对dom进行精确更新；
 */


function str2dom(html, tree){

    var tree = tree || [];

    html = html.replace(/\s{2,}/g,' ')

    var list = html.split(/(?=<\/?\w+[^>]*>)/m);

    var i = 0;

    while(i < list.length){
        var v = list[i];
        var arr = v.split('');
        var str = arr.reverse().join('');
        arr = str.split(/(?=>[^<]*\/?<)/m);
        _.forEach(arr,function(v, i, list){
            var arr = v.split('');
            var str = arr.reverse().join('');
            list[i]=str;
        });

        arr.reverse();
        arr.unshift(1);
        arr.unshift(i);
        Array.prototype.splice.apply(list, arr);
        i = i+arr.length - 2;
    }


    return list;

}

function diff(a1, a2){

}

//$(function(){
//
//    $('p span').addClass('red')
//    var html = $('p').html().replace(/\n/g,'');
//    _cc(html)
//    var list = html.split(/(?=<\/?\w+[^>]*>)/m);
//
//    var i = 0;
//    while(i < list.length){
//        var v = list[i];
//        var arr = v.split('');
//        var str = arr.reverse().join('');
//        arr = str.split(/(?=>[^<]*\/?<)/m);
//        _.forEach(arr,function(v, i, list){
//            var arr = v.split('');
//            var str = arr.reverse().join('');
//            list[i]=str;
//        });
//
//        arr.reverse();
//        arr.unshift(1);
//        arr.unshift(i);
//        Array.prototype.splice.apply(list, arr);
//        i = i+arr.length - 2;
//    }
//
//
//    return list;
//
//})


/*
 <div ic-ctrl="listCtrl">

 <ul ic-init="var list = data.list;" ic-if="list">
 <li ic-for="var i in list" ic-for-init="var item = list[i]" ic-if="typeof item === 'object' ">

 <i ic-for="var j in item" ic-style="color:{{j}}">
 {{i+'-'+j}} = {{item[j]}}<br/>
 </i>

 </li>
 </ul>
 <p ic-if="!list">loading...</p>

 </div>
 */