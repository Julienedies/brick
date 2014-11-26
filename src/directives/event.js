/**
 * Created by julien.zhang on 2014/10/11.
 */

directives.add('ic-event', function (elm) {


    var events = 'click';

    var target = events.replace(/(?:^|,)(\w+?)(?=(?:,|$))/g, function (m, $1) {
        var s = '[ic-?]'.replace('?', $1);
        return m.replace($1, s);
    });


    $('body').on(events, target, function (e) {

        var th = $(this);
        var type = e.type;
        var fn = th.attr('ic-' + type);
        fn = th.icParseProperty(fn);

        return fn.apply(this, [e]);

    });


});
