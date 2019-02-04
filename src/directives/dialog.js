/**
 * Created by julien.zhang on 2014/10/29.
 */

import brick from '../core/export'

//ic-dialog
export default {
    selfExec: true,
    once: true,
    fn: function ($elm, attrs) {

        var eventAction = brick.get('event.action');

        $(document.body).on(eventAction, '[ic-dialog-cancel], [ic-dialog-close], [ic-dialog-confirm]', function (e) {

            var $th = $(this);
            var type = this.hasAttribute('ic-dialog-confirm');

            var $dialog = $th.closest('[ic-dialog]');

            $dialog.icAniOut(21, function () {
                $dialog.trigger('ic-dialog.close', type);
                $dialog.trigger('ic-dialog.hide', type);
            });

        }).on(eventAction, '[ic-dialog-href]', function (e) {
            var target = $(this).attr('ic-dialog-href');
            $('[ic-dialog=?]'.replace('?', target)).icDialog();
            return false;
        });

    }
}


//ic-prompt
const prompt = {
    selfExec: true,
    once: true,
    fn: function ($elm, attrs) {

        var eventAction = brick.get('event.action');

        $(document.body).on(eventAction, '[ic-prompt-cancel], [ic-prompt-close], [ic-prompt-confirm]', function (e) {

            var $th = $(this);
            var type = this.hasAttribute('ic-prompt-confirm');

            var $dialog = $th.closest('[ic-prompt]');

            $dialog.icAniOut(21, function () {
                $dialog.trigger('ic-prompt.hide', type);
            });

        });

    }
}

export { prompt }
