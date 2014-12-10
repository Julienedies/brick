/**
 * Created by julien.zhang on 2014/10/15.
 */

directives.add('ic-dropdown', function ($elm, attrs) {


    var th = $elm;

    th.css({position: 'relative'});

    var h = th.height();

    var menu = th.find('[ic-role-dropdown-menu]').css({position: 'absolute', top: h + 'px'});

    var timer;
    if (menu.size()) {
        th.hover(function (e) {
            timer = setTimeout(function () {
                menu.show(300);
            }, 200);
        }, function () {
            clearTimeout(timer);
            menu.slideUp(200);
        });
    }

    var con = th.find('[ic-role-dropdown-con]').css({position: 'absolute', overflow: 'hidden'});

    if (con.size()) {

        var ch = con.height();

        //th.css({overflow:'hidden',height:h+'px'});

        var flag = 1;

        th.find('[ic-role-dropdown-toggle]').click(function (e) {
            if (flag) {
                //con.slideDown();
                con.css({height: 'auto'});
                flag = 0;
            } else {
                con.css({height: ch + 'px'});
                flag = 1;
            }
        });


    }


});
