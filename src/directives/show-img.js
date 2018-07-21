/**
 * Created by j on 18/2/16.
 */

brick.directives.reg('ic-show-img', function ($elm) {

    var html = '<div style="position: fixed;width:100%;height:100%;left:0;top:0;z-index: 999;background-color: rgba(0,0,0,0.4);display:none;"><div id="ic-show-img-box"></div><div id="ic-show-img-box-close" style="position:absolute;top:0;right:0;padding:20px;background-color: rgba(0,0,0,0.7);color:#fff;line-height:1;font-size:1.6em;">X</div></div>';
    
    var s_box = 'ic-show-img-box';
    var s_item = 'ic-show-img-item';

    var $imgBox = $($elm.attr(s_box));
    $imgBox = $imgBox.length ? $imgBox : $(html).appendTo($(document.body));
    var _img = $elm.attr(s_item) || brick.get(s_item) || 'img';
    var $imgs = $elm.find(_img);
    var _url = $elm.attr('ic-show-img-url') || brick.get('ic-show-img-url') || 'src';

    var index = 0;
    var max = $imgs.length - 1;

    var callback = _.debounce(function (e) {
        //正负值表示滚动方向
        var isUp = e.originalEvent.deltaY < 0;
        isUp ? --index : ++index;

        //console.log('ic-show-img.mousewheel', index, $imgs.eq(index));

        if (index < 0) {
            index = max;
        }
        if (index > max) {
            index = 0;
        }
        $imgBox.find('img').attr('src', $imgs.eq(index).attr(_url));
    }, 200);

    $imgs.on('click', function (e) {
        var $th = $(this);
        index = $th.index($imgs);
        var $box = $imgBox.find('#ic-show-img-box').empty();
        var $img = new Image();
        $img.style.cssText = 'display:box;width:100%;';
        $img.src = $th.attr(_url);
        $box.append($img);
        $imgBox.fadeToggle();
        $elm.trigger('ic-show-img.show');
        $(document.body).on('mousewheel', callback);
        return false;
    });

    //'#ic-show-img-box-close',
    $imgBox.on('click', function (e) {
        $imgBox.fadeToggle();
        $elm.trigger('ic-show-img.hide');
        $(document.body).off('mousewheel', callback);
    });



});