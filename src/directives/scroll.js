/**
 * Created by julien on 2015/11/30.
 */

brick.directives.reg('ic-scroll', function ($elm) {

    var $th = $elm || $(this);

    var onScroll = $elm.icParseProperty2('ic-scroll');

    var prevScrollTop = 0;
    var scrollDirection = 'down';

    onScroll && $th.on('ic-scroll', onScroll);

    $th.on('scroll', _.throttle(function (e) {
        var scrollTop = $th.scrollTop();
        var end;
        scrollDirection = (scrollTop - prevScrollTop > 1) ? 'down' : 'up';
        prevScrollTop = scrollTop;
        if (scrollDirection == 'down' && $th[0].scrollHeight <= $th[0].clientHeight + scrollTop) {
            console.log('trigger ic-scroll.end');
            $th.trigger('ic-scroll-end');
            end = true;
        }
        $th.trigger('ic-scroll', {direction: scrollDirection, end: end});
    }, 300));

});