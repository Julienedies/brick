/**
 * Created by julien on 2015/8/26.
 * require moment.js (https://github.com/moment/moment/)
 *
 */

/**
 * config:
 * ic-date-now     #定义当前日期，通常有server端提供，如果未提供则为浏览器端当前日期
 * ic-date-default="2015-08-31" #默认选中日期，多个以,或空格分隔
 * ic-date-format   #定义日期格式化格式,默认为YYYY-MM-DD，格式定义详见moment库
 * ic-date-multiple="true" #是否多选
 * ic-date-week-start #定义周一到周日的排列顺序，1-7 分别对应周一到周日
 * ic-date-on-render  #自定义render函数，接受一个日期模型对象作为参数，改日期对象封装了相关的日期数据，开发者根据需要渲染成合适的html
 *
 * ic-date-prev-m  #定义一个dom元素为显示上月按钮，如果有disabled属性，则无效
 * ic-date-next-m  #定义一个dom元素为显示下月按钮，如果有disabled属性，则无效
 * ic-date         #定义一个dom元素为日期选择cell，通过ic-date-enabled属性使其可用
 *
 * attach:
 * ic-date 2012-08-27,格式由 ic-date-format 定义
 * ic-date-status over:过去  today:今天  coming:未来
 *

 */
brick.directives.reg('ic-date-picker', function ($elm) {

    //var tpl = brick.createRender($elm[0]);

    var _d = new Date();
    var tpl = $elm.attr('ic-tpl');
    var _date = $elm.attr('ic-date-now') || _d.getFullYear() + '-' + (_d.getMonth() + 1) + '-' + _d.getDate();
    var _format = $elm.attr('ic-date-format') || 'YYYY-MM-DD';
    var multiple = $elm.attr('ic-date-multiple');
    var weekStart = $elm.attr('ic-date-week-start') || 1;
    var enabled = $elm.attr('ic-date-enabled') ? '[ic-date-enabled]' : '';
    var disabled = $elm.attr('ic-date-disabled') ? ':not([ic-date-disabled])' : '';
    var onRender = $elm.icParseProperty2('ic-date-on-render');

    var START = _date;
    var now = moment(_date, _format);
    var cla = 'selected';
    var weekMap = (function (weekStart) {
        var week = _.range(1, 8);
        var index = _.indexOf(week, weekStart * 1);
        var split = week.splice(index);
        split.unshift(0, 0);
        week.splice.apply(week, split);
        return week;
    })(weekStart);

    var selectedDateArr = (function () {
        var d = $elm.attr('ic-date-default');
        d = d && d.trim() && d.split(/(?:\s*,\s*)|(?:\s+)/img);
        return d || [];
    })();

    //更新html
    function render(date, flag) {
        var dateModel = model(date);
        if(onRender && !flag){
            onRender(dateModel);
        }else{
            $elm.icRender(tpl, {vm:dateModel});
            $elm.trigger('ic-date-picker.init');
        }
    }

    render(undefined, true);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //对外js接口
    $elm.on('ic-date-picker.render', function(e, msg){
        try{
            $elm.icRender(tpl, msg);
            $elm.trigger('ic-date-picker.init');
        }catch(e){
            console.log(e);
        }
    });

    $elm.on('ic-date-picker.recover', function(e, msg){
        _date = old_date;
    });

    $elm.on('ic-date-picker.next', function(e, msg){
        old_date = _date;
        _date = moment(_date, _format).add(1, 'months').format(_format);
        render(_date);
    });

    //取消一个日期选择, msg == YYYY-MM-DD
    $elm.on('ic-date-picker.cancel', function(e, msg){
        $elm.find('[ic-date=?]'.replace('?', msg)).removeClass(cla);
        selectedDateArr = _.without(selectedDateArr, msg);
    });

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var old_date;

    var eventAction = brick.get('event.action') || 'click';

    $elm.on(eventAction, '[ic-date-prev-m]:not([disabled]), [ic-date-next-m]:not([disabled])', function (e) {
        var call = this.hasAttribute('ic-date-prev-m') ? 'subtract' : 'add';
        old_date = _date;
        _date = moment(_date, _format)[call](1, 'months').format(_format);
        console.info(_date);
        render(_date);
    });

    $elm.on(eventAction, '[ic-date]'+enabled, multiple ? function (e) {
        var bindDate = this.getAttribute('ic-date');
        if (this.classList.contains(cla)) {
            this.classList.remove(cla);
            selectedDateArr = _.without(selectedDateArr, bindDate);
        } else {
            this.classList.add(cla);
            selectedDateArr.push(bindDate);
        }
        $elm.trigger('ic-date-picker.change', [selectedDateArr]);

    } : function (e) {
        if (!this.classList.contains(cla)) {
            $elm.find('[ic-date]').removeClass(cla);
            selectedDateArr = [];
            selectedDateArr.push(this.getAttribute('ic-date'));
            this.classList.add(cla);
            $elm.trigger('ic-date-picker.change', [selectedDateArr]);
        }
    });

    //////////////////////////////////////////////////////
    //init
    render(_date);

    /////////////////////////////////////////////////////

    //计算一个月的天数
    function _countDays(current){
        var year = current.year();
        var month = current.month();
        var days = _.range(1, current.daysInMonth() + 1);
        return days.map(function(day){
            return moment([year, month, day]).format(_format);
        });
    }

    //时间数据模型
    function model(date) {

        var current = date ? moment(date, _format) : moment();
        var prev = date ? moment(date, _format) : moment();
        prev.subtract(1, 'months');
        var next = date ? moment(date, _format) : moment();
        next.add(1, 'months');

        console.log(next.format(_format));

        var year = current.year();
        var month = current.month();

        //var days = _.range(1, current.daysInMonth() + 1);
        var calendar = [];
        var days = _countDays(current);
        var prevDays = _countDays(prev);
        var nextDays = _countDays(next);

        var len = days.length;

        var w = moment([year, month, 1]).weekday();
        if (w == 0) w = 7;

        var start = _.indexOf(weekMap, w);
        var _start = start;
        console.log(weekMap, w, start);
        while (_start > 0) {
            days.unshift(prevDays.pop());
            _start--;
        }

        var end = Math.ceil(days.length/7) * 7 - days.length;
        //var end = 42 - days.length;
        while (end > 0) {
            days.push(nextDays.shift());
            end--;
        }

        days = days.map(function(v, i){
            var m = moment(v, _format);
            var diff = m.diff(now, 'days');
            var status = diff < 0 ? 'over' : diff > 0 ? 'coming' : 'today';
            var position = i < start ? 'prev' : i > (len+start-1) ? 'next' : 'current';
            var isSelected = _.indexOf(selectedDateArr, v) > -1;
            var n = v.replace(/^\d\d\d\d-\d\d-0?/i,'');
            var day = {n: n, date: v, status: status, diff: diff, selected: isSelected, position: position, custom:{}};
            calendar.push(day);
            return day;
        });

        var weeks = [];
        var week = days.splice(0, 7);
        while (week.length) {
            weeks.push(week);
            week = days.splice(0, 7);
        }

        return {current: current.format('YYYY-MM'), weeks: weeks, calendar:calendar, year:current.format('YYYY'), month:current.format('MM'), x: current.diff(now,'months') };
    }

});