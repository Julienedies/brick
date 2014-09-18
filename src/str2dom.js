/**
 * Created by julien.zhang on 2014/9/18.
 */


function str2dom(html, tree){

    var tree = tree || [];

    var split_reg = /(?=<\/?\w+[^>]*>)/m;
    var elm_reg = //;

    html.split('')


}

$(function(){

    var html = $('div').html();


})


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