/**
 * Created by julien.zhang on 2014/11/5.
 */

import $ from 'jquery'


export default function ($elm, attrs) {

    let $document = $(document);

    let startX = 0, startY = 0, x = 0, y = 0;
    let vw, vh;
    let w, h;

    $document.on('click', '[ic-drag-key]', function (e) {

        let th = $(this);
        let drag = th.attr('ic-drag-key');
        let d = th.attr('ic-drag-direction');
        let m = 140;
        $elm = $('[ic-drag-handle=?]'.replace('?', drag)).css({position: 'relative'});
        w = $elm.width();
        h = $elm.height();
        vw = $elm.closest('[ic-drag-view]').css({position: 'relative'}).width();
        vh = $elm.closest('[ic-drag-view]').width();
        let position = $elm.position();
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


    $document.on('mousedown', '[ic-drag-handle]', function (e) {

        e.preventDefault();

        startX = e.pageX;
        startY = e.pageY;

        $elm = $(this).css({position: 'relative'});

        vw = $elm.closest('[ic-drag-view]').width();
        vh = $elm.closest('[ic-drag-view]').height();

        let position = $elm.position();
        x = position.left;
        y = position.top;

        w = $elm.width();
        h = $elm.height();

        $document.on('mousemove', onMouseMove);
        $document.on('mouseup', onMouseUp);

        return false;
    });


    function onMouseMove (e) {

        let moveX = e.pageX - startX;
        let moveY = e.pageY - startY;

        startX = e.pageX;
        startY = e.pageY;

        x += moveX;
        y += moveY;

        x = x < -(w - vw) ? -(w - vw) : x;
        x = x >= 0 ? 0 : x;

        y = y < -(h - vh) ? -(h - vh) : y;
        y = y >= 0 ? 0 : y;

        $elm.css({
            top: y + 'px',
            left: x + 'px'
        });

        return false;
    }

    function onMouseUp () {
        $document.off('mousemove', onMouseMove);
        $document.off('mouseup', onMouseUp);
    }

}