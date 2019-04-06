/**
 * Created by j on 18/2/16.
 */

import $ from 'jquery'
import _ from 'lodash'
import brick from '../core/export'
import directives from '../core/directives.js'
import viewerTpl from '../tpl/viewer.html'

const icViewer = {
    _show: function (src, index) {
        icViewer.$img.attr('src', src);
        icViewer.$sn.text(index);
        icViewer.on_show(index, src, icViewer.$info);
    },
    show: function (arg) {
        let urls = this.urls = arg.urls;
        let src = arg.src;
        let index = this.index = src ? urls.indexOf(src) : 0;
        src = src || urls[index];

        icViewer._show(src, index);
        icViewer.$elm.fadeIn();

        $(document.body).on('mousewheel', icViewer.on_mousewheel);

        this.timer = null;
        this.interval = arg.interval || 5;
        arg.autoplay && icViewer.autoplay();
    },

    init: function (options) {
        this.on_show = options.on_show || function () {
        };
        if (this.$elm) return icViewer;
        let $elm = $('#ic-viewer-box-wrap');
        $elm = this.$elm = options.$imgBox || $elm.length ? $elm : $(viewerTpl).appendTo($(document.body));
        this.$img = this.$elm.find('#ic-viewer-box > img');
        this.$info = this.$elm.find('#ic-viewer-info');
        this.$autoplay = this.$elm.find('#ic-viewer-autoplay');
        this.$sn = this.$elm.find('#ic-viewer-sn');

        $elm.on('click', '#ic-viewer-close', function (e) {
            $elm.fadeOut();
            icViewer.autoplay(false);
            $(document.body).off('mousewheel', icViewer.on_mousewheel);
        });

        $elm.on('click', '#ic-viewer-autoplay', function (e) {
            icViewer.autoplay(!icViewer.timer);
        });

        return icViewer;
    },

    on_mousewheel: _.debounce(function (e) {
        //正负值表示滚动方向
        e = e || {originalEvent: {deltaY: icViewer.order}};
        e.originalEvent.deltaY < 0 ? --icViewer.index : ++icViewer.index;
        let max = icViewer.urls.length - 1;
        if (icViewer.index < 0) {
            icViewer.index = max;
        }
        if (icViewer.index > max) {
            icViewer.index = 0;
        }
        icViewer._show(icViewer.urls[icViewer.index], icViewer.index);
        return false;
    }, 100),

    autoplay: function (is_play) {
        if (is_play || is_play === undefined) {
            icViewer.timer = setInterval(icViewer.on_mousewheel, icViewer.interval * 1000);
            icViewer.$autoplay.text('停止播放');
        } else {
            clearInterval(icViewer.timer);
            icViewer.timer = null;
            icViewer.$autoplay.text('自动播放');
        }
    }

};


brick.directives.reg({
    name: 'ic-view-img',
    selfExec: true,
    once: true,
    fn ($elm) {
        $(document.body).on('click', '[ic-img]', function (e) {
            let $box = $(this).closest('[ic-view-img]')
        })
    }
})


$.fn.icViewer = function (options) {

    return this.each(function () {

        let $that = $(this);
        let $imgBox = options.$imgBox;

        let item = options.item || 'img';
        let $imgs = options.$imgs || $that.find(item);
        let url = options.url || 'src';
        let urls = options.urls || $imgs.map(function (i) {
            return $(this).attr('ic-viewer-item', i).attr(url);
        }).get();

        $that.on('click', item, function (e) {
            console.log(444, urls, this)
            icViewer.init(options).show({
                urls: urls,
                src: $(this).attr(url)
            });
            return false;
        });

    });
};



function fn($elm) {
    //console.info('ic-viewer exec;')

    let s_box = 'ic-viewer-box';  // img box 选择符
    let s_item = 'ic-viewer-item'; // img item 选择符
    let s_urls = 'ic-viewer-sources';  // scope 数据源 图像url数据
    let s_interval = 'ic-viewer-interval';  // 间隔自动播放
    let s_on_show = 'ic-viewer-on-show';  // 回调函数

    let $imgBox = $($elm.attr(s_box));
    let item = $elm.attr(s_item) || brick.get(s_item) || '[ic-viewer-item]';

    $elm.icViewer({
        $imgBox: $imgBox.length ? $imgBox : undefined,
        item: item,
        $imgs: $elm.find(item),
        urls: $elm.icPp2(s_urls),
        on_show: $elm.icPp2(s_on_show),
        interval: $elm.icPp2(s_interval, true),
        url: $elm.attr('ic-viewer-url') || brick.get('ic-viewer-url') || 'src'
    });

}


directives.reg('ic-viewer', fn);

export { icViewer }
