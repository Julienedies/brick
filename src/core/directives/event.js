/**
 * Created by julien.zhang on 2014/10/11.
 */

import brick from '../export'

export default {
    selfExec: true,
    once: true,
    fn: function () {

        var eventAction = brick.get('event.action');

        var events = brick.get('ic-event.extend') || 'click,change';

        var targets = events.replace(/(?:^|,)(\w+?)(?=(?:,|$))/g, function (m, $1) {
            var s = '[ic-?]'.replace('?', $1);
            return m.replace($1, s);
        });

        var $doc = $(document);

        events = events.split(',');
        targets = targets.split(',');

        _.forEach(events, function (event, i, list) {
            var target = targets[i];
            if (event == 'click') event = eventAction;
            $doc.on(event, target, _call);
        });


        function _call (e) {
            var th = $(this);
            var type = e.type;
            var fn = th.attr('ic-' + type);
            fn = th.icParseProperty(fn);
            return fn.apply(this, [e]);
        }

    }
}