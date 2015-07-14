/**
 * Created by julien on 2015/7/13.
 */

//ic-select-list

directives.add('ic-select-list', function ($elm, attrs) {

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

            return this.each(function(i){
                $(this).trigger(eventSpace + action, msg);
            });

            //this.trigger(eventSpace + action, msg);

        };

    }


    // $('[ic-select-list]').each(function (i) {

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
            if (selected) {
                this.selectedLength++;
            } else {
                this.selectedLength--;
            }

            if (this.selectedLength === this.length) {
                console.log('isall is true');
            }
            if (this.selectedLength === 0) {
                console.log('not selected');
            }

            var name = this.name;
            return $elm.trigger(eventSpace + 'change', {name: name, val: val, selected: selected, target:$elm.find('[ic-select-val='+val+']')[0]});
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
                    $elm.trigger(eventSpace + 'change', {name: name, val: i, selected: false, target:$elm.find('[ic-select-val='+i+']')[0]});
                }
            }
        },
        all: function () {

        },
        items: {}
    };

    $elm = $elm || $(this);
    var name = $elm.attr(list);
    var isMultiple = $elm.attr('ic-select-multiple');
    var isAll = $elm.find('ic-select-all');
    var $more = $elm.find(more);
    var $all = $elm.find(all);

    var expandHeight = $elm.height();
    $more.nextAll().hide();
    var shirkHeight = $elm.height();

    model.name = name;
    window.xx = model;

    var $items = $elm.find(item).each(function (i) {

        model.add(this.getAttribute(val), this.getAttribute('ic-selected') != void(0));

    });

    //var show = {height: $elm.find(item + ':first').height() + 'px', borderWidth: '1px'};
    //var hide = {height: 0, borderWidth: 0};

    var $active = $elm.find('[ic-selected]').addClass(cla);


    //对外接口
    $elm.on(eventSpace + 'cancel', function (e, msg) {
        if(msg){
            $elm.find('[ic-select-val=?]'.replace('?', msg)).removeClass(cla);
            model.set(msg, false);
        }else{
            $elm.find('[ic-select-val]').not('[ic-selected]').each(function(i){
                var $th = $(this);
                var val = $th.attr('ic-select-val');
                model.set(val, false);
            });
        }
    });

    //bind event
    $elm.on('click', item, function (e) {

        var $th = $(this);
        var name = $th.attr(val);

        var $siblings = $items.not(this);

        $all.removeClass(cla);

        if (isMultiple) {
            $th.toggleClass(cla);
            model.toggle(name);
        } else {
            if ($th.hasClass(cla)) return;
            $th.addClass(cla);
            $siblings.removeClass(cla);
            model.clear();
            model.set(name, true);
        }

    }).on('click', all, function (e) {

        var th = $(this).addClass(cla);
        var $siblings = $items.not(this);
        $siblings.removeClass(cla);


    }).on('click', more, function (e) {

        $more.hide().nextAll().show();
        $elm.trigger('ic-more-show', {form:shirkHeight, to:expandHeight});

    }).on('click', shirk, function (e) {

        $more.show().nextAll().hide();
        $elm.trigger('ic-more-hide', {form:expandHeight, to:shirkHeight});

    });


});