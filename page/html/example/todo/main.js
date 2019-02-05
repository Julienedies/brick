localStorage = window.localStorage;

// model
brick.services.reg('tasksModel', function (recordManager) {

    var local = localStorage.getItem('tasksModel');

    return new recordManager({
        key: 'id',
        eventPrefix: 'tasksModel',
        broadcast: true
    }).init(local && JSON.parse(local) || []);

}, ['recordManager']);

//controller
brick.controllers.reg('tasksCtrl', function (scope, tasksModel) {

    var type = 0;

    var render = function (e, msg) {
        var model = type ? type === 1 ? tasksModel.get(false, 'complete') : tasksModel.get(true, 'complete') : tasksModel.get();
        type === 0 && localStorage.setItem('tasksModel', JSON.stringify(model));
        scope.render('task-list', model);
    };

    scope.on('tasksModel.*', render);

    scope.add = function (e) {
        var val = this.value;
        val && tasksModel.add({name: val, id: +new Date, complete: false});
        this.value = '';
    };

    scope.edit = function (e) {
        $(this).parent().find(':text').prop('disabled', false).focus();
    };

    scope.change = function (e) {
        var parent = $(this).parent();
        var id = parent.data('id');
        var complete = parent.find(':checkbox').prop('checked');
        var name = parent.find(':text').attr('disabled', true).val();
        tasksModel.find(id).set({complete: !!complete, name: name});
    };

    scope.remove = function (e, id) {
        tasksModel.find(id*1).remove();
    };

    scope.clear = function (e) {
        tasksModel.find(true, 'complete').remove();
    };

    scope.$elm.find('[ic-tabs=b]').on('ic-tabs.change', function (e, msg) {
        type = msg.activeTab.index() * 1;
        render();
    });

}, {depend: ['tasksModel']});
