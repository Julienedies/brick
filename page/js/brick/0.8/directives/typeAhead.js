/**
 * Created by julien.zhang on 2014/11/13.
 * 定义输入提示指令
 */

directives.reg('ic-type-ahead', function ($elm, attrs) {

    var $doc = $('body');

    var namespace = $elm.attr('ic-type-ahead');
    var onTypeComplete = $elm.attr('ic-on-type-complete');
    onTypeComplete = $elm.icParseProperty(onTypeComplete);
    var source = $elm.attr('ic-source-ajax');

    var offset = $elm.offset();
    var left = offset.left;
    var top = offset.top;
    var w = $elm.outerWidth();
    var h = $elm.outerHeight();

    var $selectList = $('[ic-role-list=?]'.replace('?', namespace));
    var tplf = brick.getTpl($selectList.attr('ic-tpl'));

    $selectList.appendTo($doc).css({top: top + h, left: left, 'min-width': w});

    var _pool;
    var pool;
    var ajax;
    var queryStr;
    var query;
    var keydownActive = 0;
    var keydownList;

    var done = function (data) {
        if (!data) return;
        if (!data.length) return $selectList.hide();
        pool = data;
        var html = tplf({model: data}); //ie7模板函数会报错，有时间fix;
        $selectList.show().html(html);
    };

    if (source) {
        query = function (queryStr) {
            ajax = $.ajax({
                dataType: 'json',
                type: 'post',
                url: source,
                data: {query: queryStr}
            }).done(done);
        }
    } else {
        source = $elm.attr('ic-source');
        _pool = $elm.icParseProperty(source);
        query = function (queryStr) {
            var reg = new RegExp(queryStr, 'img');
            var result = _.filter(_pool, function (item, i, list) {
                if (_.isObject(item)) {
                    var result = _.filter(item, function (item) {
                        return reg.test(item);
                    });
                    return result.length;
                } else {
                    return reg.test(item);
                }
            });

            done(result);
        };

    }

//////////////////////////////////
    //event
    ////////////////////////////////////

    $elm.on('focus', function (e) {
        var offset = $elm.offset();
        var left = offset.left;
        var top = offset.top;
        $selectList.css({top: top + h + 1, left: left});

    }).on('keyup', function (e) {

        var val = $elm.val();
        if (!val) return $selectList.hide();
        if (val == queryStr) return;

        queryStr = val;

        //取消上个请求
        ajax && ajax.abort();

        //新请求
        query(queryStr);

    }).on('keydown', function (e) {

        var keyCode = e.keyCode;
        if (!(keyCode == 38 || keyCode == 40 || keyCode == 13)) {
            keydownActive = 0;
            return
        }

        var list = $selectList.find('[ic-role-type-item]');
        if (!list.length) return;
        var max = list.length - 1;

        if (e.keyCode == 38) {
            keydownActive = --keydownActive < 0 ? max : keydownActive;
            list.eq(keydownActive).addClass('active').siblings().removeClass('active');
            return;
        }

        if (e.keyCode == 40) {
            keydownActive = ++keydownActive > max ? 0 : keydownActive;
            list.eq(keydownActive).addClass('active').siblings().removeClass('active');
            return;
        }

        if (e.keyCode == 13) {
            list.eq(keydownActive).trigger('mousedown');
            $elm.blur();
        }

    }).on('blur', function (e) {
        $selectList.fadeOut(function () {
            $selectList.hide();
        });
    });


    $selectList.on('mousedown', '[ic-role-type-item]', function (e) {
        var index = $(this).index();
        var item = pool[index];
        var val = $(this).attr('ic-role-type-item');
        $elm.val(val);
        $elm.trigger('type.complete', item);
        onTypeComplete && onTypeComplete.apply($elm[0], [e,item])
    });


});