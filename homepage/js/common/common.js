/**
 * Created by julien.zhang on 2014/10/11.
 */

window.GLOBAL = {
    util:{
        codeFormat: function(s){
            return s.replace(/_[A-Z]+$/,'');
        },
        nameFormat: function(s){
            return s.replace(/-[AH]/,'');
        },
        dFormat:function(d,opt){
            if(!d) return d;
            if(isNaN(d*1)) return d;
            d = (d*1).toFixed(2).replace(/0+$/,'').replace(/\.$/,'');
            var _dd = (d+'').split('.');
            var d1 = _dd[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g,'$1,');
            var d2 = _dd[1];

            return  d1+ (d2 ? '.' + d2 : '');
        }
    }
};

function toLogin(){
    $('[ic-dialog="login"]').icDialog();
}

//alert登录控制器
brick.controllers.add('alertLoginCtrl', function(scope){

    scope.action = function(){
        $('[ic-form="alertLogin"]').submit();
        $(this).clearLoading();
    };

    //登录请求发起前
    scope.before = function(f){

        console.log('发起登录请求前', f);

    };

    //登录完成
    scope.done = function (data) {
        if(data.code == 0){
            return $('[role=status]').text('用户名或密码错误');
        }
        console.log('登录成功' , data);
        location.reload()
    };

    //登录请求失败
    scope.failed = function(msg){

        console.log('登录失败', msg);

    }

});


brick.services.add('myStocks', function(){

    return {
        add : {

            before: function(){
                var code = $(this).data('code');
                $(this).icAjax({data:{secu:code}});
            },
            done: function(msg){
                var th = $(this);
                var cla = th.attr('class');
                cla = cla.replace('-add','-ok');
                th.removeClass().addClass(cla);
                th.icAjax({disabled:true});
            },
            failed: function(){
                return toLogin();
            }

        }
    };

});

//通用控制器
brick.controllers.reg('baseCtrl', function(scope, myStocks){

    //添加自选股
    scope.myStocks = myStocks;



}, {depend:['myStocks']});

//header控制器
brick.controllers.reg('headerCtrl', function(scope){


    $('[ic-type-ahead="topSearch"]').on('type.complete', function(e, msg){
        console.log(msg)
        $('[ic-tpl="topSearch"]').find('a[href="/stock/profile/?"]'.replace('?',msg.code)).click();
        window.open('/stock/profile/'+msg.code);
    });

    scope.topSearch = {
        complete: function(e, msg){

        }
    }

});

//股票页面header控制器
brick.controllers.reg('companyHeaderCtrl', function(scope){
    var $elm = $('[ic-ctrl=companyHeaderCtrl]');

    $elm.find('[role="searcheEnter"]').on('click', function(e){
        $elm.find('[role=searchInput]').css('visibility','visible').animate({width:240});
    });


    $elm.on('click', '[role="addBtn"]', function(e){
        $elm.find('[ic-ajax]').icAjax();
    });


    scope.add = {
        always: function(){
            var th = $(this);
            if(th.attr('ic-ajax-disabled') === 'true'){
                th.parent().addClass('btn-tab-g1').removeClass('btn-tab-1');
                th.next().text('已添加了该股票');
            }
        }
    }
});


//注册提示
!function($){

    var regBox = $('#reg-prompt-box');

    if(!regBox.size()) return;

    $('#footer').css({'padding-bottom':'120px'});

    var win = $(window);
    var vh = win.height();
    var doc = $(document);

    if(doc.scrollTop() > vh/2 || doc.height() <= vh) {
        regBox.show().fadeIn();
    }

    var fn = function () {
        var s = doc.scrollTop();

        (s <= vh/2) ? regBox.fadeOut(function(){
            regBox.hide();
        }) : regBox.fadeIn();
    };

    var throttled = _.throttle(fn, 60);

    win.on("scroll", throttled);


}(jQuery);