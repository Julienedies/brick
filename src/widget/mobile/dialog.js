/**
 * Created by julien.zhang on 2014/10/29.
 */


directives.reg('ic-dialog', function ($elm, attrs) {

    var event = brick.config.get(IC_EVENT_TRIGGER_TYPE) || IC_DEFAULT_EVENT_TRIGGER_TYPE;

    $('body').on(event, '[ic-dialog-cancel], [ic-dialog-close], [ic-dialog-confirm]', function(e){

        var $th = $(this);
        var type = this.hasAttribute('ic-dialog-confirm');

        var $dialog = $th.closest('[ic-dialog]');

        $dialog.icAniOut(21,function(){
            $dialog.trigger('ic-dialog.hide', type);
        });

    });

}, {selfExec: true, once: true });



directives.reg('ic-prompt', function ($elm, attrs) {

    var event = brick.config.get(IC_EVENT_TRIGGER_TYPE) || IC_DEFAULT_EVENT_TRIGGER_TYPE;

    $('body').on(event, '[ic-prompt-cancel], [ic-prompt-close], [ic-prompt-confirm]', function(e){

        var $th = $(this);
        var type = this.hasAttribute('ic-prompt-confirm');

        var $dialog = $th.closest('[ic-prompt]');

        $dialog.icAniOut(21,function(){
            $dialog.trigger('ic-prompt.hide', type);
        });

    });

}, {selfExec: true, once: true });