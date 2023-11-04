/**
 * Created by j on 18/2/16.
 */

import $ from 'jquery'
import _ from 'lodash'
import brick from '../core/export'
import directives from '../core/directives.js'
import viewerTpl from '../tpl/viewer.html'

const icViewer = {


    init: function (options) {
        let fx = () => {
        };
        this.onShow = options.onShow || fx;
        this.onOpen = options.onOpen || fx;
        this.onClose = options.onClose || fx;

        this.$body = $(document.body);
        this.onPopupShowCla = 'on-ic-viewer-show';
        this.$body.addClass(this.onPopupShowCla);
        // icViewer open event callback
        this.onOpen();

        // 只初始化一次
        if (this.$elm) return icViewer;

        this.interval = options.interval;

        let $elm = $('#ic-viewer-box-wrap');
        $elm = this.$elm = options.$imgBox || $elm.length ? $elm : $(viewerTpl).appendTo($(document.body));
        this.$img = this.$elm.find('#ic-viewer-box > img').on('dblclick', function (e) {
            icViewer.close(e);
        });
        this.$info = this.$elm.find('#ic-viewer-info');
        this.$autoplay = this.$elm.find('#ic-viewer-autoplay');
        this.$sn = this.$elm.find('#ic-viewer-sn');
        this.$interval = this.$elm.find('#ic-viewer-interval').val(this.interval).on('change', function (e) {
            let val = $(this).val();
            val && icViewer.set('interval', val * 1);
            //console.log(val);
        });
        this.$go = this.$elm.find('#ic-viewer-go').on('change', function (e) {
            let val = $(this).val();
            icViewer.index = val * 1;
            icViewer._go();
        });

        $elm.on('click', '#ic-viewer-close', function (e) {
            icViewer.close(e);
        });

        $elm.on('click', '#ic-viewer-autoplay', function (e) {
            icViewer.autoplay(!icViewer.timer);
        });

        return icViewer;
    },

    show: function (arg) {
        let urls = this.urls = arg.urls;
        let src = arg.src;
        let index = this.index = src ? urls.indexOf(src) : 0;
        src = src || urls[index];

        icViewer._show(src, index, true);
        icViewer.$elm.fadeIn();

        icViewer.$body.on('mousewheel', icViewer.on_mousewheel);

        this.timer = null;
        //this.interval = arg.interval || this.interval;
        arg.autoplay && icViewer.autoplay();
    },
    _show: function (src, index, isFirstShow) {
        icViewer.$img.attr('src', src);
        icViewer.$sn.text(index + ' / ' + this.urls.length);
        icViewer.onShow(index, src, icViewer.$info, isFirstShow);
    },

    close: function (e) {
        icViewer.$elm.fadeOut();
        icViewer.autoplay(false);
        icViewer.$body.removeClass(icViewer.onPopupShowCla);
        // icViewer close event callback
        icViewer.onClose();
        icViewer.$body.off('mousewheel', icViewer.on_mousewheel);
    },

    set: function (key, val) {
        if (typeof key === 'object') {
            Object.assign(this, key);
        } else {
            this[key] = val;
        }
    },

    _go: function () {
        let max = icViewer.urls.length - 1;
        if (icViewer.index < 0) {
            icViewer.index = max;
        }
        if (icViewer.index > max) {
            icViewer.index = 0;
        }
        icViewer._show(icViewer.urls[icViewer.index], icViewer.index);
    },

    on_mousewheel: _.debounce(function (e) {
        //正负值表示滚动方向
        console.log('on_mousewheel');
        e = e || {originalEvent: {deltaY: icViewer.order}};
        e.originalEvent.deltaY < 0 ? --icViewer.index : ++icViewer.index;
        icViewer._go();
        return false;
    }, 100),

    autoplay: function (is_play) {
        if (is_play || is_play === undefined) {
            console.log('icViewer.interval', icViewer.interval);
            icViewer.timer = setInterval(icViewer.on_mousewheel, icViewer.interval * 1000);
            icViewer.$autoplay.text('停止播放');
        } else {
            clearInterval(icViewer.timer);
            icViewer.timer = null;
            icViewer.$autoplay.text('自动播放');
        }
    }

};


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

        // 触发入口; 每次都会icViewer.init; options 由于闭包的关系，会一直保持最初的参数;
        $that.on('click', item, function (e) {
            icViewer.init(options).show({
                urls: urls,
                src: $(this).attr(url)
            });
            return false;
        });

    });
};


function fn ($elm) {
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
        onShow: $elm.icPp2(s_on_show),
        onOpen: $elm.icPp2('ic-viewer-on-open'),
        onClose: $elm.icPp2('ic-viewer-on-close'),
        interval: $elm.icPp2(s_interval, true) || brick.get('ic-viewer-interval') || 10,
        url: $elm.attr('ic-viewer-url') || brick.get('ic-viewer-url') || 'src'
    });

}


brick.icViewer = icViewer;

directives.reg('ic-viewer', fn);

export { icViewer }
