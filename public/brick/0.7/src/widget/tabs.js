/**
 * Created by julien.zhang on 2014/10/11.
 */

directives.reg('ic-tabs', function ($elm, attrs) {

    var eventAction = brick.get('event.action');

        var th = $elm;
        var name = th.attr('ic-tabs');
        var disabled = th.attr('ic-tab-disabled');
        var tabSelect = th.attr('ic-tab-select');
        var conSelect = th.attr('ic-con-select');
        var activeTab = th.attr('ic-tab-active');
        var activeCon;
        var $tabSelect;

        if (tabSelect) {
            $tabSelect = th.find(tabSelect).each(function (i) {
                var th = $(this);
                th.attr('ic-role-tab', i);
            });
        }else{
            $tabSelect = $elm.find('[ic-role-tab]');
        }

        var tabc = $('[ic-role-tabc=' + name + ']');

        if (tabc) {
            tabc.find(conSelect || '[ic-role-con]').each(function (i) {
                i = $tabSelect.eq(i).attr('ic-role-tab');
                $(this).attr('ic-role-con', i);
            });
        }

        th.on('click', '[ic-role-tab]:not([ic-tab-disabled=1])', tabc.length ? call_1 : call_2);


        function call_1(e) {
            call_2(e, this);

            var con = activeTab.attr('ic-role-tab');
            activeCon && activeCon.hide();
            activeCon = tabc.find('[ic-role-con=' + con + ']').show();
        }

        function call_2(e, that) {
            activeTab && activeTab.removeClass('active');
            activeTab = $(that || this).addClass('active');
            th.trigger('ic-tabs.change', {activeTab: activeTab, target:activeTab[0], val: activeTab.attr('ic-tab-val'), index:activeTab.index()});
        }

        //fire
        if (activeTab) {
            activeTab = th.find('[ic-role-tab=?]'.replace('?', activeTab));
        } else {
            activeTab = th.find('[ic-role-tab]:not([ic-tab-disabled=1])').first();
        }

        activeTab.trigger('click');

        //var activeCon = activeTab.addClass('active').attr('ic-role-tab');

        //activeCon = tabc.length && tabc.find('[ic-role-con]').hide().filter('[ic-role-con=' + activeCon + ']').show();


});

