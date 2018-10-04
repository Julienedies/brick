/**
 * Created by j on 18/2/16.
 */

$.fn.icShowImg = function (option) {

    return this.each(function(){

        var html = __inline('../tpl/show-img.html');

        var $that = $(this);
        var $imgBox = $('#ic-show-img-box-wrap');
        $imgBox = option.$imgBox || $imgBox.length ? $imgBox : $(html).appendTo($(document.body));
        var $show = $imgBox.find('img');
        var $close = $('#ic-show-img-close');

        var item = option.item || 'img';
        var $imgs = option.$imgs || $that.find(item);
        var url = option.url || 'src';
        var urls = option.urls || $imgs.map(function (i) {
                return $(this).attr('ic-show-img-item', i).attr(url);
            }).get();
        var interval = option.interval;
        var order = option.order || 1;

        var cla = 'on-ic-popup-show';

        var timer;
        var index = 0;
        var max = urls.length - 1;

        var callback = _.debounce(function (e) {
            //正负值表示滚动方向
            e = e || {originalEvent: {deltaY: order}};
            var isUp = e.originalEvent.deltaY < 0 ? --index : ++index;
            if (index < 0) {
                index = max;
            }
            if (index > max) {
                index = 0;
            }
            $close.text(index);
            $show.attr('src', urls[index]);
            return false;
        }, 100);

        var show = function (src) {
            $show.attr('src', src);
            index = urls.indexOf(src);
            $close.text(index);
            $imgBox.fadeToggle();
            $that.trigger('ic-show-img.show');
            $(document.body).addClass(cla).on('mousewheel', callback);
        };

        $that.on('click', item, function (e) {
            show( $(this).attr(url) );
            return false;
        });

        $imgBox.on('click', '#ic-show-img-close', function (e) {
            clearInterval(timer);
            $imgBox.fadeToggle();
            $that.trigger('ic-show-img.hide');
            $(document.body).removeClass(cla).off('mousewheel', callback);
        });

        if (option.start) {
            show(urls[0]);
            timer = interval ? setInterval(callback, interval * 1000) : undefined;
        }

    });
};

brick.directives.reg('ic-show-img', function ($elm) {

    console.info('exec ic-show-img', $elm);

    var s_box = 'ic-show-img-box';  // img box 选择符
    var s_item = 'ic-show-img-item'; // img item 选择符
    var s_urls = 'ic-show-img-sources';  // scope 数据源 图像url数据
    var s_interval = 'ic-show-img-interval';  // 间隔自动播放

    var $imgBox = $( $elm.attr(s_box) );
    var item = $elm.attr(s_item) || brick.get(s_item) || 'img';

    $elm.icShowImg({
        $imgBox: $imgBox.length ? $imgBox : undefined,
        item: item,
        $imgs: $elm.find(item),
        urls: $elm.icPp2(s_urls),
        interval: $elm.icPp2(s_interval, true),
        url: $elm.attr('ic-show-img-url') || brick.get('ic-show-img-url') || 'src'
    });

});