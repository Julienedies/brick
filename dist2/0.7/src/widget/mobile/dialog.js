/**
 * Created by julien.zhang on 2014/10/29.
 */

//ic-dialog
directives.reg('ic-dialog', function ($elm, attrs) {

    var eventAction = brick.get('event.action');

    $(document.body).on(eventAction, '[ic-dialog-cancel], [ic-dialog-close], [ic-dialog-confirm]', function(e){alert(1)

        var $th = $(this);
        var type = this.hasAttribute('ic-dialog-confirm');

        var $dialog = $th.closest('[ic-dialog]');

        $dialog.icAniOut(21, function(){alert(1)
            $dialog.trigger('ic-dialog.hide', type);
            $dialog.trigger('ic-dialog.close', type);
        });

    });

}, {selfExec: true, once: true });


//ic-prompt
directives.reg('ic-prompt', function ($elm, attrs) {

    var eventAction = brick.get('event.action');

    $(document.body).on(eventAction, '[ic-prompt-cancel], [ic-prompt-close], [ic-prompt-confirm]', function(e){

        var $th = $(this);
        var type = this.hasAttribute('ic-prompt-confirm');

        var $dialog = $th.closest('[ic-prompt]');

        $dialog.icAniOut(21,function(){
            $dialog.trigger('ic-prompt.hide', type);
        });

    });

}, {selfExec: true, once: true });