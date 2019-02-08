/**
 * 扩展 jquery
 * Created by julien.zhang on 2014/10/30.
 */

import $ from 'jquery'
import brick from '../core/export'

!$.fn && ($.fn = {})

$.fn.icRender = function (tpl, model, callback) {
    if (typeof tpl == 'object') {
        callback = model;
        model = tpl;
        tpl = this.attr('ic-tpl') || this.attr('ic-tpl-name');
    }
    let tplFn = brick.getTpl(tpl);
    if (!tplFn) return console.info('not find tpl: ' + tpl);
    // 如果数据模型不是对象类型,则对其包装
    if (brick.get('render.wrapModel') || Array.isArray(model)) {
        model = {model: model};
    }
    let html = tplFn(model);
    return this.each(function () {
        let $th = $(this);
        setTimeout(function () {
            $th.html(html);
            $th.icCompile(true);
            callback && callback.apply(this, [$th.children()]);
        }, 30);
    });
};

$.fn.icCompile = function (is_start_form_children) {
    return this.each(function (i) {
        brick.compile(this, is_start_form_children);
    });
};

$.fn.icParseProperty = $.fn.icPp = function (name, isLiteral) {
    //console.info('icParseProperty => ', name);
    let match;
    // js直接量  <div ic-tpl-init="{}">  object {}
    if (match = name.match(/^\s*(([{\[])(.+)[}\]])\s*$/)) {
        //console.info(match);
        try {
            return (match[3] && match[2]) == '{' ? eval('(' + match[1] + ')') : match[2] == '{' ? {} : [];
        } catch (e) {
            console.error(e);
        }
    } else  // 字符串
    if (match = name.match(/^\s*((['"])[^'"]*\2)\s*$/)) {
        return match[1];
    } else  // 数字
    if (match = name.match(/^\s(\d+)\s*$/)) {
        return match[1];
    }

    if (isLiteral) return name;  //按直接量解析, 不通过scope链进行查找

    var params = name.split(':');
    name = params.shift();

    // 从控制器scope里获取或者全局window
    var $ctrl = this.closest('[ic-ctrl]');
    var ctrl = $ctrl.attr('ic-ctrl');
    //var namespace = ctrl ? $ctrl.data('ic-ctrl-scope') : {};
    var namespace = ctrl ? brick.controllers.get(ctrl) : {};

    function fx (root, chain) {
        var k = chain.shift();
        var v = root && root[k];
        if (v === undefined) return;
        if (chain.length) {
            return fx(v, chain);
        }
        return v;
    }

    var v = fx(namespace, name.split('.'));

    v = v || fx(window, name.split('.'));

    //console.info('icParseProperty => ' + name + ' => ', v);

    if (typeof v == 'function' && params.length) {
        return function () {
            var that = this;
            var args = [].slice.call(arguments);
            var p;
            while (p = params.shift()) {
                args.push(p);
            }
            return v.apply(that, args);   //window.confirm通过apply方式调用会出错,暂时不处理
        };
    }

    return v;

};

$.fn.icParseProperty2 = $.fn.icPp2 = function (name, isLiteral) {
    name = this.attr(name);
    if (name === undefined || name === '') return name;
    return this.icParseProperty(name, isLiteral);
};

$.fn.icTabs = function (options) {
    var active = options.active;
    active && this.attr('ic-tab-active', active);
    return this;
};

$.fn.icAjax = function (options) {
    if (options === undefined) return this.trigger('ic-ajax');
    options.data && this.data('ic-submit-data', options.data);

    options.disabled !== void (0) && this.attr('ic-ajax-disabled', !!options.disabled);

    return this;
};

/*$.fn.icForm = function (call, options) {
 return this.trigger('ic-form.' + call, options);
 };*/

$.fn.icDialog = function (options, callback) {

    options = _.isObject(options) ? _.extend({desc: '', title: ''}, options) : {desc: options, title: ''};

    if (!(this[0] && this[0].hasAttribute('ic-dialog'))) {
        console.error('not is ic-dialog');
        return this;
    }

    var that = this;
    var tpl = that.attr('ic-tpl-name');

    callback && this.one('ic-dialog.close', callback);

    setTimeout(function () {

        if (options === void (0)) {
            options = true;
        }

        if (!options) {
            that.icAniOut(21);
        }

        if (tpl && _.isObject(options)) {
            that.icRender(tpl, options.vm || options);
        }

        that.icAniIn(21, function () {
            that.trigger('ic-dialog.show');
        });

    }, 30);

    return this;
};

$.icDialog = function (msg, callback) {
    var options = _.isObject(msg) ? _.extend({desc: '', title: ''}, msg) : {desc: msg, title: ''};
    $('[ic-dialog]:first').icDialog(options, callback);
};

$.fn.icPrompt = function (options) {

    if (!(this[0] && this[0].hasAttribute('ic-prompt'))) {
        console.error('not is ic-prompt');
        return this;
    }

    var that = this;
    var tpl = that.attr('ic-tpl-name');

    clearTimeout(that.data('ic-prompt-timer'));

    setTimeout(function () {

        if (options === void (0)) {
            options = true;
        }

        if (!options) {
            that.icAniOut();
        }

        if (tpl && _.isObject(options)) {
            that.icRender(tpl, options.vm || options);
        }

        that.icAniIn(21, function () {
            that.trigger('ic-prompt.show');

            var timer = setTimeout(function () {
                that.icAniOut();
            }, 2400);

            that.data('ic-prompt-timer', timer);

        });

    }, 30);

    return this;
};

$.icPrompt = function (msg) {
    var options = _.isObject(msg) ? msg : {desc: msg};
    $('[ic-prompt]:first').icPrompt(options);
};

$.fn.icDatePicker = function (call, options) {
    return this.trigger('ic-date-picker.' + call, options);
};

//监听enter键
$.fn.icEnterPress = function (call) {

    return this.each(function (i) {

        if (/^textarea$/img.test(this.tagName)) return this;

        call = $.proxy(call, this);

        var fn = function (e) {

            if (e.which == 13) {
                //console.info('ic-enter-press emit.');
                call(e);
            }
        };

        $(this)
            .on('focus', function () {
                $(this).on('input keypress', fn);
            })
            .on('blur', function () {
                $(this).off('input keypress', fn);
            });
    });

};

//定时器
$.fn.icTimer = function () {
    var th = this;
    var count = th.attr('ic-timer-count') * 1;

    var timer = setInterval(function () {
        if (count--) {
            th.text(count);
        } else {
            clearInterval(timer);
            th.trigger('ic-timer.' + 'end');
        }
    }, 1000);

    return this;
};

// 操作提示
var tipSize = 0;
$.fn.tips = function (parent) {
    ++tipSize;
    var $parent = $(parent || 'body');
    var w = $parent.innerWidth() * 0.4 + 'px';
    var h;
    var top;
    var left;
    var wraper = $('<div class="tipsBox"></div>');

    this.addClass('tips1').css({
        'width': w
    });
    this.appendTo(wraper);
    wraper.appendTo($parent);

    w = this.width();
    h = this.height();
    top = '-' + h / 2 + 'px';
    left = '-' + w / 2 + 'px';
    this.css({
        'top': 40 * tipSize,
        'left': left
    });

    wraper.animate({
        top: 0,
        'opacity': '1'
    }, 500, function () {
        $(this).addClass('animated wobble');
    });

    setTimeout(function () {
        wraper.animate({
            'top': -300,
            'opacity': '0'
        }, 500, function () {
            --tipSize;
            wraper.remove();
        });
    }, 2000 * tipSize);

    return this;
};

$.tips = function (massge) {
    $('<div>' + massge + '</div>').tips();
};

//设置loading
(function ($) {

    var loading = '<span ic-loader role="_loading_"><svg width="16" height="16" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" version="1.1"><path d="M 150,0 a 150,150 0 0,1 106.066,256.066 l -35.355,-35.355 a -100,-100 0 0,0 -70.711,-170.711 z" fill="#3d7fe6"><animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 150 150" to="360 150 150" begin="0s" dur="1s" fill="freeze" repeatCount="indefinite" /></path></svg></span>';

    $.fn.icSetLoading = $.fn.setLoading = function (option) {

        var _loading = option && option.loading;

        this.icClearLoading();

        return this.each(function () {
            //this.parent().css({position:'relative'});
            var $th = $(this);
            var w = $th.outerWidth();
            var h = $th.outerHeight();
            var offset = $th.offset();
            var top = offset.top;
            var left = offset.left;
            var $loading = $(_loading || loading).css({
                width: w,
                height: h,
                position: 'absolute',
                top: top,
                left: left,
                'z-index': 1999
            }).appendTo('body');

            //$loading.find('svg').css({'margin-top':($th.height()-16)/2});

            $th.css({opacity: '0.5'});

            $th.data('_ic-role-loading', $loading);
        });

    };

})($);

//清除loading
$.fn.icClearLoading = $.fn.clearLoading = function () {

    return this.each(function () {
        var $th = $(this);
        var $loading = $th.data('_ic-role-loading');
        $loading && $loading.remove();
        $th.removeData('_ic-role-loading');
        $th.css({opacity: '1'});
    });

};
