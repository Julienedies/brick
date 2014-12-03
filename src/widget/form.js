/**
 * Created by julien.zhang on 2014/10/29.
 */


directives.add('ic-form', function () {

    /**
     * 要验证的字段 ic-role-field
     * 验证规则  ic-field-rule
     * 验证失败提示 ic-role-field-err-tip
     * 验证成功提示 ic-role-field-ok-tip
     */

    var presetRule = {
        id:/[\w_]{4,18}/,
        required: /[\w\d]+/,
        phone: /^1[0-9][0-9]\d{8}$/,
        email: /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/,
        password: /(?:[\w]|[!@#$%^&*]){8,}/
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
    function compileRule(rule, $elm){

        //替换预设的规则标识符
        for(var i in presetRule){
            rule = rule.replace(i, presetRule[i]);
        }

        var call = '.test("?")';
        //rule = rule.replace(/(\&\&|\|\|)(?=(?:\/|\w))/g, call+'$1');
        //rule += call;

        rule = rule.replace(/\/[igm]{0,3}(?=(?:\|\||\&\&|$))/g, function(m){
            return m + call;
        });

        return rule;
    }

    //校验函数
    function _verify(val, rules, tips, $field){

        tips = tips || 'error';

        var fns = {};

        rules = rules.replace(/(?:^|\|\||\&\&)(\w+?)\(\)(?=(?:\|\||\&\&|$))/g, function(m, $1){
            var fn = $field.icParseProperty($1);
            fns[$1] = fn;
            return m.replace($1, 'fns.'+$1).replace('()','("?")');
        });

        var script = rules.replace(/\.\w+\("\?"\)/g, function(m){

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

    /**
     * 对外js调用接口
     */
    $.fn.icVerify = function(){

        var isSubmit = this.attr('ic-role-submit');

        if(isSubmit){
            this.trigger('ic-form.'+isSubmit);
            return this.attr('ic-verification');
        }

        var isField = this.attr('ic-role-field');

        if(isField){
            this.trigger('change');
            return this.attr('ic-verification');
        }

        return false;
    };

    // 执行指令
    $('[ic-form]').each(function (i) {

        var $elm = $(this);
        var namespace = $elm.attr('ic-form');
        var $fields = $elm.find('[ic-role-field]');
        var $submit = $elm.find('[ic-role-submit]');
        var $loading = $elm.find('[ic-role-loading]');

        var fields = {};

        //处理js调用
        $submit.on('ic-form.'+namespace, function(e, field){

            fields = {};

            $fields.filter(':not("[ic-field-rule]")').each(function(i){
                var $th = $(this);
                var name = $th.attr('ic-role-field');
                var submitName = $th.attr('name') || name;
                fields[submitName] = $th.val();
            });

            //显示并且有验证规则
            $fields.filter(':visible').filter('[ic-field-rule]').each(function(i){
                $(this).change();
            });

            for(var i in fields){
                if(fields[i]===false) {
                    $submit.removeAttr('ic-verification');
                    return false;
                }
            }

            return $submit.attr('ic-verification', true);

        });


        //提交
        var method = $submit.attr('ic-submit-method') || 'post';
        var action = $submit.attr('ic-submit-action');
        var done = $submit.attr('ic-submit-on-done');
        var always = $submit.attr('ic-submit-on-always');
        var failed = $submit.attr('ic-submit-on-failed');
        var before = $submit.attr('ic-submit-before');
        var dataType = $submit.attr('ic-submit-data-type') || 'json';

        var submitType = (function () {
            //函数调用
            if(/[\w_.]+\(\)\;?$/i.test(action)){
                action = $submit.icParseProperty(action.replace(/[();]/g,''));
                return 1;
            }
            //跨域提交
            var match = action.match(/https?:\/\/[\w.:]+/i);
            console.log(match, location.origin);
            if( match && match[0] !== location.origin){
                _iframe = $('<iframe name="loginIframe" href="#"></iframe>').insertAfter($submit);
                return 2;
            }
            //普通提交
            return 3;
        })();


        always = $submit.icParseProperty(always) || function(){};
        done = $submit.icParseProperty(done) || function(){};
        failed = $submit.icParseProperty(failed) || function(msg){console.log(msg)};
        before = $submit.icParseProperty(before) || function(){};

        var _iframe;
        var _form;


        $submit.on('focus', function(){

            if(!$submit.icVerify()) return;


            //函数调用
            if(submitType === 1){
                return action.apply($submit, []);
            }

            var data = before(fields);

            if( $loading.size()){
                $submit.hide();
                $loading.show();
            }else{
                $submit.setLoading();
            }


            //同域提交
            if(submitType === 3){
                return $.ajax({
                    url: action,
                    type: method,
                    dataType:dataType,
                    data: data || fields
                }).done(
                    function(data){
                        done(data);
                    }
                ).fail(failed)
                    .always(function(){
                        $submit.show();
                        $loading.hide();
                        $submit.clearLoading();
                        always();
                    });
            }

            //跨域提交
            if(submitType === 2){


            }

        });


        $fields.each(function(i){

            var $th = $(this);
            var name = $th.attr('ic-role-field');
            var submitName = $th.attr('name') || name;
            var rules = $th.attr('ic-field-rule');

            if(!rules) return;
            if($th.attr('type') === 'hidden') return;

            var errTips = $th.attr('ic-field-err-tip');
            var fire = $th.attr('ic-field-verify-fire');
            var $errTip = $elm.find('[ic-role-field-err-tip="?"]'.replace('?', name));
            var foucsTip = $errTip.text();

            rules = compileRule(rules, $elm);

            $th.on('change', function(e){

                var val = $th.val();
                var tip;

                if(tip = _verify(val, rules, errTips, $th)){
                    //验证失败
                    $errTip.css({'visibility':'visible'}).addClass('error').text(tip);
                    $th.removeAttr('ic-verification');
                    fields[name] = false;
                    fire && $th.trigger('ic-form.' + namespace + '.' + name + '.verify', 0);
                }else{
                    //验证通过
                    $errTip.css({'visibility':'hidden'}).removeClass('error');
                    $th.attr('ic-verification', 1);
                    fields[submitName] = val;
                    fire && $th.trigger('ic-form.' + namespace + '.' + name + '.verify', 1);

                }

            });


            $th.on('focus', function(){
                $errTip.text(foucsTip);
            });



        });


    });


});

