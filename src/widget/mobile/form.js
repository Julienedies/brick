/**
 * Created by julien.zhang on 2014/10/29.
 */


directives.add('ic-form', function ($elm, attrs) {


    /**
     * 要验证的字段 ic-form-field
     * 验证规则  ic-field-rule
     * 验证失败提示 ic-role-field-err-tip
     * 验证成功提示 ic-role-field-ok-tip
     */

    var presetRule = {
        id: /[\w_]{4,18}/,
        required: /.+/,
        phone: /^1[0-9][0-9]\d{8}$/,
        email: /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/,
        password: /(?:[\w]|[!@#$%^&*]){8,}/,
        desc:/.{4,32}/,
        plate:/^[\u4e00-\u9fa5]{1}[A-Z]{1}[\s-]?[A-Z_0-9]{5}$/i
    };


    /**
     * 对ic-field-rule属性定义的字段校验规则编译处理
     * 校验规则分为3类：
     * 1：预设的规则表示符，映射到相应的正则表达式，如: 'phone';
     * 2：用户自定义的正则表达式, 如: /\d3/;
     * 3：用户自定义函数 如: equal(val); 传入校验字段校验时的字段值
     *
     * @param rule
     * @param $elm
     * @returns {XML|string|void|*}
     */
    function compileRule(rule, $elm) {

        //替换预设的规则标识符
        for (var i in presetRule) {
            rule = rule.replace(i, presetRule[i]);
        }

        var call = '.test("?")';
        //rule = rule.replace(/(\&\&|\|\|)(?=(?:\/|\w))/g, call+'$1');
        //rule += call;

        rule = rule.replace(/\/[igm]{0,3}(?=(?:\|\||\&\&|$))/g, function (m) {
            return m + call;
        });

        return rule;
    }

    //校验函数
    function _verify(val, rules, tips, $field) {

        tips = tips || 'error';

        var fns = {};

        rules = rules.replace(/(?:^|\|\||\&\&)(\w+?)\(\)(?=(?:\|\||\&\&|$))/g, function (m, $1) {
            var fn = $field.icParseProperty($1);
            fns[$1] = fn;
            return m.replace($1, 'fns.' + $1).replace('()', '("?")');
        });

        var script = rules.replace(/\.\w+\("\?"\)/g, function (m) {

            return m.replace('?', val);
        });

        //console.log(script)

        try {
            if (eval(script)) {
                return false;
            } else {
                return tips;
            }
        } catch (e) {
            console.error(e);
        }

    }

    //只执行一次绑定
    if (!arguments.callee._run) {

        arguments.callee._run = 1;
        /**
         * 对外js调用接口
         */
        $.fn.icVerify = function () {

            var isSubmit = this.attr('ic-form-submit');

            if (isSubmit) {
                this.trigger('ic-form.' + isSubmit);
                return this.attr('ic-verification');
            }

            var isField = this.attr('ic-form-field');

            if (isField) {
                this.trigger('change');
                return this.attr('ic-verification');
            }

            return false;
        };
    }


    // 执行指令
    var namespace = $elm.attr('ic-form');
    var $fields = $elm.find('[ic-form-field]').not($elm.find('[ic-form] [ic-form-field]'));
    var $submit = $elm.find('[ic-form-submit]').not($elm.find('[ic-form] [ic-form-submit]'));
    var $loading = $elm.find('[ic-role-loading]');

    var fields = {};

    //处理js调用
    $submit.on('ic-form.' + namespace, function (e, field) {

        fields = {};

        $fields.filter(':not("[ic-field-rule]")').each(function (i) {
            var $th = $(this);
            var tag = this.tagName;
            var type = $th.attr('type');
            var name = $th.attr('ic-form-field');
            var submitName = $th.attr('name') || name;
            var val;

            if(/^input|select|textarea$/img.test(tag)){

                if(/^checkbox|radio$/i.test(type)){

                    if($th.is(':checked')){
                        val = $th.val();
                    }else{
                        return;
                    }

                }else{
                    val = $th.val();
                }

            }else{
                val = $th.attr('ic-val');
            }

            var prev = fields[submitName];
            if(prev){
                prev = _.isArray(prev) ? prev : [prev];
                prev.push(val);
                fields[submitName] = prev;
            }else{
                fields[submitName] = val;
            }

        });

        //显示并且有验证规则
        $fields.filter(':visible').filter('[ic-field-rule]').each(function (i) {
            $(this).change();
        });

        $fields.filter('[ic-field-placeholder][ic-field-rule]').each(function (i) {
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

    var defaultCall = function(){console.log(arguments)};
    //提交
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


    $submit.on('mousedown', function (e) {

        if($submit[0].hasAttribute('ic-submit-disabled')) return;

        if (!$submit.icVerify()) return $elm.trigger('ic-form.error');

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
            $submit.setLoading();
        }

        $submit.attr('ic-submit-disabled', true);

        //同域提交
        if (submitType === 3) {
            return $.ajax({
                url: action,
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

        //跨域提交
        if (submitType === 2) {

        }

    });


    $fields.icEnterPress(function () {
        $submit.trigger('mousedown');
    });

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
                if($th[0].hasAttribute('ic-field-placeholder')){

                }else{
                    fields[submitName] = val;
                }
                $th.trigger('ic-form-field.ok', val);
            }

        });


        $th.on('focus', function () {
            $errTip.text(foucsTip);
        });

    });


});

