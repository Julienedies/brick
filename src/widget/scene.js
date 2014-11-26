/**
 * Created by julien.zhang on 2014/10/28.
 */

directives.add('ic-scene', function () {

    var scenes = $('[ic-scene]');
    var active = $('[ic-scene-active]');
    active = active.size() ? active : scenes.first();

    active.show();
    scenes.not(active).hide();

    scenes.each(function (i) {

        var th = $(this);

        th.on('click', '[ic-role-scene-next]', function(e){
            var next = $(this).attr('ic-role-scene-next');
            active && active.hide();
            active = $('[ic-scene=' + next + ']').show();

        });


    });


});

