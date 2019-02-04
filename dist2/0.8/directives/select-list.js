/**
 * Created by julien on 2015/7/13.
 */


brick.directives.reg('ic-select-list', function ($elm, attrs) {

    /*
     ic-select-list
     ic-select-item
     ic-select-all
     ic-select-more
     */

    var cla = 'selected';
    var list = 'ic-select-list';
    var item = '[ic-select-item]';
    var all = '[ic-select-all]';
    var more = '[ic-select-more]';
    var shirk = '[ic-select-shirk]';
    var box = '[ic-select-more-box]';
    var val = 'ic-select-val';
    var eventSpace = list + '.';

    if (!$.fn.icSelectList) {

        $.fn.icSelectList = function (action, msg) {

            console.log(eventSpace + action);

            if (action == 'val') {
                this.trigger(eventSpace + 'val', msg);
                return this.data('ic-selected-val');
            }

            return this.each(function (i) {
                $(this).trigger(eventSpace + action, msg);
            });

            //this.trigger(eventSpace + action, msg);

        };

    }


    var model = {
        name: '',
        isAll: false,
        length: 0,
        selectedLength: 0,
        add: function (val, selected) {
            this.items[val] = selected;
            this.length++;
            if (selected) this.selectedLength++;
        },
        set: function (val, selected) {
            this.items[val] = selected;
            var name = this.name;
            if (selected) {
                this.selectedLength++;
            } else {
                this.selectedLength--;
            }

            if (this.selectedLength === this.length) {
                console.log('isall is true');
                //$elm.trigger(eventSpace + 'all',{name:name});
            }
            if (this.selectedLength === 0) {
                console.log('not selected');
                //$elm.trigger(eventSpace + 'not',{name:name});
            }

            //return $elm.trigger(eventSpace + 'change', {name: name, val: val, selected: selected, target:$elm.find('[ic-select-val='+val+']')[0]});
        },
        toggle: function (val) {
            var isSelected = this.items[val];
            console.log(isSelected);
            this.set(val, !isSelected);
        },
        clear: function () {
            var items = this.items;
            var name = this.name;
            for (var i in items) {
                if (items[i] === true) {
                    items[i] = false;
                    this.selectedLength--;
                    //$elm.trigger(eventSpace + 'change', {name: name, val: i, selected: false, target:$elm.find('[ic-select-val='+i+']')[0]});
                }
            }
        },
        get: function () {
            var result = [];
            var items = this.items;
            for (var i in items) {
                if (items[i] === true) {
                    result.push(i);
                }
            }

            return result;
        },
        all: function () {

        },
        items: {}
    };

    $elm = $elm || $(this);
    var name = $elm.attr(list);
    var handle = $elm.is('[ic-select-handle]') ? ' [ic-select-handle]' : '';
    var isMultiple = $elm.attr('ic-select-multiple') * 1;
    var isReadonly = $elm.attr('ic-select-readonly');
    var isOptional = $elm.is('[ic-select-optional]');
    var isAll = $elm.find('ic-select-all');
    var $more = $elm.find(more);
    var $all = $elm.find(all);

    var expandHeight = $elm.height();
    $more.nextAll().hide();
    var shirkHeight = $elm.height();

    model.name = name;

    var $items = $elm.find(item).each(function (i) {

        model.add(this.getAttribute(val), this.getAttribute('ic-selected') != void(0));

    });

    //var show = {height: $elm.find(item + ':first').height() + 'px', borderWidth: '1px'};
    //var hide = {height: 0, borderWidth: 0};

    var $active = $elm.find('[ic-selected]').addClass(cla);

    //对外接口
    $elm.on(eventSpace + 'val', function (e, msg) {
        var val = model.get();
        $elm.data('ic-selected-val', val);
    });

    $elm.on(eventSpace + 'cancel', function (e, msg) {
        if (msg) {
            $elm.find('[ic-select-val="?"]'.replace('?', msg)).removeClass(cla);
            model.set(msg, false);
        } else {
            $elm.find('[ic-select-val]').not('[ic-selected]').each(function (i) {
                var $th = $(this).removeClass(cla);
                var val = $th.attr('ic-select-val');
                model.set(val, false);
            });
        }
        $elm.trigger(eventSpace + 'change', getVal());
    });

    function getVal() {

        var result = [];
        var extra = false;

        var $filter = $items.filter('.' + cla).each(function (i) {
            var $th = $(this);
            extra = this.hasAttribute('ic-select-extra');
            result.push({name: name, text: $th.text(), val: $th.attr('ic-select-val')});
        });

        return {
            name: name,
            result: result,
            over: result.length - isMultiple,
            all: $items.length == $filter.length,
            extra: extra,
            __size: $items.length
        };
    }


    if (isReadonly) return;

    //bind event
//    $elm.on('click', '[ic-select-ignore]', function(e){
//        e.stopPropagation();
//    });
    $elm.on('click', item, function (e) {

        var $th = $(this).closest(item);
        var _val = $th.attr(val);

        $all.removeClass(cla);

        if (isNaN(isMultiple) || isMultiple === 1) {
            if ($th.hasClass(cla)) {
                if (isOptional) {
                    $th.toggleClass(cla);
                    model.toggle(_val);
                    $elm.trigger(eventSpace + 'change', getVal());
                }
                return;
            }
            $items.removeClass(cla);
            $th.addClass(cla);
            model.clear();
            model.set(_val, true);
        } else {
            $th.toggleClass(cla);
            model.toggle(_val);
        }

        $elm.trigger(eventSpace + 'change', getVal());

    }).on('click', all, function (e) {

        if ($all.hasClass(cla)) return;

        var th = $all.addClass(cla);
        $items.removeClass(cla);

        $elm.trigger(eventSpace + 'change', {name: name, all: true});

    }).on('click', more, function (e) {

        $more.hide().nextAll().show();
        $elm.trigger('ic-more.show', {form: shirkHeight, to: expandHeight});

    }).on('click', shirk, function (e) {

        $more.show().nextAll().hide();
        $elm.trigger('ic-more.hide', {form: expandHeight, to: shirkHeight});

    });

    if ($active.index() > $more.index()) {
        $more.click();
    }


});