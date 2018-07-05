/**
 * Created by julien.zhang on 2014/10/29.
 */


directives.reg('ic-form', function ($elm, attrs) {

    /**
     * 要验证的字段 ic-form-field
     * 验证规则  ic-field-rule
     * 验证失败提示 ic-field-err-tip
     * 验证成功提示 ic-field-ok-tip
     * ic-submit-disabled
     */

    var debug = brick.get('debug');
    var eventAction = brick.get('event.action');
    var customRule = brick.get('ic-form.rule');

    var presetRule = {
        id: /[\w_]{4,18}/,
        required: /.+/,
        phone: /^\d[\d-]{5,16}$/,
        email: /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/,
        password: /(?:[\w]|[!@#$%^&*]){6,16}/,
        desc: /.{4,32}/,
        plate: /^[\u4e00-\u9fa5]{1}[A-Z]{1}[\s-]?[A-Z_0-9]{5}$/i
    };

    if (_.isObject(customRule)) {
        _.extend(presetRule, customRule);
    }

    var keys = _.keys(presetRule);

    keys.sort(function (a, b) {
        return b.length - a.length;
    });

    debug && console.info('当前关键字验证规则列表：', keys);

    /**
     * 对ic-field-rule属性定义的字段校验规则编译处理
     * 校验规则分为3类：
     * 1：预设的规则表示符，映射到相应的正则表达式或函数，如: 'phone';
     * 2：用户自定义的正则表达式, 如: /\d3/;
     * 3：用户自定义函数 如: equal(val); 传入校验字段校验时的字段值
     *
     * @param rule
     * @param $elm
     * @returns {}
     */
    function compileRule(rule, $elm) {

        var v;
        //替换预设的规则标识符
        for (var i in keys) {
            i = keys[i];
            v = presetRule[i];
            rule = rule.replace(new RegExp(i + '(?![^|&])', 'g'), function (m) {
                return _.isFunction(v) ? m + '()' : _.isRegExp(v) ? v : m;
            });
        }

        rule = rule.replace(/\/[igm]{0,3}(?=(?:\|\||\&\&|$))/g, function (m) {
            return m + '.test("?")';
        });

        debug && console.info('解析规则：', rule);
        return rule;
    }

    //校验函数
    function _verify(val, rules, tips, $field) {

        if (rules == undefined) return false;

        tips = tips || 'error';

        var fns = {};

        rules = rules.replace(/(?:^|\|\||\&\&)(\w+?)\(\)(?=(?:\|\||\&\&|$))/g, function (m, $1) {
            var fn = presetRule[$1] || $field.icParseProperty($1);
            fns[$1] = fn;
            return m.replace($1, 'fns.' + $1).replace('()', '("?")');
        });

        var _script = rules.replace(/\.\w+\("\?"\)/g, function (m) {
            return m.replace('?', val);
        });

        debug && console.info(_script);

        var result;

        try {
            result = eval(_script);
            //如果result是一个字符串，表示一个错误提示
            if (typeof result === 'string') {
                return result;
            }
            //如果为result===true,表示验证通过
            if (result === true) {
                return false;
            } else if (result) {
                return result;
            } else {
                return tips;
            }
        } catch (e) {
            console.error(e, _script);
        }

    }

    /* $.fn.icForm = $.fn.icForm || function (call, msg) {
     $submit.trigger('mousedown');
     };*/

    $.fn.icFormVerify = $.fn.icFormVerify || function () {

        var isSubmit = this.attr('ic-form-submit');

        if (isSubmit) {
            this.trigger('ic-form.verify');
            return this.attr('ic-verification') ? fields : false;
        }

        var isField = this.attr('ic-form-field');

        if (isField) {
            this.trigger('change');
            return this.attr('ic-verification');
        }

        return false;
    };

    function defaultCall() {
    }

    var fields = {};

    // 执行指令
    var namespace = $elm.attr('ic-form');
    var $fields = $elm.find('[ic-form-field]').not($elm.find('[ic-form] [ic-form-field]'));
    var $submit = $elm.find('[ic-form-submit]').not($elm.find('[ic-form] [ic-form-submit]'));
    var $loading = $elm.find('[ic-role-loading]');

    // 对每个字段dom绑定事件监听
    $fields.each(function (i) {

        var $th = $(this);
        var name = $th.attr('ic-form-field');
        var submitName = $th.attr('name') || name;
        var rules = $th.attr('ic-field-rule');

        if (!rules) return;
        //if ($th.attr('type') === 'hidden') return;

        var errTips = $th.attr('ic-field-err-tip');
        var $fieldBox = $elm.find('[ic-form-field-container="?"]'.replace('?', name));
        var $errTip = $elm.find('[ic-form-field-err-tip="?"]'.replace('?', name));
        var foucsTip = $errTip.text();

        rules = compileRule(rules, $elm);

        $th.on('change', function (e) {

            var val = $th.val();
            var tip;

            console.log(this, val, errTips);

            if (tip = _verify(val, rules, errTips, $th)) {
                //验证失败
                $fieldBox.addClass('error');
                $errTip.addClass('error').text(tip);
                $th.removeAttr('ic-verification');
                fields[name] = false;
                $th.trigger('ic-form-field.error', tip);
            } else {
                //验证通过
                $fieldBox.removeClass('error');
                $errTip.removeClass('error');
                $th.attr('ic-verification', 1);
                if ($th[0].hasAttribute('ic-field-placeholder')) {

                } else {
                    fields[submitName] = val;
                }
                $th.trigger('ic-form-field.ok', val);
            }

        });


        $th.on('focus', function () {
            $fieldBox.removeClass('error');
            $errTip.removeClass('error').text(foucsTip);
        });

    });

    // 提交触发后先进行字段校验
    $submit.on('ic-form.verify', function (e, field) {

        fields = {};
        // 没有验证规则的字段
        $fields.filter(':not("[ic-field-rule]")').each(function (i) {

            var $th = $(this);
            var tag = this.tagName;
            var type = $th.attr('type');
            var name = $th.attr('ic-form-field');
            var submitName = $th.attr('name') || name;
            var val;

            if (/^input|select|textarea$/img.test(tag)) {

                if (/^checkbox|radio$/i.test(type)) {

                    $th = $('[name=*]:checked'.replace('*', submitName));
                    val = $th.val() || '';

                } else {
                    val = $th.val();
                }

            } else {
                val = $th.attr('ic-val');
            }

            var prev = fields[submitName];
            if (prev) {
                prev = _.isArray(prev) ? prev : [prev];
                prev.push(val);
                fields[submitName] = prev;
            } else {
                fields[submitName] = val;
            }

        });

        // 占位字段
        $fields.filter('[ic-field-placeholder][ic-field-rule]').each(function (i) {
            $(this).change();
        });

        //显示并且有验证规则
        $fields.filter(':visible').filter('[ic-field-rule]').each(function (i) {
            $(this).change();
        });

        for (var i in fields) {
            if (fields[i] === false) {
                $submit.removeAttr('ic-verification');
                return false;
            }
        }

        return $submit.attr('ic-verification', true);

    });

    //
    $submit.on('ic-form.submit', function (e) {
        toSubmit(e);
    });

    // 提交触发
    $submit.on(eventAction, toSubmit);
    // 回车提交触发
    $fields.icEnterPress(function () {
        $submit.trigger(eventAction);
    });

    function toSubmit(e) {

        if ($submit[0].hasAttribute('ic-submit-disabled')) return;

        if (!$submit.icFormVerify()) return $elm.trigger('ic-form.error');

        //函数调用
        if (submitType === 1) {
            return action.apply($submit[0], [fields]);
        }

        var data = before.apply($submit[0], [fields]);
        if (data === false) return;

        if ($loading.size()) {
            $submit.hide();
            $loading.show();
        } else {
            $submit.icSetLoading();
        }

        $submit.attr('ic-submit-disabled', true);

        //同域提交
        if (submitType === 3) {
            return $.ajax({
                url: domain + action,
                type: method,
                dataType: dataType,
                data: data || fields
            }).done(
                function (data) {
                    done(data);
                }
            ).fail(failed)
                .always(function () {
                    $submit.show();
                    $loading.hide();
                    $submit.clearLoading();
                    always();
                    $submit.removeAttr('ic-submit-disabled');
                });
        }
    }

    //提交
    var domain = brick.get('ajax.domain') || '';
    var method = $submit.attr('ic-submit-method') || 'post';
    var action = $submit.attr('ic-submit-action');
    var before = $submit.icParseProperty2('ic-submit-before') || defaultCall;
    var failed = $submit.icParseProperty2('ic-submit-on-fail') || defaultCall;
    var done = $submit.icParseProperty2('ic-submit-on-done') || defaultCall;
    var always = $submit.icParseProperty2('ic-submit-on-always') || defaultCall;

    var dataType = $submit.attr('ic-submit-data-type') || 'json';

    var submitType = (function () {
        //函数调用
        if (/[\w_.]+\(\)\;?$/i.test(action)) {
            action = $submit.icParseProperty(action.replace(/[();]/g, ''), true);
            return 1;
        }
        //普通提交
        return 3;
    })();

});

