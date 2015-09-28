/**
 * Created by julien.zhang on 2014/10/29.
 */


directives.add('ic-dialog', function ($elm, attrs) {

    var html = "<div class=\"t\" style=\"position:fixed; z-index: 100000; left:0; top:0; width:100%; height: 100%; overflow: auto; background: rgba(0,34,89,0.2);\"></div>";

    //只执行一次绑定
    if (!arguments.callee._run) {

        arguments.callee._run = 1;

        $(document).on('click', '[ic-dialog-href]', function (e) {
            var target = $(this).attr('ic-dialog-href');
            $('[ic-dialog=?]'.replace('?', target)).icDialog();
            return false;
        });

    }


    var $dialogContainer = $(html).appendTo('body').hide();

    var id = $elm.attr('ic-dialog');

    $elm.appendTo($dialogContainer);

    //处理js调用
    $elm.on('ic-dialog.call', function (e, param) {

        if(param === void(0)) return onShow(e);
        if (param === 'hide' || param == false) return onClose(e);
        onShow(e);
    });

    $elm.on('click', '[ic-role-dialog-confirm]', function (e) {
        onClose(e, 1);
    });


    $elm.on('click', '[ic-role-dialog-cancel], [ic-role-dialog-close]', function (e) {
        onClose(e, 0);
    });


    function onShow(e) {
        $dialogContainer.show();
        var width = $elm.width();
        $elm.css('margin-left', -width / 2);
        $elm.show();
        $elm.trigger('ic-dialog.show');
    }

    function onClose(e, type) {
        $dialogContainer.hide();
        $elm.hide();
        $elm.trigger('ic-dialog.close', type);
    }




});

