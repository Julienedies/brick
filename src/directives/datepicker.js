/**
 * require moment.js (https://github.com/moment/moment/)
 * Created by julien on 2015/8/26.
 */

/**
 * note: ic-tpl 和 其它指令绑定在相同元素上, 小心避免陷入编译死循环!
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

import _ from 'lodash'
import $ from 'jquery'
import moment from 'moment'
import brick from '@julienedies/brick'


brick.directives.reg('ic-date-picker', function ($elm) {

    //let tpl = brick.createRender($elm[0]);

    let _d = new Date();
    let tpl = $elm.attr('ic-tpl-name');
    let _date = $elm.attr('ic-date-now') || _d.getFullYear() + '-' + (_d.getMonth() + 1) + '-' + _d.getDate();
    let _format = $elm.attr('ic-date-format') || 'YYYY-MM-DD';
    let multiple = $elm.attr('ic-date-multiple');
    let weekStart = $elm.attr('ic-date-week-start') || 1;
    let enabled = $elm.attr('ic-date-enabled') ? '[ic-date-enabled]' : '';
    let disabled = $elm.attr('ic-date-disabled') ? ':not([ic-date-disabled])' : '';
    let onRender = $elm.icParseProperty2('ic-date-on-render');

    let START = _date;
    let now = moment(_date, _format);
    let cla = 'selected';
    let weekMap = (function (weekStart) {
        let week = _.range(1, 8);
        let index = _.indexOf(week, weekStart * 1);
        let split = week.splice(index);
        split.unshift(0, 0);
        week.splice.apply(week, split);
        return week;
    })(weekStart);

    let selectedDateArr = (function () {
        let d = $elm.attr('ic-date-default');
        d = d && d.trim() && d.split(/(?:\s*,\s*)|(?:\s+)/img);
        return d || [];
    })();

    //更新html
    function render(date, flag) {
        let dateModel = model(date);
        if (onRender && !flag) {
            onRender(dateModel);
        } else {
            $elm.icRender(tpl, {vm: dateModel});
            $elm.trigger('ic-date-picker.init');
        }
    }

    render(undefined, true);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //对外js接口
    $elm.on('ic-date-picker.render', function (e, msg) {
        try {
            $elm.icRender(tpl, msg);
            $elm.trigger('ic-date-picker.init');
        } catch (e) {
            console.log(e);
        }
    });

    $elm.on('ic-date-picker.recover', function (e, msg) {
        _date = old_date;
    });

    $elm.on('ic-date-picker.next', function (e, msg) {
        old_date = _date;
        _date = moment(_date, _format).add(1, 'months').format(_format);
        render(_date);
    });

    //取消一个日期选择, msg == YYYY-MM-DD
    $elm.on('ic-date-picker.cancel', function (e, msg) {
        $elm.find('[ic-date=?]'.replace('?', msg)).removeClass(cla);
        selectedDateArr = _.without(selectedDateArr, msg);
    });

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    let old_date;

    let eventAction = brick.get('event.action') || 'click';

    $elm.on(eventAction, '[ic-date-prev-m]:not([disabled]), [ic-date-next-m]:not([disabled])', function (e) {
        let call = this.hasAttribute('ic-date-prev-m') ? 'subtract' : 'add';
        old_date = _date;
        _date = moment(_date, _format)[call](1, 'months').format(_format);
        console.info(_date);
        render(_date);
    });

    $elm.on(eventAction, '[ic-date]' + enabled, multiple ? function (e) {
        let bindDate = this.getAttribute('ic-date');
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
    function _countDays(current) {
        let year = current.year();
        let month = current.month();
        let days = _.range(1, current.daysInMonth() + 1);
        return days.map(function (day) {
            return moment([year, month, day]).format(_format);
        });
    }

    //时间数据模型
    function model(date) {

        let current = date ? moment(date, _format) : moment();
        let prev = date ? moment(date, _format) : moment();
        prev.subtract(1, 'months');
        let next = date ? moment(date, _format) : moment();
        next.add(1, 'months');

        console.log(next.format(_format));

        let year = current.year();
        let month = current.month();

        //let days = _.range(1, current.daysInMonth() + 1);
        let calendar = [];
        let days = _countDays(current);
        let prevDays = _countDays(prev);
        let nextDays = _countDays(next);

        let len = days.length;

        let w = moment([year, month, 1]).weekday();
        if (w === 0) w = 7;

        let start = _.indexOf(weekMap, w);
        let _start = start;
        console.log(weekMap, w, start);
        while (_start > 0) {
            days.unshift(prevDays.pop());
            _start--;
        }

        let end = Math.ceil(days.length / 7) * 7 - days.length;
        //let end = 42 - days.length;
        while (end > 0) {
            days.push(nextDays.shift());
            end--;
        }

        days = days.map(function (v, i) {
            let m = moment(v, _format);
            let diff = m.diff(now, 'days');
            let status = diff < 0 ? 'over' : diff > 0 ? 'coming' : 'today';
            let position = i < start ? 'prev' : i > (len + start - 1) ? 'next' : 'current';
            let isSelected = _.indexOf(selectedDateArr, v) > -1;
            let n = v.replace(/^\d\d\d\d-\d\d-0?/i, '');
            let day = {n: n, date: v, status: status, diff: diff, selected: isSelected, position: position, custom: {}};
            calendar.push(day);
            return day;
        });

        let weeks = [];
        let week = days.splice(0, 7);
        while (week.length) {
            weeks.push(week);
            week = days.splice(0, 7);
        }

        return {
            current: current.format('YYYY-MM'),
            weeks: weeks,
            calendar: calendar,
            year: current.format('YYYY'),
            month: current.format('MM'),
            x: current.diff(now, 'months')
        };
    }

});
