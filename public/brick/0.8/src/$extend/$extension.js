/**
 * Created by julien.zhang on 2014/10/30.
 * 扩展 jquery
 */
(function ($) {

    $.fn.icRender = function(tpl, model, callback){
        tpl = brick.getTpl(tpl);
        var html = tpl(model);
        this.removeAttr('ic-tpl');
        this.html(html);
        callback && callback.apply(this[0], [this.children()]);
        return this;
    };

    $.fn.icCompile = function () {

        if (!this.length) return;

        return this.each(function (i) {

            brick.compile(this);

        });
    };

    $.fn.icParseProperty = function (name, debug) {

        if (name === void(0)) return void(0);
        var $ctrl = this.closest('[ic-ctrl]');
        var ctrl = $ctrl.attr('ic-ctrl');
        var namespace = ctrl ? $ctrl.data('ic-ctrl-scope') : window;
        //var namespace = ctrl ? brick.controllers.get(ctrl) : window;

        var chain = name.split('.');

        return (function (root, chain) {

            var k = chain.shift();
            var v = root && root[k];

            if (!v) return;

            if (chain.length) {
                return arguments.callee(v, chain);
            }

            return v;

        })(namespace, chain);

    };

    $.fn.icParseProperty2 = function (name) {
        name = this.attr(name);
        return this.icParseProperty(name);
    };

    $.fn.icTabs = function (options) {
        var active = options.active;
        active && this.attr('ic-tab-active', active);
        return this;
    };

    $.fn.icAjax = function (options) {
        if (options === void(0)) return this.trigger('ic-ajax');
        options.data && this.data('ic-submit-data', options.data);

        options.disabled !== void(0) && this.attr('ic-ajax-disabled', !!options.disabled);

        return this;
    };

    $.fn.icDialog = function (options) {

        if (!(this[0] && this[0].hasAttribute('ic-dialog'))){
            console.error('not is ic-dialog');
            return this;
        }

        var that = this;
        var tpl = that.attr('ic-tpl-name');

        setTimeout(function(){

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

        },30);

        return this;
    };

    $.icDialog = function(msg){
        var options = _.isObject(msg) ? msg : {desc:msg, title:''};
        $('[ic-dialog]:first').icDialog(options);
    };

    $.fn.icPrompt = function (options) {

        if (!(this[0] && this[0].hasAttribute('ic-prompt'))) {
            console.error('not is ic-prompt');
            return this;
        }

        var that = this;
        var tpl = that.attr('ic-tpl-name');

        clearTimeout(that.data('ic-prompt-timer'));

        setTimeout(function(){

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

                var timer = setTimeout(function(){
                    that.icAniOut();
                }, 2400);

                that.data('ic-prompt-timer', timer);

            });

        },30);

        return this;
    };

    $.icPrompt = function(msg){
        var options = _.isObject(msg) ? msg : {desc:msg};
        $('[ic-prompt]:first').icPrompt(options);
    };

    $.fn.icDatePicker = function(call, options){
        return this.trigger('ic-date-picker.'+call, options);
    };


    //监听enter键
    $.fn.icEnterPress = function (call) {

        return this.each(function (i) {

            call = $.proxy(call, this);

            var fn = function (e) {
                if (e.which == 13) {
                    call(e);
                }
            };

            $(this)
                .on('focus', function () {
                    $(this).keypress(fn);
                })
                .on('blur', function () {
                    $(this).unbind('keypress', fn);
                });
        });

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
                var $loading = $(_loading || loading).css({width: w, height: h, position: 'absolute', top: top, left: left, 'z-index': 1999}).appendTo('body');

                //$loading.find('svg').css({'margin-top':($th.height()-16)/2});

                $th.css({opacity: '0.5'});

                $th.data('_ic-role-loading', $loading);
            });

        };

    })(jQuery);


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


