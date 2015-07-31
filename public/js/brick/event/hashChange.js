/**
 * Created by Julien on 2015/7/29.
 */


//hashchange
!function(){

    var $win = $(window);

    var prev;

    var fire = function(hash, e){

        if(typeof hash === 'object'){
            e = hash;
            hash = void(0);
        }

        hash = hash || location.hash.replace(/^#[^\w]*/i,'') || '/';
        console.log(hash);

        brick.broadcast('ic-hashChange.' + hash, {from:prev, origin:e});

        prev = hash;

    };

    $win.on('hashchange', function(e){

        console.log(e);

        fire(e)

    });


    fire();

}();