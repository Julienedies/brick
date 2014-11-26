/**
 * Created by julien.zhang on 2014/11/5.
 */

directives.add('ic-drag-view', function () {

    var $document = $(document);

    //
    $('[ic-drag-view]').each(function (i) {

        var $elm;

        var startX = 0, startY = 0, x = 0, y = 0;
        var vw;
        var w;

        $document.on('click', '[ic-role-drag-key]', function (e) {

            var th = $(this);
            var drag = th.attr('ic-role-drag-key');
            var d = th.attr('ic-drag-direction');
            var m = 140;
            $elm = $('[ic-role-drag-handle=?]'.replace('?', drag)).css({position: 'relative'});
            w = $elm.width();
            vw = $elm.closest('[ic-drag-view]').css({position: 'relative'}).width();
            var position = $elm.position();
            x = position.left;
            y = position.top;

            if (d === 'left') {
                x -= m;
                x = x < -(w - vw) ? -(w - vw) : x;
                $elm.animate({left: x}, 500);
            }

            if (d === 'right') {
                x += m;
                x = x >= 0 ? 0 : x;
                $elm.animate({left: x}, 500);
            }

        });

        $document.on('mousedown', '[ic-role-drag-handle]', function (e) {

            e.preventDefault();

            startX = e.pageX;
            startY = e.pageY;

            $elm = $(this).css({position: 'relative'});

            vw = $elm.closest('[ic-drag-view]').width();

            var position = $elm.position();
            x = position.left;
            y = position.top;

            w = $elm.width();

            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);

        });


        function mousemove(e) {

            var moveX = e.pageX - startX;
            var moveY = e.pageY - startY;

            startX = e.pageX;
            startY = e.pageY;

            x += moveX;
            y += moveY;

            x = x < -(w - vw) ? -(w - vw) : x;
            x = x >= 0 ? 0 : x;

            $elm.css({
                //top: y + 'px',
                left: x + 'px'
            });
        }

        function mouseup() {
            $document.unbind('mousemove', mousemove);
            $document.unbind('mouseup', mouseup);
        }


    });
});