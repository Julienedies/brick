/**
 * Created by Julien on 2015/7/29.
 */


//hashchange
!function(){

    var enable = brick.config.get('ic-hashChange.enable');

    if(!enable) return;

    var $win = $(window);

    var prev;

    var fire = function(hash, e){

        if(typeof hash === 'object'){
            e = hash;
            hash = void(0);
        }

        hash = hash || location.hash.replace(/^#[^\w]*/i,'') || '/';

        var query = hash.split('?');

        brick.broadcast('ic-hashChange.' + hash, {from:prev,hash:query[0], origin:e, query:query[1]});

        prev = hash;

    };

    $win.on('hashchange', function(e){

        fire(e)

    });


    fire();

}();