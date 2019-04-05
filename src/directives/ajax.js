/**
 * Created by julien.zhang on 2014/10/31.
 */

import $ from 'jquery'
import brick from '../core/export'

export default {
    name: 'ic-ajax',
    selfExec: true,
    once: true,
    fn: function () {

        let eventAction = brick.get('event.action');

        function call (e) {

            let that = this;

            if (this.hasAttribute('ic-ajax-disabled')) return;

            let $elm = $(this);
            let name = $elm.attr('ic-ajax');

            let defaultCall = function () {
                //console.log(arguments)
            };

            let before = $elm.icParseProperty2('ic-submit-before') || defaultCall;

            let data = $elm.data('ic-submit-data') || $elm.attr('ic-submit-data');
            let _data = before.call(that, data);
            if (_data === false) return;
            data = _data || data;

            let domain = brick.get('ajax.domain') || '';
            let url = domain + $elm.attr('ic-submit-action');
            let dataType = $elm.attr('ic-submit-data-type') || 'json';
            let method = $elm.attr('ic-submit-method') || 'post';

            let failed = $elm.icParseProperty2('ic-submit-on-fail') || defaultCall;
            let done = $elm.icParseProperty2('ic-submit-on-done') || defaultCall;
            let always = $elm.icParseProperty2('ic-submit-on-always') || defaultCall;

            let $loading = $('[ic-role-loading=?]'.replace('?', name || +(new Date)));
            $loading.length ? $loading.show() && $elm.hide() : $elm.setLoading();

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

        let $doc = $(document.body);
        $doc.on(eventAction, '[ic-ajax]:not([ic-ajax-enter])', call);
        $doc.on('ic-ajax', '[ic-ajax]', call);

    }
}

const ajaxAuto = {
    fn: function ($elm) {
        $elm.icAjax();
    }
}

const ajaxEnter = {
    fn: function ($elm) {
        $elm.icEnterPress(function () {
            $elm.icAjax();
        });
    }
}


export { ajaxAuto, ajaxEnter }
