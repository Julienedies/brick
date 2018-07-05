/**
 * Created by julien.zhang on 2014/10/11.
 */

directives.reg('ic-slider', function ($elm, attr) {

    var th = $elm;

    var direction = th.attr('ic-slider-direction');

    var vw = th.width();
    var vh = th.height();

    th.css({position: 'relative', overflow: 'hidden'});

    var style1 = {width: vw + 'px', height: vh + 'px'};
    if (!direction) {
        style1.float = 'left';
    }

    var items = th.find('[ic-role-slider-item]').css(style1);
    var len = items.size();

    var style2 = direction ? {height: len * vh + 'px'} : { width: len * vw + 'px'};
    style2.position = 'absolute';
    var view = th.find('[ic-role-slider-view]').css(style2);

    var current = 1;

    var currentPagination = th.find('[ic-role-slider-pagination]').first().addClass('active');

    var broadcast = function () {
        th.trigger('ic-slider.change', items.eq(current - 1));
    };

    broadcast();

    var onPagination = function () {
        broadcast();
    };

    if (currentPagination) {
        onPagination = function () {
            currentPagination && currentPagination.removeClass('active');
            currentPagination = th.find('[ic-role-slider-pagination=' + current + ']').addClass('active');
            broadcast();
        }
    }


    var prev = direction ?
        function (e) {

            if (current <= 1) {
                current = len;
                view.animate({
                    top: (-len + 1) * vh
                }, 300, onPagination);
            } else {
                view.animate({
                    top: (2 - current) * vh
                }, 300, function () {
                    current -= 1;
                    onPagination();
                });
            }

            return false;
        } :
        function (e) {

            if (current <= 1) {
                current = len;
                view.animate({
                    left: (-len + 1) * vw
                }, 500, onPagination);
            } else {
                view.animate({
                    left: (2 - current) * vw
                }, 500, function () {
                    current -= 1;
                    onPagination();
                });
            }

            return false;
        };

    var next = direction ?
        function (e) {

            if (current >= len) {
                current = 1;
                view.animate({
                    top: 0
                }, 300, onPagination);
            } else {
                view.animate({
                    top: -current * vh
                }, 300, function () {
                    current += 1;
                    onPagination();
                });
            }

            return false;
        } :
        function (e) {

            if (current >= len) {
                current = 1;
                view.animate({
                    left: 0
                }, 500, onPagination);
            } else {
                view.animate({
                    left: -current * vw
                }, 500, function () {
                    current += 1;
                    onPagination();
                });
            }

            return false;
        };

    var interval = th.attr('ic-slider-interval');
    var timer;

    if (interval) {

        timer = setInterval(next, interval);

        th.hover(function (e) {
            clearInterval(timer);
        }, function (e) {
            timer = setInterval(next, interval);
        });
    }

    /* event */
    th.delegate('[ic-role-slider-prev]', 'click', prev);

    th.delegate('[ic-role-slider-next]', 'click', next);

    th.delegate('[ic-role-slider-pagination]', 'click', function (e) {
        currentPagination && currentPagination.removeClass('active');
        var th = $(this).addClass('active');
        var pagination = th.attr('ic-role-slider-pagination');
        current = pagination - 1;
        next();
    });


});
