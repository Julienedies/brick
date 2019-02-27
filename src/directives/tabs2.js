/**
 * Created by Julien on 2016/1/12.
 */

import $ from 'jquery'
import brick from '../core/export'

export default function ($elm, attrs) {

    let th = $elm;
    let name = th.attr('ic-tabs2');
    let disabled = th.attr('ic-tab-disabled');
    let tabSelect = th.attr('ic-tab-$');
    let conSelect = th.attr('ic-tabc-$');
    let activeTab = th.attr('ic-tab-active');
    let $tabSelect;
    let cla = 'active';
    let s_tab = '[ic-tab]';

    if (tabSelect) {
        th.find(tabSelect).each(function (i) {
            let th = $(this);
            th.attr('ic-tab', i);
        });
    }

    $elm.on('click', s_tab, function (e) {
        if (this.hasAttribute('ic-tab-disabled')) return;
        let $th = $(this);
        if ($th.hasClass(cla)) return;
        let $siblings = $th.siblings().removeClass(cla);
        $th.addClass(cla);
        $elm.trigger('ic-tabs.change', {target: this, val: $th.attr('ic-tab-val'), index: $th.index()});
    });

}