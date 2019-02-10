/**
 * Created by julien.zhang on 2014/10/11.
 */

import $ from 'jquery'
import brick from '../core/export'

export default function ($elm, attrs) {

    let eventAction = brick.get('event.action');

    let th = $elm;
    let name = th.attr('ic-tabs');
    let disabled = th.attr('ic-tab-disabled');
    let tabSelect = th.attr('ic-tab-select');
    let conSelect = th.attr('ic-tabc-select');
    let activeTab = th.attr('ic-tab-active');
    let cla = th.attr('ic-tab-cla') || 'active';
    let activeCon;
    let $tabSelect;

    if (tabSelect) {
        $tabSelect = th.find(tabSelect).each(function (i) {
            let th = $(this);
            th.attr('ic-tab', i);
        });
    } else {
        $tabSelect = $elm.find('[ic-tab]');
    }

    let tabc = $('[ic-tabc=' + name + ']');

    if (tabc) {
        tabc.find(conSelect || '[ic-tab-con]').each(function (i) {
            i = $tabSelect.eq(i).attr('ic-tab');
            $(this).attr('ic-tab-con', i);
        });
    }

    th.on('click', '[ic-tab]:not([ic-tab-disabled=1])', tabc.length ? call_1 : call_2);


    function call_1 (e) {
        call_2(e, this);

        let con = activeTab.attr('ic-tab');
        activeCon && activeCon.hide();
        activeCon = tabc.find('[ic-tab-con=' + con + ']').show();
    }

    function call_2 (e, that) {
        activeTab && activeTab.removeClass(cla);
        activeTab = $(that || this).addClass(cla);
        th.trigger('ic-tabs.change', {activeTab: activeTab, target: activeTab[0], val: activeTab.attr('ic-tab-val'), index: activeTab.index()});
    }

    //fire
    if (activeTab) {
        activeTab = th.find('[ic-tab=?]'.replace('?', activeTab));
    } else {
        activeTab = th.find('[ic-tab]:not([ic-tab-disabled=1])').first();
    }

    activeTab.trigger('click');

    //let activeCon = activeTab.addClass('active').attr('ic-tab');

    //activeCon = tabc.length && tabc.find('[ic-tab-con]').hide().filter('[ic-tab-con=' + activeCon + ']').show();


}

