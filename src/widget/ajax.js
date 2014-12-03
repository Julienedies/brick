/**
 * Created by julien.zhang on 2014/10/31.
 */


directives.add('ic-ajax', function () {

    //只执行一次绑定，绑定后即销毁
    if (arguments.callee.run) return;
    arguments.callee.run = 1;

    var $doc = $(document);
    $doc.on('click', '[ic-ajax]', _call);
    $doc.on('ic-ajax', '[ic-ajax]', _call);

    function _call(e) {

        var that = this;
        var $elm = $(this);
        var namespace = $elm.attr('ic-ajax');

        var $loading = $('[ic-role-loading=?]'.replace('?', namespace));

        //提交
        var url = $elm.attr('ic-submit-action');
        var dataType = $elm.attr('ic-submit-data-type') || 'json';
        var method = $elm.attr('ic-submit-method') || 'post';
        var done = $elm.attr('ic-submit-on-done');
        var always = $elm.attr('ic-submit-on-always');
        var failed = $elm.attr('ic-submit-on-failed');
        var before = $elm.attr('ic-submit-before');

        always = $elm.icParseProperty(always) || function () {
            console.log('always is undefined;')
        };
        done = $elm.icParseProperty(done) || function () {
            console.info('done is undefined;')
        };
        failed = $elm.icParseProperty(failed) || function (msg) {
            console.info('failed is undefined;')
        };
        before = $elm.icParseProperty(before) || function () {
            console.info('before is undefined;')
        };

        if (before.apply(that) === false) return;
        if ($elm.attr('ic-ajax-disabled') === 'true') return;

        var data = $elm.data('ic-submit-data') || $elm.attr('ic-submit-data');

        $loading.size() ? $loading.show() && $elm.hide() : $elm.setLoading();

        $.ajax({
            url: url,
            type: method,
            dataType: dataType,
            data: data
        }).done(function (data) {
                done.apply(that, [data]);
            }
        ).fail(function (msg) {
                failed.apply(that, [msg]);
            }
        ).always(function () {
                $elm.clearLoading() && $loading.hide() && $elm.show();
                always.apply(that);
                $elm.removeData('ic-submit-data');
            });
    }


});

