/**
 * Created by Julien on 2016/1/12.
 */

directives.reg('ic-tabs2', function ($elm, attrs) {

    var th = $elm;
    var name = th.attr('ic-tabs2');
    var disabled = th.attr('ic-tab-disabled');
    var tabSelect = th.attr('ic-tab-select');
    var conSelect = th.attr('ic-con-select');
    var activeTab = th.attr('ic-tab-active');
    var $tabSelect;
    var cla = 'active';
    var s_tab = '[ic-role-tab]';

    $elm.on('click', s_tab, function(e){
        if(this.hasAttribute('ic-tab-disabled')) return;
        var $th = $(this);
        if($th.hasClass(cla)) return;
        var $siblings = $th.siblings().removeClass(cla);
        $th.addClass(cla);
        $elm.trigger('ic-tabs.change', {target:this, val: $th.attr('ic-tab-val'), index:$th.index()});
    });

});