/**
 * Created by julien on 2015/8/26.
 * require moment.js (https://github.com/moment/moment/)
 *
 */

/**
 * config:
 * ic-date-now //定义当前日期，通常有server端提供，如果未提供则为浏览器端当前日期
 * ic-date-default="2015-08-31" //默认选中日期，多个以,或空格分隔
 * ic-date-format //定义日期格式化格式
 * ic-date-multiple="true" //是否多选
 * ic-date-week-start 1-7 分别对应周一到周日
 * ic-date-on-render 自定义render函数
 *
 * attach:
 * ic-date 2012-08-27,格式由 ic-date-format 定义
 * ic-date-status over:过去  today:今天  coming:未来
 */
brick.directives.reg('ic-date-picker', function ($elm) {

    //var tpl = brick.createRender($elm[0]);

    var _d = new Date();
    var tpl = brick.getTpl($elm.attr('ic-tpl'));
    var _date = $elm.attr('ic-date-now') || _d.getFullYear() + '-' + (_d.getMonth() + 1) + '-' + _d.getDate();
    var _format = $elm.attr('ic-date-format') || 'YYYY-MM-DD';
    var multiple = !!$elm.attr('ic-date-multiple');
    var weekStart = $elm.attr('ic-date-week-start') || 1;
    var enabled = $elm.attr('ic-date-enabled') ? '[ic-date-enabled]' : '';
    var disabled = $elm.attr('ic-date-disabled') ? ':not([ic-date-disabled])' : '';
    var onRender = $elm.icParseProperty($elm.attr('ic-date-on-render')) || function (a) {
    };
    var now = moment(_date, _format);
    var cla = 'selected';
    var weekMap = (function (weekStart) {
        var week = _.range(1, 8);
        var index = _.indexOf(week, weekStart * 1);
        var split = week.splice(index);
        split.unshift(0);
        split.unshift(0);
        week.splice.apply(week, split);
        return week;
    })(weekStart);

    var selectedDateArr = (function () {
        var d = $elm.attr('ic-date-default');
        d = d && d.trim() && d.split(/(?:\s*,\s*)|(?:\s*)/img);
        return d || [];
    })();

    ////////////////////////////////////////////////////
    //init

    render();
    $elm.show();

    ////////////////////////////////////////////////////
    //bind event

    $elm.on('click', '[ic-prev-m]', function (e) {
        _date = _date.replace(/^(\d+)-(\d+)-(\d+)$/img, function (match, y, m, d) {
            if (m * 1 - 1 < 1) {
                y = y * 1 - 1;
                m = 12;
            } else {
                m = m * 1 - 1;
            }
            return y + '-' + m + '-' + d;
        });
        render(_date);
    });

    $elm.on('click', '[ic-next-m]', function (e) {
        _date = _date.replace(/^(\d+)-(\d+)-(\d+)$/img, function (match, y, m, d) {
            if (m * 1 + 1 > 12) {
                y = y * 1 + 1;
                m = 1;
            } else {
                m = m * 1 + 1;
            }
            return y + '-' + m + '-' + d;
        });
        render(_date);
    });

    $elm.on('click', '[ic-date]' + enabled + disabled, multiple ? function (e) {
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

    /////////////////////////////////////////////////////
    //更新html
    function render(date) {
        var html = tpl({vm: model(date)});
        $elm.html(html);
        $elm.trigger('ic-date-picker.init');
    }

    //时间数据模型
    function model(date) {

        var current = date ? moment(date, _format) : moment();

        var year = current.year();
        var month = current.month();

        var days = _.range(1, current.daysInMonth() + 1);

        var w = moment([year, month, 1]).weekday();
        if (w == 0) w = 7;

        var start = _.indexOf(weekMap, w);
        console.log(weekMap, w, start);
        while (start > 0) {
            days.unshift('');
            start--;
        }

        //var end = Math.ceil(days.length/7) * 7 - days.length;
        var end = 42 - days.length;
        while (end > 0) {
            days.push('');
            end--;
        }

        var weeks = [];
        var week = days.splice(0, 7);
        while (week.length) {
            week = week.map(function (v, i) {
                if (v * 1 !== v) {
                    return {custom: {}};
                }
                var m = moment([year, month, v]);
                var diff = m.diff(now, 'days');
                var status = diff < 0 ? 'over' : diff > 0 ? 'coming' : 'today';
                var date = m.format(_format);
                var isSelected = _.indexOf(selectedDateArr, date) > -1;
                var day = {n: v, date: date, status: status, diff: diff, selected: isSelected};
                day.custom = onRender(day);
                return day;
            });
            weeks.push(week);
            week = days.splice(0, 7);
        }

        return {current: current.format('YYYY-MM'), weeks: weeks};
    }

});