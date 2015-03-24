/**
 * Created by julien.zhang on 2014/10/11.
 */

directives.add('ic-event', function () {

    var events = 'click,change';

    var targets = events.replace(/(?:^|,)(\w+?)(?=(?:,|$))/g, function (m, $1) {
        var s = '[ic-?]'.replace('?', $1);
        return m.replace($1, s);
    });

    var $doc = $('body');

    events = events.split(',');
    targets = targets.split(',');

    _.forEach(events, function(event, i, list){
        var target = targets[i];
        $doc.on(event, target, _call);
    });


    function _call(e){
        var th = $(this);
        var type = e.type;
        var fn = th.attr('ic-' + type);
        fn = th.icParseProperty(fn);

        return fn.apply(this, [e]);
    }

});
