/**
 * Created by j on 18/2/16.
 */

var ic_show_img_html = __inline('../tpl/show-img.html');

var icShowImg = {
    show: function (arg) {
        var urls = this.urls = arg.urls;
        var src = arg.src;
        var index = this.index = src ? urls.indexOf(src) : 0;
        src = src || urls[index];

        icShowImg.$img.attr('src', src);
        icShowImg.$sn.text(icShowImg.index);
        icShowImg.$elm.fadeIn();
        $(document.body).on('mousewheel', icShowImg.on_mousewheel);

        this.timer = null;
        this.interval = arg.interval || 5;
        arg.autoplay && icShowImg.autoplay();
    },

    init: function (options) {
        if (this.$elm) return icShowImg;
        var $elm = $('#ic-show-img-box-wrap');
        $elm = this.$elm = options.$imgBox || $elm.length ? $elm : $(ic_show_img_html).appendTo($(document.body));
        this.$img = this.$elm.find('#ic-show-img-box > img');
        this.$autoplay = this.$elm.find('#ic-show-img-autoplay');
        this.$sn = this.$elm.find('#ic-show-img-sn');

        $elm.on('click', '#ic-show-img-close', function (e) {
            $elm.fadeOut();
            icShowImg.autoplay(false);
            $(document.body).off('mousewheel', icShowImg.on_mousewheel);
        });

        $elm.on('click', '#ic-show-img-autoplay', function (e) {
            icShowImg.autoplay(!icShowImg.timer);
        });

        return icShowImg;
    },

    on_mousewheel: _.debounce(function (e) {
        //正负值表示滚动方向
        e = e || {originalEvent: {deltaY: icShowImg.order}};
        e.originalEvent.deltaY < 0 ? --icShowImg.index : ++icShowImg.index;
        var max = icShowImg.urls.length - 1;
        if (icShowImg.index < 0) {
            icShowImg.index = max;
        }
        if (icShowImg.index > max) {
            icShowImg.index = 0;
        }
        icShowImg.$sn.text(icShowImg.index);
        icShowImg.$img.attr('src', icShowImg.urls[icShowImg.index]);
        return false;
    }, 100),

    autoplay: function (is_play) {
        if(is_play || is_play === undefined){
            icShowImg.timer = setInterval(icShowImg.on_mousewheel, icShowImg.interval * 1000);
            icShowImg.$autoplay.text('停止播放');
        }else{
            clearInterval(icShowImg.timer);
            icShowImg.timer = null;
            icShowImg.$autoplay.text('自动播放');
        }
    }

};


$.fn.icShowImg = function (options) {

    return this.each(function () {

        var $that = $(this);
        var $imgBox = options.$imgBox;

        var item = options.item || 'img';
        var $imgs = options.$imgs || $that.find(item);
        var url = options.url || 'src';
        var urls = options.urls || $imgs.map(function (i) {
                return $(this).attr('ic-show-img-item', i).attr(url);
            }).get();

        $that.on('click', item, function (e) {
            icShowImg.init(options).show({
                urls: urls,
                src: $(this).attr(url)
            });
            return false;
        });

    });
};

brick.directives.reg('ic-show-img', function ($elm) {

    var s_box = 'ic-show-img-box';  // img box 选择符
    var s_item = 'ic-show-img-item'; // img item 选择符
    var s_urls = 'ic-show-img-sources';  // scope 数据源 图像url数据
    var s_interval = 'ic-show-img-interval';  // 间隔自动播放

    var $imgBox = $($elm.attr(s_box));
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