/**
 * Created by julien.zhang on 2014/10/31.
 */


directives.reg('ic-ajax', function () {

        var eventAction = brick.get('event.action');

        var $doc = $(document.body);
        $doc.on(eventAction, '[ic-ajax]', _call);
        $doc.on('ic-ajax', '[ic-ajax]', _call);

        function _call(e) {
            var that = this;

            if (this.hasAttribute('ic-ajax-disabled')) return;

            var $elm = $(this);
            var namespace = $elm.attr('ic-ajax');

            var $loading = $('[ic-role-loading=?]'.replace('?', namespace || +(new Date)));

            var defaultCall = function () {
                //console.log(arguments)
            };

            var before = $elm.icParseProperty2('ic-submit-before') || defaultCall;
            var failed = $elm.icParseProperty2('ic-submit-on-fail') || defaultCall;
            var done = $elm.icParseProperty2('ic-submit-on-done') || defaultCall;
            var always = $elm.icParseProperty2('ic-submit-on-always') || defaultCall;

            if (before.apply(that) === false) return;

            var domain = brick.get('ajax.domain') || '';
            var url = domain + $elm.attr('ic-submit-action');
            var dataType = $elm.attr('ic-submit-data-type') || 'json';
            var method = $elm.attr('ic-submit-method') || 'post';

            var data = $elm.data('ic-submit-data') || $elm.attr('ic-submit-data');

            $loading.size() ? $loading.show() && $elm.hide() : $elm.setLoading();

            $elm.attr('ic-ajax-disabled', true);

            $.ajax({
                url: url,
                type: method,
                dataType: dataType,
                data: data
            }).done(function (data) {
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

    },
    {
        selfExec: true,
        once: true
    }
);

