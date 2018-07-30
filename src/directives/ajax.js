/**
 * Created by julien.zhang on 2014/10/31.
 */


directives.reg('ic-ajax',
    {
        selfExec: true,
        once: true,
        fn: function () {

            var eventAction = brick.get('event.action');

            function call(e) {

                var that = this;

                if (this.hasAttribute('ic-ajax-disabled')) return;

                var $elm = $(this);
                var name = $elm.attr('ic-ajax');

                var defaultCall = function () {
                    //console.log(arguments)
                };

                var before = $elm.icParseProperty2('ic-submit-before') || defaultCall;

                var data = $elm.data('ic-submit-data') || $elm.attr('ic-submit-data');
                var _data = before.call(that, data);
                if (_data === false) return;
                data = _data || data;

                var domain = brick.get('ajax.domain') || '';
                var url = domain + $elm.attr('ic-submit-action');
                var dataType = $elm.attr('ic-submit-data-type') || 'json';
                var method = $elm.attr('ic-submit-method') || 'post';

                var failed = $elm.icParseProperty2('ic-submit-on-fail') || defaultCall;
                var done = $elm.icParseProperty2('ic-submit-on-done') || defaultCall;
                var always = $elm.icParseProperty2('ic-submit-on-always') || defaultCall;

                var $loading = $('[ic-role-loading=?]'.replace('?', name || +(new Date)));
                $loading.size() ? $loading.show() && $elm.hide() : $elm.setLoading();

                $elm.attr('ic-ajax-disabled', true);

                $.ajax({
                    url: url,
                    type: method,
                    dataType: dataType,
                    data: data
                }).done(function (data) {
                        console.log('ic-ajax => ', done);
                        $elm.clearLoading() && $loading.hide() && $elm.show();
                        done.apply(that, [data]);
                    }
                ).fail(function (msg) {
                        $elm.clearLoading() && $loading.hide() && $elm.show();
                        failed.apply(that, [msg]);
                    }
                ).always(function () {
                        $elm.clearLoading() && $loading.hide() && $elm.show();
                        always.apply(that);
                        $elm.removeData('ic-submit-data');
                        $elm.removeAttr('ic-ajax-disabled');
                    });
            }

            var $doc = $(document.body);
            $doc.on(eventAction, '[ic-ajax]:not([ic-ajax-enter])', call);
            $doc.on('ic-ajax', '[ic-ajax]', call);

        }
    }
);

directives.reg('ic-ajax-auto',
    {
        fn: function ($elm){
            $elm.icAjax();
        }
    }
);

directives.reg('ic-ajax-enter',
    {
        fn: function ($elm){
            $elm.icEnterPress(function(){
                $elm.icAjax();
            });
        }
    }
);