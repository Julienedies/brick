/**
 * Created by julien.zhang on 2014/10/30.
 * 扩展 jquery
 */

;
(function ($) {

    $.fn.icRender = function (tpl, model, callback) {
        if (typeof tpl == 'object') {
            callback = model;
            model = tpl;
            tpl = this.attr('ic-tpl-name');
        }
        var tplFn = brick.getTpl(tpl);
        if (!tplFn) return console.info('not find tpl: ' + tpl);
        // 如果数据模型不是对象类型,则对其包装
        /*if(typeof model != 'object' || Array.isArray(model)){
         model = {model : model};
         }*/
        var html = tplFn({model: model});
        return this.each(function () {
            var $th = $(this);
            $th.html(html);
            $th.removeAttr('ic-tpl');
            $th.icCompile();
            callback && callback.apply(this, [$th.children()]);
        });
    };

    $.fn.icCompile = function () {

        if (!this.length) return this;

        return this.each(function (i) {
            brick.compile(this);
        });
    };

    $.fn.icParseProperty = function (name, isLiteral) {
        //console.info('icParseProperty => ', name);
        var match;
        // js直接量  <div ic-tpl-init="{}">  object {}
        if (match = name.match(/^\s*(([{\[])([^{\[]*)[}\]])\s*$/)) {
            try {
                return match[3] ? JSON.stringify(match[1]) : match[2] == '{' ? {} : [];
            } catch (e) {
                console.error(e);
            }
        }
        else  // 字符串
        if (match = name.match(/^\s*((['"])[^'"]*\2)\s*$/)) {
            return match[1];
        }
        else  // 数字
        if (match = name.match(/^\s(\d+)\s*$/)) {
            return match[1];
        }

        if(isLiteral) return name;  //按直接量解析

        var params = name.split(':');
        name = params.shift();

        // 从控制器scope里获取或者全局window
        var $ctrl = this.closest('[ic-ctrl]');
        var ctrl = $ctrl.attr('ic-ctrl');
        //var namespace = ctrl ? $ctrl.data('ic-ctrl-scope') : {};
        var namespace = ctrl ? brick.controllers.get(ctrl) : {};

        function f(root, chain) {
            var k = chain.shift();
            var v = root && root[k];
            if (v === undefined) return;
            if (chain.length) {
                return arguments.callee(v, chain);
            }
            return v;
        }

        var v = f(namespace, name.split('.'));

        v = v || f(window, name.split('.'));

        //console.info('icParseProperty => ' + name + ' => ', v);

        if(typeof v == 'function' && params.length){
            return function(){
                var that = this;
                var args = [].slice.call(arguments);
                var p;
                while(p = params.shift()){
                    args.push(p);
                }
                return v.apply(that, args);   //window.confirm通过apply方式调用会出错,暂时不处理
            };
        }

        return v;

    };

    $.fn.icParseProperty2 = function (name, isLiteral) {
        name = this.attr(name);
        if (name === undefined || name == '') return name;
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

        options.disabled !== void(0) && this.attr('ic-ajax-disabled', !!options.disabled);

        return this;
    };

    $.fn.icForm = function (call, options) {
        return this.trigger('ic-form.' + call, options);
    };

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

            if (options === void(0)) {
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

            if (options === void(0)) {
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

        if (window.ActiveXObject) {

            loading = 'data:image/gif;base64,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';
            loading = '<span style="margin:0.2em; auto;display:inline-block;text-align:center;" role="_loading_"><img src="?"></span>'.replace('?', loading);

        }

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


})(jQuery);


