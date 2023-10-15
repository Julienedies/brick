/**
 * Created by julien.zhang on 2014/10/11.
 */

import _ from 'lodash'
import $ from 'jquery'
import brick from '../export'

export default {
    name: 'event',
    selfExec: true,
    once: true,
    fn: function () {

        let eventAction = brick.get('event.action');

        let events = brick.get('ic-event.extend') || 'click,change,dblclick,focus,hover';

        let targets = events.replace(/(?:^|,)(\w+?)(?=(?:,|$))/g, function (m, $1) {
            let s = '[ic-?]'.replace('?', $1);
            return m.replace($1, s);
        });

        let $doc = $(document);

        events = events.split(',');
        targets = targets.split(',');

        _.forEach(events, function (event, i, list) {
            let target = targets[i];
            if (event === 'click') event = eventAction;
            $doc.on(event, target, _call);
        });

        function _call (e) {
            let th = $(this);
            let type = e.type;
            let val = th.attr('ic-' + type);
            let fn = th.icParseProperty(val);
            if (fn) {
                return fn.apply(this, [e]);
            } else {
                console.error(`${ val } is undefined.`);
            }
        }

    }
}
