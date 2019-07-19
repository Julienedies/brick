/**
 * 扩展 jquery
 * Created by julien.zhang on 2014/10/30.
 */

import _ from 'lodash'
import $ from 'jquery'
import brick from '../core/export'

!$.fn && ($.fn = {})

$.fn.icRender = function (tpl, model, callback) {
    if (typeof tpl === 'object') {
        callback = model;
        model = tpl;
        tpl = this.attr('ic-tpl') || this.attr('ic-tpl-name');
    }
    let tplFn = brick.getTpl(tpl);
    if (!tplFn) return console.info('not find tpl: ' + tpl);
    // 如果数据模型不是对象类型,则对其包装
    if (!model.model) {
        if (brick.get('render.wrapModel') || Array.isArray(model)) {
            model = {model: model};
        }
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
    // console.info('icParseProperty name is ', name);
    let match;
    // js直接量  <div ic-tpl-init="{}">  object {}
    if (match = name.match(/^\s*(([{\[])(.*)[}\]])\s*$/)) {
        console.info(match);
        try {
            //return (match[3] && match[2]) == '{' ? eval('(' + match[1] + ')') : match[2] == '{' ? {} : [];
            return eval(`(${ match[1] })`);
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
    // 按直接量解析, 不通过scope链进行查找
    if (isLiteral) return name;

    let params = name.split(':');
    name = params.shift();

    // 从控制器scope里获取或者全局window
    let $ctrl = this.closest('[ic-ctrl]');
    let ctrl = $ctrl.attr('ic-ctrl');
    //let namespace = ctrl ? $ctrl.data('ic-ctrl-scope') : {};
    let namespace = ctrl ? brick.controllers.get(ctrl) : {};

    function fx (root, chain) {
        let k = chain.shift();
        let v = root && root[k];
        if (v === undefined) return;
        if (chain.length) {
            return fx(v, chain);
        }
        return v;
    }

    let v = fx(namespace, name.split('.'));

    v = v || fx(window, name.split('.'));

    // 如果有参数, 譬如: 'confirm:确认删除', 返回一个包装函数
    if (typeof v == 'function' && params.length) {
        return function (arg) {
            let that = this;
            let args = [].slice.call(arguments);
            let p;
            while (p = params.shift()) {
                args.push(p);
            }
            // 如果arg is undefined, 则args[0] === undefined, 需要删除args[0]
            arg === undefined && args.shift()
            // window.confirm通过apply方式调用会出错,暂时不处理
            // confirm问题通过在scope原型上添加confirm对window.confirm进行包装处理
            return v.apply(that, args);
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
    let active = options.active;
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

    let that = this;
    let tpl = that.attr('ic-tpl-name');

    callback && this.one('ic-dialog.close', callback);

    setTimeout(function () {

        if (options === void (0)) {
            options = true;
        }

        if (!options) {
            that.fadeOut();
        }

        if (tpl && _.isObject(options)) {
            that.icRender(tpl, options.vm || options);
        }

        that.fadeIn(function () {
            that.trigger('ic-dialog.show');
        });

    }, 30);

    return this;
};

$.icDialog = function (msg, callback) {
    let options = _.isObject(msg) ? _.extend({desc: '', title: ''}, msg) : {desc: msg, title: ''};
    $('[ic-dialog]:first').icDialog(options, callback);
};

$.fn.icPrompt = function (options) {

    if (!(this[0] && this[0].hasAttribute('ic-prompt'))) {
        console.error('not is ic-prompt');
        return this;
    }

    let that = this;
    let tpl = that.attr('ic-tpl-name');

    clearTimeout(that.data('ic-prompt-timer'));

    setTimeout(function () {

        if (options === void (0)) {
            options = true;
        }

        if (!options) {
            that.fadeOut();
        }

        if (tpl && _.isObject(options)) {
            that.icRender(tpl, options.vm || options);
        }

        let cb = function () {
            that.trigger('ic-prompt.show');

            let timer = setTimeout(function () {
                that.fadeOut();
            }, 2400);

            that.data('ic-prompt-timer', timer);

        };

        that.fadeIn(cb);

    }, 30);

    return this;
};

$.icPrompt = function (msg) {
    let options = _.isObject(msg) ? msg : {desc: msg};
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

        let fn = function (e) {

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
    let th = this;
    let count = th.attr('ic-timer-count') * 1;

    let timer = setInterval(function () {
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
let tipSize = 0;
$.fn.tips = function (parent) {
    ++tipSize;
    let $parent = $(parent || 'body');
    let w = $parent.innerWidth() * 0.4 + 'px';
    let h;
    let top;
    let left;
    let $wrapper = $('<div style="position:fixed;width:100%;height:100%;"></div>');

    this.addClass('tips1').css({
        'width': w
    });
    this.appendTo($wrapper);
    $wrapper.appendTo($parent);

    w = this.width();
    h = this.height();
    top = '-' + h / 2 + 'px';
    left = '-' + w / 2 + 'px';
    this.css({
        'top': 40 * tipSize,
        'left': left
    });

    $wrapper.animate({
        top: 0,
        'opacity': '1'
    }, 500, function () {
        $(this).addClass('animated wobble');
    });

    setTimeout(function () {
        $wrapper.animate({
            'top': -300,
            'opacity': '0'
        }, 500, function () {
            --tipSize;
            $wrapper.remove();
        });
    }, 2000 * tipSize);

    return this;
};

$.tips = function (massge) {
    $('<div>' + massge + '</div>').tips();
};


//设置loading
(function ($) {

    let loading = '<span ic-loader role="_loading_"><svg width="16" height="16" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" version="1.1"><path d="M 150,0 a 150,150 0 0,1 106.066,256.066 l -35.355,-35.355 a -100,-100 0 0,0 -70.711,-170.711 z" fill="#3d7fe6"><animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 150 150" to="360 150 150" begin="0s" dur="1s" fill="freeze" repeatCount="indefinite" /></path></svg></span>';

    $.fn.icSetLoading = $.fn.setLoading = function (option) {

        let _loading = option && option.loading;

        this.icClearLoading();

        return this.each(function () {
            //this.parent().css({position:'relative'});
            let $th = $(this);
            let w = $th.outerWidth();
            let h = $th.outerHeight();
            let offset = $th.offset();
            let top = offset.top;
            let left = offset.left;
            let $loading = $(_loading || loading).css({
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
        let $th = $(this);
        let $loading = $th.data('_ic-role-loading');
        $loading && $loading.remove();
        $th.removeData('_ic-role-loading');
        $th.css({opacity: '1'});
    });

};


$.fn.icMessage = $.fn.icMsg = function () {
    let msgBoxHtml = `<div id="ic-message-wrapper" style="position: fixed;top:0;bottom:0;left:0;right:0;z-index:100001; display: flex; flex-flow: column; align-items: center;pointer-events: none; padding-top:40px;"></div>`;

    let $msgWrapper = $(`#ic-message-wrapper`);
    $msgWrapper = $msgWrapper.length ? $msgWrapper : $(msgBoxHtml).appendTo(document.body);

    let $that = this;

    let style = {
        transition: 'all 0.5s',
        'transform': 'translateY(-900px)',
        'margin-top': '20px'
    };
    $that.css(style);

    $that.appendTo($msgWrapper);

    setTimeout( () => {

        $that.css({
            'transform': 'translateY(0)'
        });

        setTimeout(() => {
            $that.css(style);
            setTimeout(() => {
                $that.remove();
            }, 1000);
        }, 1000 * 3);

    }, 25);

};

$.icMessage = $.icMsg = function (message) {
    console.log(message)
    $(`<div id="ic-message-box" style="background: #fff; border:solid 1px #1279D4; color:#1279D4; width:40%; padding:10px; border-radius:6px;box-shadow: rgba(0,0,0,0.2) 6px 6px 6px;">
${ message }</div>`).icMessage();
};
