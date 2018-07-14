/**
 * Created by julien.zhang on 2014/10/11.
 */

directives.reg('ic-tabs', function ($elm, attrs) {

    var eventAction = brick.get('event.action');

        var th = $elm;
        var name = th.attr('ic-tabs');
        var disabled = th.attr('ic-tab-disabled');
        var tabSelect = th.attr('ic-tab-select');
        var conSelect = th.attr('ic-tabc-select');
        var activeTab = th.attr('ic-tab-active');
        var cla = th.attr('ic-tab-cla') || 'active';
        var activeCon;
        var $tabSelect;

        if (tabSelect) {
            $tabSelect = th.find(tabSelect).each(function (i) {
                var th = $(this);
                th.attr('ic-tab', i);
            });
        }else{
            $tabSelect = $elm.find('[ic-tab]');
        }

        var tabc = $('[ic-tabc=' + name + ']');

        if (tabc) {
            tabc.find(conSelect || '[ic-tab-con]').each(function (i) {
                i = $tabSelect.eq(i).attr('ic-tab');
                $(this).attr('ic-tab-con', i);
            });
        }

        th.on('click', '[ic-tab]:not([ic-tab-disabled=1])', tabc.length ? call_1 : call_2);


        function call_1(e) {
            call_2(e, this);

            var con = activeTab.attr('ic-tab');
            activeCon && activeCon.hide();
            activeCon = tabc.find('[ic-tab-con=' + con + ']').show();
        }

        function call_2(e, that) {
            activeTab && activeTab.removeClass(cla);
            activeTab = $(that || this).addClass(cla);
            th.trigger('ic-tabs.change', {activeTab: activeTab, target:activeTab[0], val: activeTab.attr('ic-tab-val'), index:activeTab.index()});
        }

        //fire
        if (activeTab) {
            activeTab = th.find('[ic-tab=?]'.replace('?', activeTab));
        } else {
            activeTab = th.find('[ic-tab]:not([ic-tab-disabled=1])').first();
        }

        activeTab.trigger('click');

        //var activeCon = activeTab.addClass('active').attr('ic-tab');

        //activeCon = tabc.length && tabc.find('[ic-tab-con]').hide().filter('[ic-tab-con=' + activeCon + ']').show();


});

