/**
 * Created by julien on 2015/11/30.
 */

brick.directives.reg('ic-infinite-scroll', function($elm){

    var $th = $elm || $(this);

    var onEnd = $elm.icParseProperty2('ic-infinite-scroll');

    var prevScrollTop;
    var scrollDirection = 'down';

    $th.scroll(_.throttle(function (e) {
        var scrollTop = $th.scrollTop();
        scrollDirection = (prevScrollTop || 0 ) > scrollTop ? 'up' : 'down';
        prevScrollTop = scrollTop;
        if(scrollDirection == 'down' && $th[0].scrollHeight <= $th[0].clientHeight + $th.scrollTop()){
            console.log('trigger ic-infinite-scroll.end');
            $th.trigger('ic-infinite-scroll.end');
            onEnd && onEnd.call($elm[0]);
        }
    }, 300));

});